<?php

    $data = $_POST['photo'];
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);

    mkdir($_SERVER['DOCUMENT_ROOT'] . "/images");

    file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/images/".time().'.png', $data);
    die;
?>