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
$query = "SELECT  instructor_segments.id                as 'id',
                  instructor_segments.instructor_id     as 'instructorId',
                  instructors.name                      as 'instructorName',
                  instructor_segments.guid              as 'guid',
                  instructor_segments.start_time        as 'startTime',
                  instructor_segments.end_time          as 'endTime'
                  FROM  instructor_segments             as instructor_segments
                  INNER JOIN instructors as instructors ON instructor_segments.instructor_id=instructors.id
                  WHERE instructor_segments.isDeleted =   false;";
 
//Retrieving the records
$res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if ($res) {
  $index = 1;
  while ($row = mysqli_fetch_row($res)) {
    $responseArray[]=array( 'id'                        => $row[0],
                            'instructorId'              => $row[1],
                            'instructorName'            => $row[2],
                            'guid'                      => $row[3],
                            'startTime'                 => $row[4],
                            'endTime'                   => $row[5]
                          );
    $index++;
  }
  $res->free_result();
}
mysqli_close($mysqli);
echo json_encode($responseArray);
?>