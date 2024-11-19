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
$NOT_FOUND                                            =   404;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$phoneArray                                           =   array();
$userNotFound                                         =   false;
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getUserRecordByPhoneNumber';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='404_getUserRecordByPhoneNumber';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$NOT_FOUND]                          =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getUserRecordByPhoneNumber';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['phoneNumber']) && $_GET['phoneNumber']!="") {
    $phoneNumber                                      =   $_GET['phoneNumber'];
  } else {
    $phoneNumber                                      =   "";
  }
  send_remote_curl('Checking existence of user phone number.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("User phone number: '$phoneNumber'",(basename($_SERVER['PHP_SELF'], '.php')));
  /*------------------------------------------------------------------------------------------------------------*/
  /*             Verification if there is a booking in the time segment that you are trying to block            */
  /*------------------------------------------------------------------------------------------------------------*/
  $query                                                =   "SELECT * FROM user_list WHERE phoneNumber='$phoneNumber' AND isDeleted=false;";
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
    $query                                              =   "SELECT * FROM user_list WHERE phoneNumber='$phoneNumber' AND isDeleted=false;";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      while ($row = mysqli_fetch_row($res)) {
        $phoneArray[]=array( 
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
      }
      send_remote_curl("User phone number: '$phoneNumber' was found.",(basename($_SERVER['PHP_SELF'], '.php')));
    }
    mysqli_close($mysqli);
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
  send_remote_curl('Verification of User by Phone Number had an Exception.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ,(basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray=array(
  'message'                                             =>  strval($responseMessage),
  'payload'                                             =>  $phoneArray
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Verification of User by Phone Number returned $requestResponse.",(basename($_SERVER['PHP_SELF'], '.php')));
?>