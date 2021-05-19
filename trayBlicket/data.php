<?php
$req_dump = file_get_contents("php://input");
$fp = fopen('responses.log', 'a');
fwrite($fp, $req_dump);
fclose($fp);
?>