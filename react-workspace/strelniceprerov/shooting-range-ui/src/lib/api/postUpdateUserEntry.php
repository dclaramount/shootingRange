<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

if (isset($_GET['id']) && $_GET['id']!="") {
  $id = $_GET['id'];
} else {
  $id = "";
}
if (isset($_GET['shootingPermit']) && $_GET['shootingPermit']!="") {
  $shootingPermit = $_GET['shootingPermit']==='true'? true:false;
} else {
  $shootingPermit = false;
}
if (isset($_GET['shootingPermitNumber']) && $_GET['shootingPermitNumber']!="") {
  $shootingPermitNumber = $_GET['shootingPermitNumber'];
} else {
  $shootingPermitNumber = "";
}
if (isset($_GET['name']) && $_GET['name']!="") {
  $name = $_GET['name'];
} else {
  $name = "";
}
if (isset($_GET['email']) && $_GET['email']!="") {
  $email = $_GET['email'];
} else {
  $email = "";
}
if (isset($_GET['phone']) && $_GET['phone']!="") {
  $phone = $_GET['phone'];
} else {
  $phone = "";
}

$queryUpdateUserwOutShootingPermit = "UPDATE user_list SET name='$name', email='$email', phoneNumber='$phone' WHERE id=$id;";
$queryUpdateUserwShootingPermit = "UPDATE user_list SET name='$name', email='$email', phoneNumber='$phone', shootingPermit='$shootingPermitNumber' WHERE id=$id;";
$queryUpdateUser = $shootingPermit ? $queryUpdateUserwShootingPermit : $queryUpdateUserwOutShootingPermit;

$resUpdateUser = mysqli_query($mysqli, $queryUpdateUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));

echo $resUpdateUser;
mysqli_close($mysqli);
http_response_code(200);
?>