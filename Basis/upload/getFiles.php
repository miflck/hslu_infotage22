<?php
// basic headers
//header("Content-type: image/png");
//header("Expires: Mon, 1 Jan 2099 05:00:00 GMT");
//header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
//header("Cache-Control: no-store, no-cache, must-revalidate");
//header("Cache-Control: post-check=0, pre-check=0", false);
//header("Pragma: no-cache");
 
header("Access-Control-Allow-Origin: *");

//echo "<h2>hello</h2>";

// get the file name
//$file=@$_GET['file'];



$files = preg_grep('~\.(jpeg|jpg|png)$~',scandir($_SERVER['DOCUMENT_ROOT'] . "/img/", 1));
$newest_file = $files[0];

// sort files
//sort($files, SORT_NUMERIC); // asuming $arr is your array

// only get latest 3
$output = array_slice($files, 0, 6);   // returns "a", "b", and "c"
sort($output, SORT_NUMERIC); // asuming $arr is your array

//$filename= $_SERVER['DOCUMENT_ROOT'] . "/img/".$file;
//echo $filename;
// get the size for content length
//$size= filesize($filename);
//header("Content-Length: $size bytes");
 
// output the file contents
//$data=readfile($filename);

//echo "hello";


echo json_encode($output);
/*
for($i=0;$i<count($files);$i++){
   // echo "<div style='width: 15%; height:10%; position:relative; top:22%; left:20%'/>".$files[$i]."</div>";
   // echo "<div style='width: 15%; height:10%; position:relative; top:22%; left:20%'/>".$data."</div>";
    echo $files[$i];

}*/

?>