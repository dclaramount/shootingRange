<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
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
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
/*------------------------------------------------------------------------------------------------------------*/
/*                                      Fetching the variables                                                */
/*------------------------------------------------------------------------------------------------------------*/
$variables                                            =   [];
try{
  $query = "SELECT * FROM global_variables ;";
  $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    $index                                            =   1;
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
  'payload'                                           =>  $variables
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>