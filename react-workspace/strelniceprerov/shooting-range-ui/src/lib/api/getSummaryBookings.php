<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");

//Variable that will hold the response
$responseArray = array();

//Executing the multi query
$query = "SELECT  sBookings.Location_Id       as  'LocationId',
                  sBookings.Location_Name     as  'Location',
                  sBookings.Service_Id        as  'ServiceId',
                  sBookings.Service_Name      as  'ServiceName',
                  sBookings.OccupancyBooked   as  'OccupancyBooked',
                  sBookings.Max_Occupancy     as  'MaxOccupancy',
                  sBookings.SegmentStarts     as  'SegmentStarts',
                  sBookings.SegmentEnds       as  'SegmentEnd'
                  FROM  Summary_Booking_Segments as sBookings;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'                              => $index,
                            'locationId'                      => $row[0],           
                            'location'                        => $row[1],
                            'serviceId'                       => $row[2],
                            'service'                         => $row[3],
                            'occupancyBooked'                 => $row[4],
                            'maxOccupancy'                    => $row[5],
                            'segmentStarts'                   => $row[6],
                            'segmentEnd'                      => $row[7]
                          );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>