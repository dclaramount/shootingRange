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

"SELECT * FROM `blocking_segments` WHERE isDeleted=false;";
//Executing the multi query
$query = "SELECT * FROM `blocking_segments` WHERE isDeleted=false;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'                => intval($row[0]),
                            'name'              => $row[1],
                            'uuid'              => $row[2],
                            'startTime'         => strtotime($row[3])*1000, //Converting form unix timestamp https://stackoverflow.com/questions/10837022/convert-php-date-into-javascript-date-format
                            'endTime'           => strtotime($row[4])*1000
                          );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>