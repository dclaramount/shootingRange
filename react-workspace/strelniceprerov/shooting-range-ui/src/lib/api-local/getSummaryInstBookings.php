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
$query = "SELECT  sBookingsI.OccupancyBooked  as 'OccupancyBooked',  
                  sBookingsI.MaxOccupancy    as 'MaxOccupancy',
                  sBookingsI.SegmentStarts   as 'SegmentStarts',
                  sBookingsI.SegmentEnds     as 'SegmentEnd'
                  FROM  Summary_Instructor_Booking_Segments as sBookingsI;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'occupancyBooked'                 => $row[0],
                            'maxOccupancy'                    => $row[1],
                            'segmentStarts'                   => $row[2],
                            'segmentEnd'                      => $row[3]
                          );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>