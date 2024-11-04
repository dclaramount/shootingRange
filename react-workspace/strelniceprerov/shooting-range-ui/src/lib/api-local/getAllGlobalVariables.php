<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('papertraillogs.php');
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
$GOOD_REQUEST                                         =   200;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseArray                                        =   array();
$listGlobalVariables                                  =   [];
$numberVariables                                      =   array("Start_Business_Hours", "End_Business_Hours", "Start_Day_Hours", "End_Day_Hours", "Default_Location", "Max_Occupancy", "Max_Length_Booking", "Default_Booking_Length", "Default_Booking_Occupancy");
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getAllGlobalVariables';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getAllGlobalVariables';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                      Fetching the variables                                                */
/*------------------------------------------------------------------------------------------------------------*/
$variables                                            =   [];
try{
  $query                                              =   "SELECT * FROM global_variables WHERE name NOT LIKE '200%' AND name NOT LIKE '400%' AND name NOT LIKE '401%' AND name NOT LIKE '409%' AND name NOT LIKE '500%' ;";
  $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    while ($row = mysqli_fetch_row($res)) {
        $name=lcfirst(str_replace("_","",strval($row[1])));
        if ($name == 'aPIURL'){ $name='apiURL';}
        if (in_array($row[1], $numberVariables)) {
            $listGlobalVariables[]                    = array(
                                                            'id'                    => intval($row[0]),
                                                            'nameOfVariable'        => $name,
                                                            'value'                 => intval($row[2]),
                                                            'comment'               => strval($row[3]),
                                                            'modifiedBy'            => intval($row[4]),
                                                            'createdAt'             => strtotime($row[5]),
                                                            'lastUpdatedAt'         => strtotime($row[6])
            );
        }
        else{
            $listGlobalVariables[]                    = array(
                                                            'id'                    => intval($row[0]),
                                                            'nameOfVariable'        => $name,
                                                            'value'                 => strval($row[2]),
                                                            'comment'               => strval($row[3]),
                                                            'modifiedBy'            => intval($row[4]),
                                                            'createdAt'             => strtotime($row[5]),
                                                            'lastUpdatedAt'         => strtotime($row[6])
            );
        }
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
  'payload'                                           =>  $listGlobalVariables
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_syslog('Succesfully sending message from endpoint.',(basename($_SERVER['PHP_SELF'], '.php')));
?>
