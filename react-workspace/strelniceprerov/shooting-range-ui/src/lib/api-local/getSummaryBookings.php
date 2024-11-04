<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
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
$listOfSummaryBookings                                =   [];
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getSummaryBookings';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getSummaryBookings';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                      Fetching the variables                                                */
/*------------------------------------------------------------------------------------------------------------*/
try{
    $query = "SELECT  sBookings.location_Id,
                      sBookings.location_Name,
                      sBookings.service_Id,
                      sBookings.service_Name,
                      sBookings.occupancyBooked,
                      sBookings.max_Occupancy,
                      sBookings.segmentStarts,
                      sBookings.segmentEnds,
                      sBookings.instructorsBooked,
                      sBookings.isFullyBooked
                      FROM  Summary_Booking_Segments as sBookings;";
    $res    = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
        while ($row = mysqli_fetch_row($res)) {
            $listOfSummaryBookings[]                   =   array(
                                                                'locationId'            => intval($row[0]),
                                                                'locationName'          => strval($row[1]),
                                                                'serviceId'             => intval($row[2]),
                                                                'serviceName'           => strval($row[3]),
                                                                'occupancyBooked'       => intval($row[4]),
                                                                'maxOccupancy'          => intval($row[5]),
                                                                'segmentStarts'         => strtotime($row[6]),
                                                                'segmentEnds'           => strtotime($row[7]),
                                                                'instructorsBooked'     => intval($row[8]),
                                                                'isFullyBooked'         => boolval($row[9])
                                                                );
            };
    };
     $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
     $requestResponse                                    =   $GOOD_REQUEST;
     mysqli_close($mysqli);
}catch (Exception $e){
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
};
$responseArray=array(
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $listOfSummaryBookings
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>