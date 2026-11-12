<?php
declare(strict_types=1);
require __DIR__ . '/common.php';
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') p10_json(405, ['ok'=>false,'code'=>'method']);
p10_origin_guard();
$cfg=p10_config();
if (isset($_SERVER['CONTENT_LENGTH']) && (int)$_SERVER['CONTENT_LENGTH'] > 12 * 1024 * 1024) {
    p10_json(413, ['ok'=>false,'code'=>'payload_too_large']);
}
p10_session();
$sentToken=p10_text('_csrf', 128);
if (!$sentToken || empty($_SESSION['form_csrf']) || !hash_equals((string)$_SESSION['form_csrf'], $sentToken)) {
    p10_json(403, ['ok'=>false,'code'=>'token']);
}
if (p10_text('website', 200)!=='') p10_json(422, ['ok'=>false,'code'=>'invalid']);
$started=(int)p10_text('started_at', 16);
if ($started<time()-3600 || $started>time()-3 || $started>time()+30) {
    p10_json(422, ['ok'=>false,'code'=>'invalid']);
}
if (p10_text('privacy_ack', 4)!=='1') p10_json(422, ['ok'=>false,'code'=>'privacy']);
$type=p10_text('form_type', 12);
if (!in_array($type,['contact','career'],true)) p10_json(422, ['ok'=>false,'code'=>'type']);
$lang=p10_text('language', 3);
if (!in_array($lang,['it','en','fr','de'],true)) $lang='it';
$email=p10_text('email',254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) p10_json(422,['ok'=>false,'code'=>'email']);
$data=['language'=>$lang,'email'=>$email];
if ($type==='contact') {
    $data['name']=p10_text('name',160);
    $data['city']=p10_text('city',160);
    $data['phone']=p10_text('phone',60);
    $data['message']=p10_text('message',5000);
    if ($data['name']==='' || $data['message']==='') p10_json(422,['ok'=>false,'code'=>'required']);
} else {
    $data['first_name']=p10_text('first_name',160);
    $data['last_name']=p10_text('last_name',160);
    $data['phone']=p10_text('phone',60);
    $data['birth']=p10_text('birth',16);
    $data['city']=p10_text('city',160);
    $data['nationality']=p10_text('nationality',160);
    $data['car']=p10_text('car',4);
    $data['study']=p10_text('study',160);
    $data['mobility']=p10_text('mobility',12);
    $data['intro']=p10_text('intro',3000);
    if ($data['first_name']===''||$data['last_name']==='') p10_json(422,['ok'=>false,'code'=>'required']);
    if ($data['birth']!==''&&!preg_match('/^\d{4}-\d{2}-\d{2}$/',$data['birth'])) p10_json(422,['ok'=>false,'code'=>'birth']);
    if (!in_array($data['car'],['','si','no'],true)||!in_array($data['mobility'],['','province','region'],true)) p10_json(422,['ok'=>false,'code'=>'invalid']);
}
$cvBytes=null;
$filename=null;
$contentType=null;
if ($type==='career') {
    $file=$_FILES['cv'] ?? null;
    if (!is_array($file) || ($file['error']??1)!==UPLOAD_ERR_OK
        || !isset($file['tmp_name'],$file['name'],$file['size'])
        || !is_string($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])
        || (int)$file['size']<=0 || (int)$file['size']>10*1024*1024) {
        p10_json(422,['ok'=>false,'code'=>'file']);
    }
    $filename=basename(str_replace('\\','/',(string)$file['name']));
    $filename=preg_replace('/[^A-Za-z0-9._-]/','_', $filename) ?: 'curriculum';
    $filename=substr($filename,0,110);
    $ext=strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    if (!in_array($ext,['pdf','doc','docx'],true)) p10_json(422,['ok'=>false,'code'=>'filetype']);
    $fp=fopen($file['tmp_name'],'rb');
    if (!$fp) p10_json(422,['ok'=>false,'code'=>'file']);
    $signature=fread($fp,8);fclose($fp);
    $magicOk=($ext==='pdf'&&str_starts_with($signature,'%PDF-'))
        || ($ext==='docx'&&str_starts_with($signature,"PK\x03\x04"))
        || ($ext==='doc'&&$signature==="\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1");
    if (!$magicOk) p10_json(422,['ok'=>false,'code'=>'filetype']);
    $finfo=new finfo(FILEINFO_MIME_TYPE);
    $mime=$finfo->file($file['tmp_name']) ?: '';
    $allowed=[
        'pdf'=>['application/pdf','application/octet-stream'],
        'doc'=>['application/msword','application/vnd.ms-office','application/octet-stream'],
        'docx'=>['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/zip','application/octet-stream'],
    ];
    if (!in_array($mime,$allowed[$ext],true)) p10_json(422,['ok'=>false,'code'=>'filetype']);
    if ($ext==='docx' && class_exists('ZipArchive')) {
        $zip=new ZipArchive();
        if ($zip->open($file['tmp_name'])!==true) p10_json(422,['ok'=>false,'code'=>'filetype']);
        $ok=$zip->locateName('[Content_Types].xml')!==false&&$zip->locateName('word/document.xml')!==false;
        $zip->close();
        if (!$ok) p10_json(422,['ok'=>false,'code'=>'filetype']);
    }
    $contentType=['pdf'=>'application/pdf','doc'=>'application/msword','docx'=>'application/vnd.openxmlformats-officedocument.wordprocessingml.document'][$ext];
    $cvBytes=file_get_contents($file['tmp_name']);
    if ($cvBytes===false) p10_json(503,['ok'=>false,'code'=>'file_unavailable']);
}
$recipient=$type==='career'?($cfg['career_to']??''):($cfg['contact_to']??'');
$sender=$cfg['sender']??'';
if (!filter_var($recipient,FILTER_VALIDATE_EMAIL)||!filter_var($sender,FILTER_VALIDATE_EMAIL)) {
    p10_json(503,['ok'=>false,'code'=>'not_configured']);
}
p10_rate_guard($cfg);
$subject=$type==='career'?'[Grimaldelli] Candidatura dal sito':'[Grimaldelli] Richiesta dal sito';
$body="Invio dal modulo Grimaldelli\n";
$body.="Tipo: ".($type==='career'?'Candidatura':'Contatto')."\n";
foreach ($data as $key=>$value) {
    $body.=strtoupper($key).": ".str_replace(["\r\n","\r"],"\n",$value)."\n";
}
$body.="\nPrivacy: presa visione dichiarata dal mittente.\n";
$boundary='p10_'.bin2hex(random_bytes(16));
$mime="MIME-Version: 1.0\r\n";
$mime.="From: Grimaldelli Web <".$sender.">\r\n";
$mime.="Reply-To: ".$email."\r\n";
$mime.="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
$payload="--".$boundary."\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
$payload.=chunk_split(base64_encode($body),76,"\r\n");
if ($type==='career' && $cvBytes!==null) {
    $payload.="\r\n--".$boundary."\r\nContent-Type: ".$contentType."; name=\"".$filename."\"\r\n";
    $payload.="Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
    $payload.=chunk_split(base64_encode($cvBytes),76,"\r\n");
}
$payload.="\r\n--".$boundary."--\r\n";
unset($cvBytes);
$accepted=@mail($recipient,$subject,$payload,$mime);
if (!$accepted) p10_json(503,['ok'=>false,'code'=>'delivery_unavailable']);
unset($_SESSION['form_csrf']);
p10_json(200,['ok'=>true]);
