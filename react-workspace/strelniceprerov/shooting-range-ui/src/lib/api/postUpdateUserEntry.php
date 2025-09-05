<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('./papertraillogs.php');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost                                         =  'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseArray                                        =   array();
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postUpdateUserEntry';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postUpdateUserEntry';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['id']) && $_GET['id']!="") {
    $id                                               =   $_GET['id'];
  } else {
    $id                                               =   "";
  }
  if (isset($_GET['shootingPermit']) && $_GET['shootingPermit']!="") {
    $shootingPermit                                   =   $_GET['shootingPermit']==='true'? true:false;
  } else {
    $shootingPermit                                   =   false;
  }
  if (isset($_GET['shootingPermitNumber']) && $_GET['shootingPermitNumber']!="") {
    $shootingPermitNumber                             =   $_GET['shootingPermitNumber'];
  } else {
    $shootingPermitNumber                             =   "";
  }
  if (isset($_GET['name']) && $_GET['name']!="") {
    $name                                             =   $_GET['name'];
  } else {
    $name                                             =   "";
  }
  if (isset($_GET['email']) && $_GET['email']!="") {
    $email                                            =   $_GET['email'];
  } else {
    $email                                            =   "";
  }
  if (isset($_GET['phone']) && $_GET['phone']!="") {
    $phone                                            =   $_GET['phone'];
  } else {
    $phone                                            =   "";
  }
  send_remote_curl("Updating user id $id.",(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Updating name to: $name.",(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Updating Shooting Permit Number to: $shootingPermitNumber.",(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Updating email to: $email.",(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Updating phone to: $phone.",(basename($_SERVER['PHP_SELF'], '.php')));
  $queryUpdateUserwOutShootingPermit                  =   "UPDATE user_list SET name='$name', email='$email', phoneNumber='$phone' WHERE id=$id;";
  $queryUpdateUserwShootingPermit                     =   "UPDATE user_list SET name='$name', email='$email', phoneNumber='$phone', shootingPermit='$shootingPermitNumber' WHERE id=$id;";
  $queryUpdateUser = $shootingPermit ? $queryUpdateUserwShootingPermit : $queryUpdateUserwOutShootingPermit;
  $resUpdateUser                                      =   mysqli_query($mysqli, $queryUpdateUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  mysqli_close($mysqli);
}
catch(Exception $e){
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
  $eMessage                                             =   $e->getMessage();
  $eLine                                                =   $e->getLine();
  $eFile                                                =   $e->getFile();
  $responseMessage                                      =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                      =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ;
  send_remote_curl('Update of User had an Exception.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ,(basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray = array(  
  "message"                                             =>  strval($responseMessage),
  "userUpdated"                                         =>  boolval($resUpdateUser)
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Update of User with user id $id returned code $requestResponse .",(basename($_SERVER['PHP_SELF'], '.php')));
?>