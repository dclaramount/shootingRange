<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$BAD_REQUEST = 400;
if (isset($_GET['start']) && $_GET['start']!="") {
  $startSegment = $_GET['start'];
} else {
  $startSegment = "";
}
if (isset($_GET['end']) && $_GET['end']!="") {
  $endSegment = $_GET['end'];
} else {
  $endSegment = "";
}
if (isset($_GET['guid']) && $_GET['guid']!="") {
  $guid = $_GET['guid'];
} else {
  $guid = "";
}
/*
//Deal  breaker part
$startDealBreaker = new DateTime($startSegment);
$endDealBreaker   = new DateTime($endSegment);
$dealBreaker = false;
while($startDealBreaker < $endDealBreaker) {
  $startStrDealBreaker = $startDealBreaker->format('Y-m-d H:i:s');
  $startDealBreaker->modify('+1 hour');
  $endStrDealBreaker = $startDealBreaker->format('Y-m-d H:i:s');
  $query = "SELECT * from blocking_segments WHERE instructor_id='$instructorId' AND start_time='$startStrDealBreaker' AND end_time='$endStrDealBreaker' AND isDeleted=false;"; 
  $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    while ($row = mysqli_fetch_row($res)) {
      $dealBreaker = true;          //There is an existing segment already for the instructor at the given time.               
    }
    $res->free_result();
  }
}
if($dealBreaker){
  http_response_code(400); // BAD REQUEST BECAUSE SEGMENT FOR THE INSTRUCTOR ALREADY EXISTS
}
else{
  $start = new DateTime($startSegment);
  $end   = new DateTime($endSegment);
  while($start < $end) {
    $startStr = $start->format('Y-m-d H:i:s');
    $start->modify('+1 hour');
    $endStr = $start->format('Y-m-d H:i:s');
    $query = "INSERT INTO blocking_segments (instructor_id, guid, start_time, end_time, isDeleted, userId)
              VALUES ('$instructorId', '$guid', '$startStr', '$endStr', false, 1);";
    $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  }
  http_response_code(200);
}

mysqli_close($mysqli);*/
http_response_code($BAD_REQUEST);

?>