<?php

include 'xml2json.php';

print XmlToJson::Parse($_POST['file']);

?>