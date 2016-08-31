<?php

	$file = fopen('import/'.$_POST['file'], "w");
	fwrite($file, $_POST['data']);
	fclose($file);

?>