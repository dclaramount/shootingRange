<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
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
$startSegmentIsInThePast                              =   false;
$orderOfDatesIsWrong                                  =   false;
$instructorSegmentAlreadyCreated                      =   false;
$responseMessage                                      =   "";
//Retrieving the Messages for the differnt HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postCreateInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='400_postCreateInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$BAD_REQUEST]                        =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_postCreateInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
}
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postCreateInstructorSegment';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
}
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['instructorId']) && $_GET['instructorId']!="") {
    $instructorId = $_GET['instructorId'];
  } else {
    $instructorId = "";
  }
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
  /*------------------------------------------------------------------------------------------------------------*/
  /*                1.  Verification if Start Segment is older than actual time                                 */  
  /*------------------------------------------------------------------------------------------------------------*/
  $start                                              =   new DateTime($startSegment);
  $end                                                =   new DateTime($endSegment);
  $startSegmentIsInThePast                            =   $start <=  $dateTimeActual;
  if($startSegmentIsInThePast){
    $requestResponse                                  =   $BAD_REQUEST;
    $responseMessage                                  =   $resultMessage[$BAD_REQUEST];
  };
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    2. Verification if Finish Segment is older than Start Segment                           */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast){
    $start                                              =   new DateTime($startSegment);
    $end                                                =   new DateTime($endSegment);
    $orderOfDatesIsWrong                                =   $start >=  $end;
    if($orderOfDatesIsWrong){
      $requestResponse                                  =   $BAD_REQUEST;
      $responseMessage                                  =   $resultMessage[$BAD_REQUEST];
    };
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*        3. Verification if there is an Instructor Segment already for the time slots requested              */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong){
    $start                                            =   new DateTime($startSegment);
    $end                                              =   new DateTime($endSegment);
    while($start < $end && !$instructorSegmentAlreadyCreated) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          =   "SELECT * FROM instructor_segments WHERE instructor_id='$instructorId' AND start_time='$startStr' AND isDeleted=false;";
      $res                                            =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      if (!is_null($res->fetch_row())){
        $instructorSegmentAlreadyCreated              =   true;
        $requestResponse                              =   $CONFLICT;
        $responseMessage                              =   $resultMessage[$CONFLICT];
      };
    };
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                              4. Creation of the Instructor Segment                                         */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$instructorSegmentAlreadyCreated){
    $start                                            =   new DateTime($startSegment);
    $end                                              =   new DateTime($endSegment);
    while($start < $end) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          = "INSERT INTO instructor_segments (instructor_id, guid, start_time, end_time, isDeleted, userId)
                                                        VALUES ('$instructorId', '$guid', '$startStr', '$endStr', false, 1);";
      $res                                            = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      $responseMessage                                =   $resultMessage[$GOOD_REQUEST];
    }
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                              5. Fetching the segments created                                              */
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$instructorSegmentAlreadyCreated){
    $query                                              =   "SELECT * FROM `instructor_segments` WHERE isDeleted=false AND guid='$guid';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $blockingSegments[]                             =   array(  
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
    mysqli_close($mysqli);
  }
} catch (Exception $e){
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  6. Internal Server Error                                                  */
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
/*                                     7. Building of Response Object                                         */
/*------------------------------------------------------------------------------------------------------------*/
$responseArray=array(
  'startSegmentIsInThePast'                           =>  boolval($startSegmentIsInThePast),
  'orderOfDatesIsWrong'                               =>  boolval($orderOfDatesIsWrong),
  'instructorSegmentAlreadyCreated'                   =>  boolval($instructorSegmentAlreadyCreated),
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $blockingSegments
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>