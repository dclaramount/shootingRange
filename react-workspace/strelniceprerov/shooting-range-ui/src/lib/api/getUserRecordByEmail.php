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
$NOT_FOUND                                            =   404;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$userArray                                            =   array();
$userNotFound                                         =   false;
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getUserRecordByEmail';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='404_getUserRecordByEmail';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$NOT_FOUND]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getUserRecordByEmail';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['userEmail']) && $_GET['userEmail']!="") {
    $userEmail = $_GET['userEmail'];
  } else {
    $userEmail = "";
  }
  send_remote_curl('Checking existence of user email.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("User email: '$userEmail'",(basename($_SERVER['PHP_SELF'], '.php')));
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                          Verification if user entry is foundn with the email               */
  /*------------------------------------------------------------------------------------------------------------*/
  $query                                                =   "SELECT * FROM user_list WHERE email='$userEmail' AND isDeleted=false;";
  $res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if (is_null($res->fetch_row())){
    $userNotFound                                       =   true;
    $requestResponse                                    =   $NOT_FOUND;
    $responseMessage                                    =   $resultMessage[$NOT_FOUND];
  };
  $res->free_result();
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      Fetching the variables                                                */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$userNotFound){
    $query                                                =   "SELECT * FROM user_list WHERE email='$userEmail' AND isDeleted=false;";
    $res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      while ($row = mysqli_fetch_row($res)) {
        $userArray[]=array( 
                              'id'              => $row[0],
                              'name'            => $row[2],
                              'email'           => $row[3],
                              'phoneNumber'     => $row[4],
                              'shootingPermit'  => $row[5],
                              'isDeleted'       => $row[6],
                              'userId'          => $row[7],
                              'createdOn'       => $row[8],
                              'updatedOn'       => $row[9]
        );
        send_remote_curl("User email: '$userEmail' was found.",(basename($_SERVER['PHP_SELF'], '.php')));
      }
      mysqli_close($mysqli);
    }
  }
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
  send_remote_curl('Verification of User by Email Succesfully had an Exception.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ,(basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray=array(
  'message'                                             =>  strval($responseMessage),
  'payload'                                             =>  $userArray
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Verification of User by Email Succesfully returned $requestResponse.",(basename($_SERVER['PHP_SELF'], '.php')));
?>