<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
//General variables to connect to DB
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'root';
$databasePassword                                     =   'root';
$databaseName                                         =   'local';
$dateTimeActual                                       =   new DateTime();
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseArray                                        =   array();
$invoiceArray                                         =   [];
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getAllInvoices';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getAllInvoices';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
    $query                                              =   "SELECT  * FROM  Summary_View_Bookings WHERE invoiceItemDeleted = false;";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      while ($row = mysqli_fetch_row($res)) {
        $invoiceArray[]     =array(
                                        'id'                        => intval($row[0]),
                                        'invoiceId'                 => intval($row[1]),
                                        'invoiceType'               => strval($row[2]),
                                        'locationId'                => intval($row[3]),
                                        'locationName'              => strval($row[4]),
                                        'serviceId'                 => intval($row[5]),
                                        'serviceName'               => strval($row[6]),
                                        'occupancy'                 => intval($row[7]),
                                        'locationMaxOccupancy'      => intval($row[8]),
                                        'length'                    => intval($row[9]),
                                        'withInstructor'            => boolval($row[10]),
                                        'startTime'                 => strtotime($row[11]),
                                        'endTime'                   => strtotime($row[12]),
                                        'isDeleted'                 => boolval($row[13]),
                                        'customerName'              => strval($row[14]),
                                        'customerEmail'             => strval($row[15]),
                                        'customerPhoneNumber'       => strval($row[16]),
                                        'uuid'                      => strval($row[17]),
                                        'comment'                   => strval($row[18]),
                                        'shootingPermit'            => strval($row[19])
                                        );
      }
    }
    $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
    $requestResponse                                    =   $GOOD_REQUEST;
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
  'payload'                                           =>  $invoiceArray
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>