<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('./papertraillogs.php');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseUserArray                                    =   array();
$userWithEmailExist                                   =   false;
$userWithPhoneNumberExist                             =   false;
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postCreateNewUser';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_postCreateNewUser';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postCreateNewUser';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try {
  if (isset($_GET['shootingPermit']) && $_GET['shootingPermit'] != "") {
    $shootingPermit                                   =   $_GET['shootingPermit'] === 'true' ? true : false;
  } else {
    $shootingPermit                                   =   false;
  }
  if (isset($_GET['shootingPermitNumber']) && $_GET['shootingPermitNumber'] != "") {
    $shootingPermitNumber                             =   $_GET['shootingPermitNumber'];
  } else {
    $shootingPermitNumber                             =   "";
  }
  if (isset($_GET['shootingInstructor']) && $_GET['shootingInstructor'] != "") {
    $shootingInstructor                               =   $_GET['shootingInstructor'];
  } else {
    $shootingInstructor                               =   "";
  }
  if (isset($_GET['name']) && $_GET['name'] != "") {
    $name                                             =   $_GET['name'];
  } else {
    $name                                             =   "";
  }
  if (isset($_GET['email']) && $_GET['email'] != "") {
    $email                                            =   $_GET['email'];
  } else {
    $email                                            =   "";
  }
  if (isset($_GET['phone']) && $_GET['phone'] != "") {
    $phone                                            =   $_GET['phone'];
  } else {
    $phone                                            =   "";
  }
  send_remote_curl('Creating User Entry.', (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("User Details:", (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Name: '$name'", (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Shooting Permit Number: '$shootingPermitNumber'", (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Email: '$email'", (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("Phone: '$phone'", (basename($_SERVER['PHP_SELF'], '.php')));

  /*------------------------------------------------------------------------------------------------------------*/
  /*                                          Verification if user entry is foundn with the email               */
  /*------------------------------------------------------------------------------------------------------------*/
  // $query                                                =   "SELECT * FROM user_list WHERE email='$email' AND isDeleted=false;";
  // // $res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  // // if (!is_null($res->fetch_row())){
  // //   $userWithEmailExist                                 =   true;
  // //   $requestResponse                                    =   $CONFLICT;
  // //   $responseMessage                                    =   $resultMessage[$CONFLICT];
  // // };
  // // $res->free_result();
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                 Verification if user entry is foundn with the Phone Number                 */
  /*------------------------------------------------------------------------------------------------------------*/
  // if(!$userWithEmailExist){
  //   $query                                                =   "SELECT * FROM user_list WHERE phoneNumber='$phone' AND isDeleted=false;";
  //   $res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  //   if (!is_null($res->fetch_row())){
  //     $userWithPhoneNumberExist                           =   true;
  //     $requestResponse                                    =   $CONFLICT;
  //     $responseMessage                                    =   $resultMessage[$CONFLICT];
  //   };
  //   $res->free_result();
  // }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      Executing Query Create                                                */
  /*------------------------------------------------------------------------------------------------------------*/
  if (!$userWithEmailExist && !$userWithPhoneNumberExist) {
    $queryCreateUserWOutShootingPermit                    =   "INSERT INTO user_list (name, user_type_id, email, phoneNumber, isDeleted, userId) VALUES ('$name', 1 , '$email', '$phone',false , 1);";
    $queryCreateUserWShootingPermit                       =   "INSERT INTO user_list (name, user_type_id, email, phoneNumber, shootingPermit, isDeleted, userId) VALUES ('$name', 1 , '$email', '$phone','$shootingPermitNumber', false , 1);";
    $queryCreateUser = $shootingPermit ? $queryCreateUserWShootingPermit : $queryCreateUserWOutShootingPermit;

    $queryNewUser                                         =   "SELECT *  FROM user_list WHERE email='$email' ORDER BY id DESC LIMIT 1;";
    $resCreateUser                                        =   mysqli_query($mysqli, $queryCreateUser, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
    if ($resCreateUser) {
      $res                                                =   mysqli_query($mysqli, $queryNewUser, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
      while ($row = mysqli_fetch_row($res)) {
        $responseUserArray[] = array(
          'id'                              => $row[0],
          'userTypeId'                      => $row[1],
          'name'                            => $row[2],
          'email'                           => $row[3],
          'phoneNumber'                     => $row[4]
        );
      }
      $res->free_result();
    }
    $responseMessage                                      =   $resultMessage[$GOOD_REQUEST];
    mysqli_close($mysqli);
  }
} catch (Exception $e) {
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
  $eMessage                                             =   $e->getMessage();
  $eLine                                                =   $e->getLine();
  $eFile                                                =   $e->getFile();
  $responseMessage                                      =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                      =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine";
  send_remote_curl("Creation of New User with  details $newUser  had an Exception.", (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine", (basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray = array(
  'message'                                             =>  strval($responseMessage),
  'payload'                                             =>  $responseUserArray,
  'userWithEmailExist'                                  =>  boolval($userWithEmailExist),
  'userWithPhoneNumberExist'                            =>  boolval($userWithPhoneNumberExist)
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Creation of new user returned $requestResponse.", (basename($_SERVER['PHP_SELF'], '.php')));
