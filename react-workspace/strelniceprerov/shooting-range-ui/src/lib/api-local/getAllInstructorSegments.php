<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost                                         =   'localhost';
$databaseUsername                                     =   'root';
$databasePassword                                     =   'root';
$databaseName                                         =   'local';
$dateTimeActual                                       =   new DateTime();
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$responseArray                                        =   array();
$instructorSegments                                   =   [];
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getAllInstructorSegments';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getAllInstructorSegments';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                      Fetching the variables                                                */
/*------------------------------------------------------------------------------------------------------------*/
try{
    $query = "SELECT    instructor_segments.id,
                        instructor_segments.instructor_id,
                        instructor_segments.guid,
                        instructor_segments.start_time,
                        instructor_segments.end_time,
                        instructor_segments.isDeleted,
                        instructor_segments.userId,
                        instructor_segments.created,
                        instructor_segments.updated,
                        instructors.name
                        FROM  instructor_segments             as instructor_segments
                        INNER JOIN instructors as instructors ON instructor_segments.instructor_id=instructors.id
                        WHERE instructor_segments.isDeleted =   false
                        ORDER BY instructor_segments.guid, instructor_segments.start_time;";
    $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
        while ($row = mysqli_fetch_row($res)) {
            $instructorSegments[]                     =   array(
                                                            'id'                    => intval($row[0]),
                                                            'instructorId'          => intval($row[1]),
                                                            'uuid'                  => strval($row[2]),
                                                            'startTime'             => strtotime($row[3]),
                                                            'endTime'               => strtotime($row[4]),
                                                            'isDeleted'             => boolval($row[5]),
                                                            'modifiedBy'            => intval($row[6]),
                                                            'createdAt'             => strtotime($row[7]),
                                                            'lastUpdatedAt'         => strtotime($row[8]),
                                                            'instructorName'        => strval($row[9])
                                                            );
        };
    };
    $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
    $requestResponse                                    =   $GOOD_REQUEST;
    mysqli_close($mysqli);
}catch (Exception $e){
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
 };
$responseArray=array(
  'message'                                           =>  strval($responseMessage),
  'payload'                                           =>  $instructorSegments
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>