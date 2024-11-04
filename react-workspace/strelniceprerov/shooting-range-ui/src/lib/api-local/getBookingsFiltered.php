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
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseArray                                        =   array();
$filteredBookings                                     =   [];
$orderOfDatesIsNotCorrect                             =   false;
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
    if (isset($_GET['firstDayOfWeek']) && $_GET['firstDayOfWeek']!="") {
      $firstDay = $_GET['firstDayOfWeek'];
    } else {
      $firstDay = "";
    }
    if (isset($_GET['lastDayOfWeek']) && $_GET['lastDayOfWeek']!="") {
      $lastDay = $_GET['lastDayOfWeek'];
    } else {
      $lastDay = "";
    }
    if (isset($_GET['location']) && $_GET['location']!="") {
      $locationId = $_GET['location'];
    } else {
      $locationId = "";
    }
    /*------------------------------------------------------------------------------------------------------------*/
    /*                    Verification that Last Day is older than First Day                                      */
    /*------------------------------------------------------------------------------------------------------------*/
    $firstDayOfWeek                                     =   new DateTime($firstDay);
    $lastDayOfWeek                                      =   new DateTime($lastDay);
    $orderOfDatesIsNotCorrect                           =   $lastDayOfWeek <=  $firstDayOfWeek;
    if($orderOfDatesIsNotCorrect){
        $requestResponse                                =   $CONFLICT;
        $responseMessage                                =   $resultMessage[$CONFLICT];
    };
    /*------------------------------------------------------------------------------------------------------------*/
    /*                                      Fetching the variables                                                */
    /*------------------------------------------------------------------------------------------------------------*/
    if(!$orderOfDatesIsNotCorrect){
        $query = "SELECT
                          bookings.id,
                          bookings.invoice_id,
                          bookings.location_id,
                          bookings.number_of_people,
                          bookings.number_of_hours,
                          bookings.with_instructor,
                          bookings.start_time,
                          bookings.end_time,
                          bookings.isDeleted,
                          bookings.userId,
                          bookings.created,
                          bookings.updated,
                          location.name,
                          svc.max_capacity FROM  invoice_item as bookings
                          INNER JOIN location as location ON bookings.location_id=location.id
                          INNER JOIN services as svc ON svc.location_id=location.id
                          WHERE bookings.start_time >= '$firstDay'  AND bookings.end_time <= '$lastDay' AND bookings.location_id='$locationId';";
        $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
        if ($res) {
            while ($row = mysqli_fetch_row($res)) {
                $filteredBookings[]                     =   array(
                                                                'id'                    => intval($row[0]),
                                                                'invoiceId'             => intval($row[1]),
                                                                'locationId'            => intval($row[2]),
                                                                'occupancy'             => strval($row[3]),
                                                                'length'                => intval($row[4]),
                                                                'withInstructor'        => boolval($row[5]),
                                                                'startTime'             => strtotime($row[6]),
                                                                'endTime'               => strtotime($row[7]),
                                                                'isDeleted'             => boolval($row[8]),
                                                                'modifiedBy'            => intval($row[9]),
                                                                'createdAt'             => strtotime($row[10]),
                                                                'lastUpdatedAt'         => strtotime($row[11]),
                                                                'locationName'          => strval($row[12]),
                                                                'locationMaxCapacity'   => intval($row[13])
                                                              );
            }
        };
        $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
        $requestResponse                                    =   $GOOD_REQUEST;
        mysqli_close($mysqli);
    }
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
  'orderOfDatesIsNotCorrect'                          =>  boolval($orderOfDatesIsNotCorrect),
  'payload'                                           =>  $filteredBookings
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>