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

//Executing the multi query
$query = "SELECT  * FROM  Summary_View_Bookings;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'                      => intval($row[0]),
                            'invoiceId'               => intval($row[1]),
                            'invoiceType'             => $row[2],
                            'locationName'            => $row[3],
                            'occupancy'               => intval($row[4]),
                            'locationMaxOccupancy'    => intval($row[5]),
                            'lenght'                  => intval($row[6]),
                            'instructor'              => boolval($row[7]),
                            'startTime'               => strtotime($row[8]),
                            'endTime'                 => strtotime($row[9]),
                            'isDeleted'               => boolval($row[10]),
                            'customerName'            => $row[11], 
                            'customerEmail'           => $row[12],
                            'phoneNumber'             => $row[13],
                            'createdOn'               => strtotime($row[14]),
                            'updatedOn'               => strtotime($row[15]),
                            'parentInvoice'           => intval($row[16])
                          );
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>