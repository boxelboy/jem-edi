<?php

include 'xml2json.php';

$dir = "export";
$arr = [];

$dh = opendir($dir);
$i = 0;
while (($file = readdir($dh)) !== false) {
	if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) == 'Xml') {
		$arr[] = json_decode((new XmlToJson)->Parse($dir.'/'.$file));
	}
	print_r($file,$arr);
	rename($dir.'/'.$file,"export-processed/".$file);
}
closedir($dh);

echo json_encode($arr);
?>