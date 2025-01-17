<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('./papertraillogs.php');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
$GOOD_REQUEST                                         =   200;
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$isThereABlocker                                      =   false;
$responseMessage                                      =   "";
$response                                             =   "";
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getIsThereConflictBlocker';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_getIsThereConflictBlocker';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getIsThereConflictBlocker';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try {
  if (isset($_GET['selectedSegment']) && $_GET['selectedSegment'] != "") {
    $selectedSegment = $_GET['selectedSegment'];
  } else {
    $selectedSegments = "";
  }
  if (isset($_GET['selectedBookingDuration']) && $_GET['selectedBookingDuration'] != "") {
    $selectedBookingDuration = $_GET['selectedBookingDuration'];
  } else {
    $selectedBookingDuration = "";
  }
  $selectedSegments                                   =   explode(',', $selectedSegment);
  $start                                              =   strtotime($selectedSegments[0]);
  $startTime                                          =   date("Y-m-d H:i:s", $start);
  $end                                                =   strtotime($selectedSegments[0]) + 60 * 60;
  $endTime                                            =   date("Y-m-d H:i:s", $end);
  /* Iterating over the for loop to create the individual 1 hour segments */
  for ($x = 1; $x <= $selectedBookingDuration; $x++) {
    $queryCount                                       =   "SELECT count(*) as total from blocking_segments WHERE start_time='$startTime' AND end_time='$endTime';";
    $result                                           =   mysqli_query($mysqli, $queryCount, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
    $data                                             =   $result->fetch_assoc();
    $countBlockers                                    =   $data['total'];
    send_remote_curl("For the start Segment $startTime -> $endTime returned counter of $countBlockers .", (basename($_SERVER['PHP_SELF'], '.php')));
    if ($countBlockers > 0) {
      $requestResponse                                =   $CONFLICT;
      $responseMessage                                =   $resultMessage[$CONFLICT];
      $isThereABlocker                                =   true;
      break;
    };
    $startTime                                        =   date("Y-m-d H:i:s", $start + 60 * 60 * intval($x));
    $endTime                                          =   date("Y-m-d H:i:s", $end + 60 * 60 * intval($x));
  }
  if (!$isThereABlocker) {
    $requestResponse                                  =   $GOOD_REQUEST;
    $responseMessage                                  =   $resultMessage[$GOOD_REQUEST];
  }
  mysqli_close($mysqli);
} catch (Exception $e) {
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
  $eMessage                                             =   $e->getMessage();
  $eLine                                                =   $e->getLine();
  $eFile                                                =   $e->getFile();
  $responseMessage                                      =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                      =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine";
  send_remote_curl('Verification of Blocking Segments Returned an Exception.', (basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine", (basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}
$responseArray = array(
  'message'                                             =>  strval($responseMessage),
  'isThereABlocker'                                     =>  boolval($isThereABlocker),
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Verification of Blocking Segments returned $requestResponse.", (basename($_SERVER['PHP_SELF'], '.php')));
