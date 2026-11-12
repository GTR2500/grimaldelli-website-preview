<?php
declare(strict_types=1);
/**
 * Grimaldelli P10 - form endpoint common controls.
 * PHP 8.2+; never exposes configuration or applicant data.
 */
function p10_json(int $status, array $body): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, private');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function p10_config(): array {
    // A sibling folder to the public webroot, e.g. .../p10-private/forms.php
    $path = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'p10-private' . DIRECTORY_SEPARATOR . 'forms.php';
    if (!is_file($path) || !is_readable($path)) {
        p10_json(503, ['ok' => false, 'code' => 'unavailable']);
    }
    $cfg = require $path;
    if (!is_array($cfg) || ($cfg['enabled'] ?? false) !== true || empty($cfg['rate_secret'])) {
        p10_json(503, ['ok' => false, 'code' => 'unavailable']);
    }
    return $cfg;
}
function p10_origin_guard(): void {
    $hostname = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
    $hostname = preg_replace('/:\d+$/', '', $hostname);
    if (!in_array($hostname, ['glcgrimaldelli.com', 'www.glcgrimaldelli.com'], true)) {
        p10_json(403, ['ok' => false, 'code' => 'host']);
    }
    $secure = !empty($_SERVER['HTTPS']) && strtolower((string)$_SERVER['HTTPS']) !== 'off';
    if (!$secure) {
        p10_json(403, ['ok' => false, 'code' => 'https_required']);
    }
    $origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin !== '') {
        $o = parse_url($origin);
        if (!is_array($o) || strtolower((string)($o['scheme'] ?? '')) !== 'https'
            || strtolower((string)($o['host'] ?? '')) !== $hostname
            || isset($o['port'])) {
            p10_json(403, ['ok' => false, 'code' => 'origin']);
        }
    }
}
function p10_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_name('grimaldelli_forms');
    session_set_cookie_params([
        'lifetime' => 0, 'path' => '/', 'secure' => true, 'httponly' => true, 'samesite' => 'Strict',
    ]);
    ini_set('session.use_strict_mode', '1');
    session_start();
}
function p10_text(string $key, int $max = 250): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    $v = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '');
    return mb_substr($v, 0, $max, 'UTF-8');
}
function p10_rate_guard(array $cfg): void {
    // Temp storage outside docroot; no persistent CV or plaintext IP.
    $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
    $hash = hash_hmac('sha256', $ip, (string)$cfg['rate_secret']);
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'p10_form_rate_' . substr($hash, 0, 40) . '.json';
    $fp = @fopen($file, 'c+');
    if (!$fp) p10_json(503, ['ok' => false, 'code' => 'rate_unavailable']);
    if (!flock($fp, LOCK_EX)) { fclose($fp); p10_json(503, ['ok'=>false,'code'=>'rate_unavailable']); }
    $raw = stream_get_contents($fp);
    $state = json_decode($raw ?: '[]', true);
    $now = time();
    $recent = array_values(array_filter(is_array($state) ? $state : [], static fn($v) =>
        is_numeric($v) && (int)$v > $now - 3600 && (int)$v <= $now));
    if (count($recent) >= 5) { flock($fp, LOCK_UN); fclose($fp); p10_json(429, ['ok'=>false,'code'=>'rate_limited']); }
    $recent[] = $now;
    rewind($fp);ftruncate($fp, 0);
    fwrite($fp, json_encode($recent));fflush($fp);flock($fp, LOCK_UN);fclose($fp);
}
function p10_encode_header(string $value): string {
    return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n");
}
