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
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$dateTimeActual                                       =   new DateTime();
$responseArray                                        =   array();
$startSegmentIsInThePast                              =   false;
$filteredBookings                                     =   array();
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getBookingsFiltered';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try {
  if (isset($_GET['firstDayOfWeek']) && $_GET['firstDayOfWeek'] != "") {
    $firstDay = $_GET['firstDayOfWeek'];
  } else {
    $firstDay = "";
  }
  if (isset($_GET['lastDayOfWeek']) && $_GET['lastDayOfWeek'] != "") {
    $lastDay = $_GET['lastDayOfWeek'];
  } else {
    $lastDay = "";
  }
  if (isset($_GET['location']) && $_GET['location'] != "") {
    $locationId = $_GET['location'];
  } else {
    $locationId = "";
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                      Fetch Bookings by Date the Invoice                                                    */
  /*------------------------------------------------------------------------------------------------------------*/
  $query = "SELECT  location.name as 'Location',
  bookings.invoice_id as 'Invoice',
  bookings.number_of_people as 'Occupancy',
  svc.max_capacity as 'MaxCapacity',
  bookings.number_of_hours as 'Length',
  bookings.start_time as 'Start',
  bookings.end_time as 'End',
  bookings.with_instructor as 'Instructor',
  inv.comment as 'Comments',
  ul.name as 'Name',
  svc.id as 'serviceId',
  svc.name as 'serviceName',
  location.id as 'locationId',
  ul.shootingPermit as 'shootingPermit',
  ul.phoneNumber as 'PhoneNumber',
  ul.email as 'email',
  inv.uuidInvoice as 'uuid',
  ul.id as 'userId'
  FROM  invoice_item as bookings
  INNER JOIN location as location ON bookings.location_id=location.id
  INNER JOIN services as svc ON svc.location_id=location.id
  INNER JOIN invoice as inv  ON inv.id = bookings.invoice_id
  INNER JOIN user_list as ul  ON ul.id = inv.user_id
  WHERE bookings.start_time >= '$firstDay'  AND bookings.end_time <= '$lastDay' AND bookings.location_id='$locationId' AND inv.is_deleted=false;";
  $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
  if ($res) {
    while ($row = mysqli_fetch_row($res)) {
      $filteredBookings[] = array(
        'location'        => $row[0],
        'invoiceId'       => intval($row[1]),
        'occupancy'       => intval($row[2]),
        'maxOccupancy'    => intval($row[3]),
        'length'          => intval($row[4]),
        'start'           => strtotime($row[5]) * 1000,
        'end'             => strtotime($row[6]) * 1000,
        'withInstructor'  => boolval($row[7]),
        'comments'        => $row[8],
        'withComments'    => boolval(count(explode(";", $row[8])) > 0),
        'name'            => $row[9],
        'serviceId'       => intval($row[10]),
        'serviceName'     => $row[11],
        'locationId'      => intval($row[12]),
        'shootingPermit'  => $row[13],
        'phoneNumber'     => $row[14],
        'email'           => $row[15],
        'uuid'            => $row[16],
        'userId'          => $row[17]
      );
    }
    $res->free_result();
    $requestResponse                                    = $GOOD_REQUEST;
    $responseMessage                                    = $resultMessage[$GOOD_REQUEST];
  }
} catch (Exception $e) {
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
  $eMessage                                             =   $e->getMessage();
  $eLine                                                =   $e->getLine();
  $eFile                                                =   $e->getFile();
  $responseMessage                                      =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                      =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine";
  send_remote_curl('Pulling up filtered bookings failed  had an Exception.', (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine", (basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray = array(
  "message"                                             =>  strval($responseMessage),
  "filteredBookings"                                    =>  $filteredBookings,
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Fetching Filtered Bookings returned $requestResponse.", (basename($_SERVER['PHP_SELF'], '.php')));
