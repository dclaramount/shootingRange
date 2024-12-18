<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);


//Variable that will hold the response
$responseArray = array();

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


//Executing the multi query
$query = "SELECT  location.name as 'Location',
                  bookings.invoice_id as 'Invoice',
                  bookings.number_of_people as 'Occupancy',
                  svc.max_capacity as 'MaxCapacity',
                  bookings.number_of_hours as 'Length',
                  bookings.start_time as 'Start',
                  bookings.end_time as 'End' FROM  invoice_item as bookings
                  INNER JOIN location as location ON bookings.location_id=location.id
                  INNER JOIN services as svc ON svc.location_id=location.id
                  WHERE bookings.start_time >= '$firstDay'  AND bookings.end_time <= '$lastDay' AND bookings.location_id='$locationId';";

//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
if ($res) {
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[] = array(
      'location'        => $row[0],
      'invoiceId'       => $row[1],
      'occupancy'       => $row[2],
      'maxOccupancy'    => $row[3],
      'length'          => $row[4],
      'start'           => $row[5],
      'end'             => $row[6]
    );
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
