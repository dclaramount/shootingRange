<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
//General variables to connect to DB
$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'local';
$dateTimeActual                                       =   new DateTime();
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$BAD_REQUEST                                          =   400;
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$blockingSegments                                     =   [];
$requestResponse                                      =   $GOOD_REQUEST;
$bookingPresentInTimeSegment                          =   false;
$startSegmentIsInThePast                              =   false;
$blockSegmentAlreadyCreated                           =   false;
$responseMessage                                      =   "";
//Retrieving the Messages for the differnt HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postCreateBlockingSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='400_postCreateBlockingSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$BAD_REQUEST]                        =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_postCreateBlockingSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postCreateBlockingSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['start']) && $_GET['start']!="") {
    $startSegment                                     =   $_GET['start'];
  } else {
    $startSegment                                     =   "";
  }
  if (isset($_GET['end']) && $_GET['end']!="") {
    $endSegment                                       =   $_GET['end'];
  } else {
    $endSegment                                       =   "";
  }
  if (isset($_GET['guid']) && $_GET['guid']!="") {
    $guid                                             =   $_GET['guid'];
  } else {
    $guid                                             =   "";
  }
  if (isset($_GET['name']) && $_GET['name']!="") {
    $name                                             =   $_GET['name'];
  } else {
    $name                                             =   "";
  }
  if (isset($_GET['locationId']) && $_GET['locationId']!="") {
    $locationId                                       =   $_GET['locationId'];
  } else {
    $locationId                                       =   "";
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    Verification if Start Segment is older than actual time                                 */  
  /*------------------------------------------------------------------------------------------------------------*/
  $start                                              =   new DateTime($startSegment);
  $end                                                =   new DateTime($endSegment);
  $startSegmentIsInThePast                            =   $start <=  $dateTimeActual;
  if($startSegmentIsInThePast){
    $requestResponse                                  =   $CONFLICT;
    $responseMessage                                  =   $resultMessage[$CONFLICT];
  };
  /*------------------------------------------------------------------------------------------------------------*/
  /*              Verification if there is a Block Segment already for the time slots requested                 */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast){
    $start                                            =   new DateTime($startSegment);
    $end                                              =   new DateTime($endSegment);
    while($start < $end && !$bookingPresentInTimeSegment) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          =   $locationId === '3' ? "SELECT * FROM blocking_segments WHERE start_time='$startStr' AND isDeleted=false;" : "SELECT * FROM blocking_segments WHERE start_time='$startStr' AND location_id='$locationId' AND isDeleted=false;";;
      $res                                            =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      if (!is_null($res->fetch_row())){
        $blockSegmentAlreadyCreated                   =   true;
        $requestResponse                              =   $CONFLICT;
        $responseMessage                              =   $resultMessage[$CONFLICT];
        while($row = mysqli_fetch_row($res)){};
      };
    };
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*             Verification if there is a booking in the time segment that you are trying to block            */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$blockSegmentAlreadyCreated){
    $start                                            =   new DateTime($startSegment);
    $end                                              =   new DateTime($endSegment);
    while($start < $end && !$bookingPresentInTimeSegment) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          =   "SELECT * FROM Summary_Booking_Segments WHERE SegmentStarts='$startStr' AND location_id='$locationId';";
      $res                                            =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      if (!is_null($res->fetch_row())){
        $bookingPresentInTimeSegment                  =   true;
        $requestResponse                              =   $CONFLICT;
        $responseMessage                              =   $resultMessage[$CONFLICT];
      };
    };
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Creation of the blocking segments                                         */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast &&  !$blockSegmentAlreadyCreated && !$bookingPresentInTimeSegment){
    $start                                            =   new DateTime($startSegment);
    $end                                              =   new DateTime($endSegment);
    while($start < $end) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          =   "INSERT INTO blocking_segments (location_id, name, guid, start_time, end_time, isDeleted, userId)
                                                          VALUES ('$locationId', '$name', '$guid', '$startStr', '$endStr', false, 1);";
      $res                                            =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    };
    $responseMessage                                  =   $resultMessage[$GOOD_REQUEST];
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                 Fetching the segments created                                              */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast &&  !$blockSegmentAlreadyCreated && !$bookingPresentInTimeSegment){
    $query                                              =   "SELECT * FROM `blocking_segments` WHERE isDeleted=false AND guid='$guid';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $blockingSegments[]                             =   array(  
                                                        'id'                    => intval($row[0]),
                                                        'locationId'            => intval($row[1]),
                                                        'name'                  => $row[2],
                                                        'uuid'                  => $row[3],
                                                        'startTime'             => strtotime($row[4])*1000, //Converting form unix timestamp https://stackoverflow.com/questions/10837022/convert-php-date-into-javascript-date-format
                                                        'endTime'               => strtotime($row[5])*1000,
                                                        'isDeleted'             => boolval($row[6]),
                                                        'userId'                => intval($row[7]),
                                                        'created'               => strtotime($row[8])*1000,
                                                        'updated'               => strtotime($row[9])*1000
                                                      );
        $index++;
      }
    };
    mysqli_close($mysqli);
  }
} catch (Exception $e){
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                    =   $INTERNAL_SERVER_ERROR;
  $eMessage                                           =   $e->getMessage();
  $eLine                                              =   $e->getLine();
  $eFile                                              =   $e->getFile();
  $responseMessage                                    =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                    =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ;
  mysqli_close($mysqli);
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Building of Response Object                                     */
/*------------------------------------------------------------------------------------------------------------*/
$responseArray=array(
  'bookingPresentInTimeSegment'                       =>  boolval($bookingPresentInTimeSegment),
  'startSegmentIsInThePast'                           =>  boolval($startSegmentIsInThePast),
  'blockSegmentAlreadyCreated'                        =>  boolval($blockSegmentAlreadyCreated),
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $blockingSegments
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>