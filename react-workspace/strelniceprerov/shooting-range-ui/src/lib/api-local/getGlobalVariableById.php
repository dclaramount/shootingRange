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
//HTTP-Codes that will return
$PARTIAL_CONTENT                                      =   206;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $PARTIAL_CONTENT;
$variables                                            =   [];
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['gVariableId']) && $_GET['gVariableId']!="") {
    $gVariableId                                        =   $_GET['gVariableId'];
  } else {
    $gVariableId                                        =   "";
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      Fetching the variables                                                */
  /*------------------------------------------------------------------------------------------------------------*/
  $query                                              = "SELECT * FROM global_variables WHERE id='$gVariableId' ;";
  $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    $index                                            =   1;
    while ($row = mysqli_fetch_row($res)) {
      $responseMessage                                =   $row[3];
      }
    };
    mysqli_close($mysqli);
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
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $variables
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>