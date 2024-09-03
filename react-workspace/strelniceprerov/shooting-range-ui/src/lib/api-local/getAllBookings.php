<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'local';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);


//Variable that will hold the response
$responseArray = array();

//Executing the multi query
$query = "SELECT  location.name as 'Location',
                  bookings.invoice_id as 'Invoice',
                  bookings.number_of_people as 'Occupancy',
                  bookings.number_of_hours as 'Length',
                  bookings.start_time as 'Start',
                  bookings.end_time as 'End' FROM  invoice_item as bookings
                  INNER JOIN location as location ON bookings.location_id=location.id;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'ID'              => $index,
                            'location'        => $row[0], 
                            'invoiceId'       => $row[1],
                            'occupancy'       => $row[2],
                            'length'          => $row[3],
                            'start'           => $row[4],
                            'end'             => $row[5]);
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>