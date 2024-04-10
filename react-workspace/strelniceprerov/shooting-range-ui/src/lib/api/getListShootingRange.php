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
$query = "SELECT  serv.id           as 'Id',
                  serv.location_id  as 'LocationId',
                  location.name     as 'LocationName',
                  serv.name         as 'Name',
                  serv.max_capacity as 'Capacity',
                  serv.isDeleted    as  'isDeleted',
                  serv.userId       as  'userId',
                  serv.created      as  'created',
                  serv.updated      as  'updated'
                  FROM services     as  serv
                    INNER JOIN location
                        ON serv.location_id = location.id 
                  WHERE serv.isDeleted=0;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'            => $row[0], 
                            'locationId'    => $row[1],
                            'locationName'  => $row[2],
                            'serviceName'   => $row[3],
                            'capacity'      => $row[4],
                            'isDeleted'     => $row[5],
                            'userId'        => $row[6],
                            'created'       => $row[7],
                            'updated'       => $row[8]);
  }
  $res->free_result();
}

mysqli_close($mysqli);
echo json_encode($responseArray);
?>