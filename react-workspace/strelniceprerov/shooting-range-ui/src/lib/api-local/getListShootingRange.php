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
$listOfServicesFullInfo                               =   [];
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_getListShootingRange';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_getListShootingRange';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                      Fetching the variables                                                */
/*------------------------------------------------------------------------------------------------------------*/
try{
    $query  = "SELECT   service.id,
                        service.location_id,
                        service.name,
                        service.min_capacity,
                        service.max_capacity,
                        service.comment,
                        service.isDeleted,
                        service.userId,
                        service.created,
                        service.updated,
                        location.name,
                        location.comment
                        FROM services             as  service
                        INNER JOIN location as location ON service.location_id = location.id
                        WHERE service.isDeleted=0;";
    $res    = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($res) {
        while ($row = mysqli_fetch_row($res)) {
            $listOfServicesFullInfo[]                   =   array(
                                                                'id'                    => intval($row[0]),
                                                                'locationId'            => intval($row[1]),
                                                                'name'                  => strval($row[2]),
                                                                'minCapacity'           => intval($row[3]),
                                                                'maxCapacity'           => intval($row[4]),
                                                                'comment'               => strval($row[5]),
                                                                'isDeleted'             => boolval($row[5]),
                                                                'modifiedBy'            => intval($row[6]),
                                                                'createdAt'             => strtotime($row[7]),
                                                                'lastUpdatedAt'         => strtotime($row[8]),
                                                                'locationName'          => strval($row[9]),
                                                                'locationComment'       => strval($row[10])
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
  'payload'                                           =>  $listOfServicesFullInfo
);
http_response_code($requestResponse);
echo json_encode($responseArray);
?>