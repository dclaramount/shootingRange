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
$query = "SELECT  * FROM  Summary_View_Bookings WHERE invoiceItemDeleted = false;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'                      => intval($row[0]),
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
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>