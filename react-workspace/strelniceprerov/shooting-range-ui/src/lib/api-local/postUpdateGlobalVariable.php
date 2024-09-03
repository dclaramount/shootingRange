<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'local';
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
$encryptedPasswordInDB                                =   "";
$isPasswordCorrect                                    =   true;
$variables                                            =   [];
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$NOT_AUTHORIZED                                       =   401;
$INTERNAL_SERVER_ERROR                                =   500;
//Retrieving the Messages for the differnt HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postEditGlobalVariable';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='401_postEditGlobalVariable';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$NOT_AUTHORIZED]                     =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postEditGlobalVariable';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
//Retrieving Encrypted Password
$query                                                =   "  SELECT value FROM `global_variables` WHERE name='Password_To_Change_Entries';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $encryptedPasswordInDB                              =   $row[0];
}
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['id']) && $_GET['id']!="") {
    $id                                               =   $_GET['id'];
  } else {
    $id                                               =   "";
  }
  if (isset($_GET['newValue']) && $_GET['newValue']!="") {
    $newValue                                         =   $_GET['newValue'];
  } else {
    $newValue                                         =   "";
  }
  if (isset($_GET['password']) && $_GET['password']!="") {
    $encryptedPassword                                =   $_GET['password'];
  } else {
    $encryptedPassword                                =   "";
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    1. Verification if Start Segment is older than actual time                              */  
  /*------------------------------------------------------------------------------------------------------------*/
  if($encryptedPassword !== $encryptedPasswordInDB){
    $isPasswordCorrect                                  =   false;
    $requestResponse                                    =   $NOT_AUTHORIZED;
    $responseMessage                                    =   $resultMessage[$NOT_AUTHORIZED];
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      1. Update the Global Variable                                         */
  /*------------------------------------------------------------------------------------------------------------*/
  if($isPasswordCorrect){
    $query                                              =   "UPDATE global_variables SET value='$newValue' WHERE id='$id';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      2. Fetching the new set of variables                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  if($isPasswordCorrect){
    $variables                                          =   [];
    $query                                              =   "SELECT * FROM global_variables ;";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      while ($row = mysqli_fetch_row($res)) {
        $variables[]                                    =array( 
                                                        'id'                  => intval($row[0]),
                                                        'name'                => $row[1], 
                                                        'value'               => $row[2],
                                                        'comment'             => $row[3],
                                                        'userId'              => intval($row[4]),
                                                        'createdAt'           => strtotime($row[5])*1000,
                                                        'updatedAt'           => strtotime($row[6])*1000);
        }
      };
      $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
      mysqli_close($mysqli);
  }
} catch (Exception $e){
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                    =   $INTERNAL_SERVER_ERROR;
  $eMessage                                           =   $e->getMessage();
  $eLine                                              =   $e->getLine();
  $eFile                                              =   $e->getFile();
  $responseMessage                                    =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                    =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ;
  mysqli_close($mysqli);
}
$responseArray=array(
  'message'                                           =>  $responseMessage,
  'payload'                                           =>  $variables
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>