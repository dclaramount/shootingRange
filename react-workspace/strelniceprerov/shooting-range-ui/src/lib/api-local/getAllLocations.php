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
$query = "SELECT  * FROM  location WHERE isDeleted = false;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array(   'id'              => intval($row[0]),
                              'name'            => $row[1],
                              //'comment'         => $row[2],
                              'color'           => $row[7],
                              'isDeleted'       => boolval($row[3]),
                              'userId'          => intval($row[4]),
                              'createdAt'       => strtotime($row[5])*1000,
                              'updatedAt'       => strtotime($row[6])*1000
                          );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
http_response_code(200);
echo json_encode($responseArray);
?>