<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'local';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");

if (isset($_GET['shootingPermit']) && $_GET['shootingPermit']!="") {
  $shootingPermit = $_GET['shootingPermit'] === 'true' ? true: false;
} else {
  $shootingPermit = false;
}
if (isset($_GET['shootingPermitNumber']) && $_GET['shootingPermitNumber']!="") {
  $shootingPermitNumber = $_GET['shootingPermitNumber'];
} else {
  $shootingPermitNumber = "";
}
if (isset($_GET['shootingInstructor']) && $_GET['shootingInstructor']!="") {
  $shootingInstructor = $_GET['shootingInstructor'];
} else {
  $shootingInstructor = "";
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
$queryCreateUserWOutShootingPermit = "INSERT INTO user_list (name, user_type_id, email, phoneNumber, isDeleted, userId) VALUES ('$name', 1 , '$email', '$phone',false , 1);";
$queryCreateUserWShootingPermit = "INSERT INTO user_list (name, user_type_id, email, phoneNumber, shootingPermit, isDeleted, userId) VALUES ('$name', 1 , '$email', '$phone','$shootingPermitNumber', false , 1);";
$queryCreateUser = $shootingPermit ? $queryCreateUserWShootingPermit : $queryCreateUserWOutShootingPermit;

$queryNewUser = "SELECT *  FROM user_list WHERE email='${email}' ORDER BY id DESC LIMIT 1;";

$resCreateUser = mysqli_query($mysqli, $queryCreateUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if($resCreateUser){
  $res = mysqli_query($mysqli, $queryNewUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    $index = 1;
    while ($row = mysqli_fetch_row($res)) {
      $responseUserArray[]=array( 
                              'id'                              => $row[0],
                              'userTypeId'                      => $row[1],
                              'name'                            => $row[2],
                              'email'                           => $row[3],
                              'phoneNumber'                     => $row[4]
                            );
      $index++;
    }
    $res->free_result();
  }
}
mysqli_close($mysqli);
http_response_code(200);
echo json_encode($responseUserArray);
?>