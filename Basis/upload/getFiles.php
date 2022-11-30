<?php
header("Access-Control-Allow-Origin: *");
$files = preg_grep('~\.(jpeg|jpg|png)$~',scandir($_SERVER['DOCUMENT_ROOT'] . "/img/", 1));
$newest_file = $files[0];

$output = array_slice($files, 0, 6);   
sort($output, SORT_NUMERIC); 

echo json_encode($output);

?>