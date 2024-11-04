<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
//General variables to connect to DB
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
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
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getInvoiceBy';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getInvoiceBy';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
    if (isset($_GET['guid']) && $_GET['guid']!="") {
        $guid                                         =   $_GET['guid'];
    } else {
        $guid                                         =   "";
    }
    if (isset($_GET['startSegmentTime']) && $_GET['startSegmentTime']!="") {
      $startSegmentTime                               =   $_GET['startSegmentTime'];
    } else {
      $startSegmentTime                               =   "";
    }
    if (isset($_GET['serviceId']) && $_GET['serviceId']!="") {
      $serviceId                                      =   $_GET['serviceId'];
    } else {
      $serviceId                                      =   "";
    }
    $query =    'SELECT  * FROM  Summary_View_Bookings WHERE invoiceItemDeleted = false'    . ($guid <> '' ? " AND uuidInvoice = '$guid'" : "")
                                                                                            . ($startSegmentTime <> '' ? " AND startTime = '$startSegmentTime'" : "")
                                                                                            . ($serviceId <> '' ? " AND serviceId = '$serviceId'" : "") .(";");
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      while ($row = mysqli_fetch_row($res)) {
        $invoiceArray[]=array( 'id'                      => intval($row[0]),
                                'invoiceId'               => intval($row[1]),
                                'invoiceType'             => $row[2],
                                'locationId'              => $row[3],
                                'locationName'            => $row[4],
                                'serviceId'               => $row[5],
                                'serviceName'             => $row[6],
                                'occupancy'               => intval($row[7]),
                                'locationMaxOccupancy'    => intval($row[8]),
                                'lenght'                  => intval($row[9]),
                                'instructor'              => boolval($row[10]),
                                'startTime'               => strtotime($row[11]),
                                'endTime'                 => strtotime($row[12]),
                                'isDeleted'               => boolval($row[13]),
                                'customerName'            => $row[14],
                                'customerEmail'           => $row[15],
                                'phoneNumber'             => $row[16],
                                'uuid'                    => $row[17],
                                'comment'                 => $row[18],
                                'shootingPermit'          => $row[19]
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