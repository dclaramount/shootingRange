<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
//General variables to connect to DB
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
$dateTimeActual                                       =   new DateTime();
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$BAD_REQUEST                                          =   400;
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$notEnoughInstructorsIfDeleted                        =   false;
$responseMessage                                      =   "";
$deletedInstructorSegments                            =   [];
//Retrieving the Messages for the differnt HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postDeleteInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_postDeleteInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postDeleteInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['guid']) && $_GET['guid']!="") {
    $guid                                               =   $_GET['guid'];
  } else {
    $guid                                               =   "";
  }
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
  /*------------------------------------------------------------------------------------------------------------*/
  /*           1. Verification if there are any bookings blocking the deletion of this instructor segment       */  
  /*------------------------------------------------------------------------------------------------------------*/
  $start                                            =   new DateTime($startSegment);
  $end                                              =   new DateTime($endSegment);
  while($start < $end && !$notEnoughInstructorsIfDeleted) {
    $startStr                                       =   $start->format('Y-m-d H:i:s');
    $start->modify('+1 hour');
    $endStr                                         =   $start->format('Y-m-d H:i:s');
    $query                                          =   "SELECT * FROM Summary_Instructor_Booking_Segments WHERE SegmentStarts='$startStr';";
    $res                                            =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    while ($row = mysqli_fetch_row($res)) {
      $instructorOccupancyBooked                      =   intval($row[2]);
      $maxInstructorAvailability                      =   intval($row[3]);
      $leftAvailability                               =   $maxInstructorAvailability - $instructorOccupancyBooked;
      $notEnoughInstructorsIfDeleted                  =   $leftAvailability===0;
      if($notEnoughInstructorsIfDeleted){
        $requestResponse                              =   $CONFLICT;
        $responseMessage                              =   $resultMessage[$CONFLICT];
      }
    }
  };
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  2. Deletion of this instructor segment                                    */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$notEnoughInstructorsIfDeleted){
    $query = "UPDATE instructor_segments SET isDeleted=1 WHERE guid ='$guid';";
    $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                              3. Pulling up the records of Deleted Segments                                 */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$notEnoughInstructorsIfDeleted){
    $query                                              =   "SELECT * FROM `instructor_segments` WHERE guid ='$guid';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $deletedInstructorSegments[]                    =   array(  
                                                        'id'                    => intval($row[0]),
                                                        'instructorId'          => intval($row[1]),
                                                        'uuid'                  => $row[2],
                                                        'startTime'             => strtotime($row[3])*1000, //Converting form unix timestamp https://stackoverflow.com/questions/10837022/convert-php-date-into-javascript-date-format
                                                        'endTime'               => strtotime($row[4])*1000,
                                                        'isDeleted'             => boolval($row[5]),
                                                        'userId'                => intval($row[6]),
                                                        'created'               => strtotime($row[7])*1000,
                                                        'updated'               => strtotime($row[8])*1000
                                                      );
        $index++;
      }
    };
    $responseMessage                                  =   $resultMessage[$GOOD_REQUEST];
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
  'notEnoughInstructorsIfDeleted'                     =>  boolval($notEnoughInstructorsIfDeleted),
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $deletedInstructorSegments
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>