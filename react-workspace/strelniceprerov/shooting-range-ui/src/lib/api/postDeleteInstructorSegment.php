<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

if (isset($_GET['guid']) && $_GET['guid']!="") {
  $guid = $_GET['guid'];
} else {
  $guid = "";
}

$query = "UPDATE instructor_segments SET isDeleted=1 WHERE guid LIKE '%$guid%';";
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
echo $query;
http_response_code(200);
mysqli_close($mysqli);
http_response_code(200);
?>