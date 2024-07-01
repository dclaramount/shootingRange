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
$differentDatesWithOriginalSegment                    =   false;
$splitSegmentOutOfBoundaries                          =   false;
$notEnoughInstructorsIfDeleted                        =   false;
$blockSegmentAlreadyCreated                           =   false;
$responseMessage                                      =   "";
$oldInstructorSegments                                =   [];
$newInstructorSegments                                =   [];
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
  if (isset($_GET['originalStart']) && $_GET['originalStart']!="") {
    $originalStart                                    =   $_GET['originalStart'];
  } else {
    $originalStart                                    =   "";
  }
  if (isset($_GET['end']) && $_GET['end']!="") {
    $endSegment                                       =   $_GET['end'];
  } else {
    $endSegment                                       =   "";
  }
  if (isset($_GET['originalEnd']) && $_GET['originalEnd']!="") {
    $originalEnd                                      =   $_GET['originalEnd'];
  } else {
    $originalEnd                                      =   "";
  }
  if (isset($_GET['guid']) && $_GET['guid']!="") {
    $guid                                             =   $_GET['guid'];
  } else {
    $guid                                             =   "";
  }
  if (isset($_GET['guid1']) && $_GET['guid1']!="") {
    $guid1                                            =   $_GET['guid1'];
  } else {
    $guid1                                            =   "";
  }
  if (isset($_GET['guid2']) && $_GET['guid2']!="") {
    $guid2                                            =   $_GET['guid2'];
  } else {
    $guid2                                            =   "";
  }
  if (isset($_GET['instructor']) && $_GET['instructor']!="") {
    $instructor                                       =   $_GET['instructor'];
  } else {
    $instructor                                       =   "";
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    1. Verification if Start Segment is older than actual time                              */  
  /*------------------------------------------------------------------------------------------------------------*/
  $start                                              =   new DateTime($startSegment);
  $end                                                =   new DateTime($endSegment);
  $startSegmentIsInThePast                            =   $start <=  $dateTimeActual;
  if($startSegmentIsInThePast){
    $requestResponse                                  =   $BAD_REQUEST;
    $responseMessage                                  =   $resultMessage[$BAD_REQUEST];
  };
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    2. Verification if Finish Segment is older than Start Segment                              */  
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
  /*                           3. Verification that the requested date is the same as original                  */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong){
    $start                                              =   new DateTime($startSegment);
    $end                                                =   new DateTime($endSegment);
    $origStar                                           =   new DateTime($originalStart);
    $origEnd                                            =   new DateTime($originalEnd);
    $differentDatesWithOriginalSegment                  =   ( $start->format("Y-m-d") !== $origStar->format("Y-m-d") ||
                                                              $end->format("Y-m-d") !== $origEnd->format("Y-m-d"));
    if($differentDatesWithOriginalSegment){
      $requestResponse                                  =   $BAD_REQUEST;
      $responseMessage                                  =   $resultMessage[$BAD_REQUEST];
    };
  }  
  /*------------------------------------------------------------------------------------------------------------*/
  /*                4. Verification that the split segment falls within the original segment                    */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment){
    $start                                              =   new DateTime($startSegment);
    $end                                                =   new DateTime($endSegment);
    $origStar                                           =   new DateTime($originalStart);
    $origEnd                                            =   new DateTime($originalEnd);
    $splitSegmentOutOfBoundaries                        =   ( $start->format("Y-m-d") !== $origStar->format("Y-m-d") ||
                                                              $end->format("Y-m-d") !== $origEnd->format("Y-m-d"));
    if($splitSegmentOutOfBoundaries){
      $requestResponse                                  =   $BAD_REQUEST;
      $responseMessage                                  =   $resultMessage[$BAD_REQUEST];
    };
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*           5. Verification if there are any bookings blocking the split of this instructor segment          */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries){
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
  };
  /*------------------------------------------------------------------------------------------------------------*/
  /*                        7. Pull the old 1 hour instructor segments                                          */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $query                                              =   "SELECT * FROM `instructor_segments` WHERE isDeleted=false AND guid='$guid';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $oldInstructorSegments[]                             =   array(  
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
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                6. Flag the old segment as Deleted.                                         */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $query = "UPDATE instructor_segments SET isDeleted=1 WHERE guid LIKE '%$guid%';";
    $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                7. Create New Segment (Part 1)                                              */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $start                                            =   new DateTime($originalStart);
    $end                                              =   new DateTime($startSegment);
    $startTest = $start->format('Y-m-d H:i:s');
    $endTest = $end->format('Y-m-d H:i:s');
    echo "We will create a segment from '$startTest' to '$endTest'";
    while($start < $end) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          = "INSERT INTO instructor_segments (instructor_id, guid, start_time, end_time, isDeleted, userId)
                                                        VALUES ('$instructor', '$guid1', '$startStr', '$endStr', false, 1);";
                                                        echo $query;
      $res                                            = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    }
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                        8. Pull the  1 hour instructor segments (1st Segment)                               */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $query                                              =   "SELECT * FROM `instructor_segments` WHERE isDeleted=false AND guid='$guid1';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $newInstructorSegments[]                             =   array(  
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
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                9. Create New Segment (Part 2)                                              */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $start                                            =   new DateTime($endSegment);
    $end                                              =   new DateTime($originalEnd);
    while($start < $end) {
      $startStr                                       =   $start->format('Y-m-d H:i:s');
      $start->modify('+1 hour');
      $endStr                                         =   $start->format('Y-m-d H:i:s');
      $query                                          = "INSERT INTO instructor_segments (instructor_id, guid, start_time, end_time, isDeleted, userId)
                                                        VALUES ('$instructor', '$guid2', '$startStr', '$endStr', false, 1);";
      $res                                            = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    }
  }
  /*------------------------------------------------------------------------------------------------------------*/
  /*                        10. Pull the  1 hour instructor segments (2nd Segment)                              */  
  /*------------------------------------------------------------------------------------------------------------*/
  if(!$startSegmentIsInThePast && !$orderOfDatesIsWrong && !$differentDatesWithOriginalSegment && !$splitSegmentOutOfBoundaries && !$notEnoughInstructorsIfDeleted){
    $query                                              =   "SELECT * FROM `instructor_segments` WHERE isDeleted=false AND guid='$guid2';";
    $res                                                =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
      $index                                            =   1;
      while ($row = mysqli_fetch_row($res)) {
        $newInstructorSegments[]                             =   array(  
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
  'startSegmentIsInThePast'                           =>  boolval($startSegmentIsInThePast),
  'orderOfDatesIsWrong'                               =>  boolval($orderOfDatesIsWrong),
  'differentDatesWithOriginalSegment'                 =>  boolval($differentDatesWithOriginalSegment),
  'splitSegmentOutOfBoundaries'                       =>  boolval($splitSegmentOutOfBoundaries),
  'notEnoughInstructorsIfDeleted'                     =>  boolval($notEnoughInstructorsIfDeleted),
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  array('oldSegment' => $oldInstructorSegments, 'newSegments' => $newInstructorSegments)
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>