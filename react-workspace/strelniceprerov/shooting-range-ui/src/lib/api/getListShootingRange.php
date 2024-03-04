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
$query = "SELECT * FROM location";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'        => $row[0], 
                            'name'      => $row[1],
                            'capacity'  => $row[2],
                            'isDeleted' => $row[3],
                            'userId'    => $row[4],
                            'created'   => $row[5],
                            'updated'   => $row[6]);
  }
  $res->free_result();
}

mysqli_close($mysqli);
echo json_encode($responseArray);
?>