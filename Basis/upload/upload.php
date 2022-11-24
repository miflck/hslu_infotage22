<?php


$img = file_get_contents("php://input"); // $_POST didn't work
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/img")) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/img", 0777, true);
}

if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/print")) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/print", 0777, true);
}

if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/post")) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/post", 0777, true);
}



$print=(bool)@$_GET['print'];
if($print){

    $file = $_SERVER['DOCUMENT_ROOT'] . "/print/".time().'.png';
    $success = file_put_contents($file, $data);

$message = exec("lp -d EPSON_ET_2850_Series -o media=A6 -o cupsPrintQuality=High $file");
echo $message;
}else {

    $file = $_SERVER['DOCUMENT_ROOT'] . "/post/".time().'.png';
    $success = file_put_contents($file, $data);
}


$file = $_SERVER['DOCUMENT_ROOT'] . "/img/".time().'.png';
$success = file_put_contents($file, $data);



print $success ? $file.' saved.'.$print : 'Unable to save the file.';

?>