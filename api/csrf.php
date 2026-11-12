<?php
declare(strict_types=1);
require __DIR__ . '/common.php';
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') p10_json(405, ['ok'=>false,'code'=>'method']);
p10_origin_guard();
p10_config(); // No token issued before the mail service is explicitly enabled.
p10_session();
if (!isset($_SESSION['form_csrf']) || !is_string($_SESSION['form_csrf'])) {
    $_SESSION['form_csrf'] = bin2hex(random_bytes(32));
}
p10_json(200, ['ok'=>true, 'csrf'=>$_SESSION['form_csrf']]);
