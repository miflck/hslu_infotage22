<?php
echo "hello";
echo "<h2>hello</h2>";
$img = file_get_contents("php://input"); // $_POST didn't work
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/img")) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/img", 0777, true);
}

$file = $_SERVER['DOCUMENT_ROOT'] . "/img/".time().'.png';

$success = file_put_contents($file, $data);
print $success ? $file.' saved.' : 'Unable to save the file.';

  /*  $data = $_POST['photo'];
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/photos");
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/photos/".time().'.png', $data);
    die;
*/
//define('UPLOAD_DIR', '/dings');


/*define('UPLOAD_DIR', 'images/');
mkdir($_SERVER['DOCUMENT_ROOT'] . "/dings");
$data = $_POST['imgBase64'];
$data = str_replace('data:image/png;base64,', '', $data);
$data = base64_decode( str_replace(' ', '+', $data) );
$file =UPLOAD_DIR. uniqid() . '.png';
//$success = file_put_contents($file, $data);
//print $success ? $file : 'Unable to save the file.';
$success = file_put_contents($_SERVER['DOCUMENT_ROOT'] .'/dings/'.uniqid().'.png', $data);
$success = file_put_contents($file, $data);
*/

//mkdir($_SERVER['DOCUMENT_ROOT'] . "/images");
/*
define('UPLOAD_DIR', 'images/');
$img = $_POST['imgBase64'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.png';
$success = file_put_contents($file, $data);
//send request to ocr /
	print $success ? $file : 'Unable to save the file.';
//mkdir($_SERVER['DOCUMENT_ROOT'] . "/dings");
/*
define('UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] .'images/');
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';
*/
    /*
move_uploaded_file(
    $_FILES['file']['tmp_name'], 
    $_SERVER['DOCUMENT_ROOT'] . "/dings/test.png"
); 
die;
$target_dir = "dings/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}
// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
*/
?>