<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

if (isset($_GET['phoneNumber']) && $_GET['phoneNumber']!="") {
  $phoneNumber = $_GET['phoneNumber'];
} else {
  $phoneNumber = "";
}

//Variable that will hold the response
$responseArray = array();

//Executing the multi query ONLY NON Deleted Records
$query = "SELECT * FROM user_list WHERE phoneNumber='$phoneNumber' AND isDeleted=false;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'ID'              => $index,
                            'id'              => $row[0],
                            'name'            => $row[2],
                            'email'           => $row[3],
                            'phoneNumber'     => $row[4],
                            'shootingPermit'  => $row[5],
                            'isDeleted'       => $row[6],
                            'userId'          => $row[7],
                            'createdOn'       => $row[8],
                            'updatedOn'       => $row[9]
  );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
http_response_code(200);
?>