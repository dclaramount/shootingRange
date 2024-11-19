<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('./papertraillogs.php');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost                                         =  'localhost';
$databaseUsername                                     =   'www-strelnic';
$databasePassword                                     =   'bQASvDoM9K4g';
$databaseName                                         =   'www-strelnic';
$mysqli                                               =   mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");
//HTTP-Codes that will return
$GOOD_REQUEST                                         =   200;
$CONFLICT                                             =   409;
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$dateTimeActual                                       =   new DateTime();
$responseArray                                        =   array();
$startSegmentIsInThePast                              =   false;
$responseNewInvoice                                   =   array();
$responseNewInvoiceItem                               =   array();
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postCreateBooking';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='409_postCreateBooking';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$CONFLICT]                           =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postCreateBooking';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['selectedLocationId']) && $_GET['selectedLocationId']!="") {
    $selectedLocationId                               =   $_GET['selectedLocationId'];
  } else {
    $selectedLocationId                               =   "";
  }
  if (isset($_GET['selectedSegment']) && $_GET['selectedSegment']!="") {
    $selectedSegment                                  =   $_GET['selectedSegment'];
  } else {
    $selectedSegment                                  =   "";
  }
  if (isset($_GET['selectedBookingDuration']) && $_GET['selectedBookingDuration']!="") {
    $selectedBookingDuration                          =   $_GET['selectedBookingDuration'];
  } else {
    $selectedBookingDuration                          =   "";
  }
  if (isset($_GET['selectedOccupancy']) && $_GET['selectedOccupancy']!="") {
    $selectedOccupancy                                =   $_GET['selectedOccupancy'];
  } else {
    $selectedOccupancy                                =   "";
  }
  if (isset($_GET['shootingInstructor']) && $_GET['shootingInstructor']!="") {
    $shootingInstructor                               =   $_GET['shootingInstructor'];
  } else {
    $shootingInstructor                               =   "";
  }
  if (isset($_GET['userId']) && $_GET['userId']!="") {
    $userId                                           =   $_GET['userId'];
  } else {
    $userId                                           =   "";
  }
  if (isset($_GET['uuidInvoice']) && $_GET['uuidInvoice']!="") {
    $uuidInvoice                                      =   $_GET['uuidInvoice'];
  } else {
    $uuidInvoice                                      =   "";
  }
  if (isset($_GET['comment']) && $_GET['comment']!="") {
    $comment                                          =   $_GET['comment'];
  } else {
    $comment                                          =   "";
  }
  send_remote_curl("Creating new reservation with UUID $uuidInvoice.",(basename($_SERVER['PHP_SELF'], '.php')));
  /*------------------------------------------------------------------------------------------------------------*/
  /*                    Verification if Start Segment is older than actual time                                 */  
  /*------------------------------------------------------------------------------------------------------------*/
  $selectedSegmentValidation                          =   explode(',',$selectedSegment);
  $startControlTime                                   =   strtotime($selectedSegmentValidation[0]);
  $startSegmentIsInThePast                            =   $startControlTime <=  $dateTimeActual;
  if($startSegmentIsInThePast){
    $requestResponse                                  =   $CONFLICT;
    $responseMessage                                  =   $resultMessage[$CONFLICT];
  };
  if(!$startSegmentIsInThePast){
    /*------------------------------------------------------------------------------------------------------------*/
    /*                                      Create the Invoice                                                    */  
    /*------------------------------------------------------------------------------------------------------------*/
    $newUserId = $userId;
    $queryCreateInvoice                               =   "INSERT INTO invoice (user_id, invoice_type_id, is_deleted, comment, uuidInvoice, userId) VALUES ('$newUserId', 1 , false, '$comment;', '$uuidInvoice',1);";
    $queryNewInvoice                                  =   "SELECT *  FROM invoice WHERE user_id='$newUserId' ORDER BY id DESC LIMIT 1;";
    $resCreateInvoice                                 =   mysqli_query($mysqli, $queryCreateInvoice, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if($resCreateInvoice){
      $resNewInvoice                                  =   mysqli_query($mysqli, $queryNewInvoice, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      if ($resNewInvoice) {
        while ($row = mysqli_fetch_row($resNewInvoice)) {
          $responseNewInvoice[]=array( 
            'id'                                      => $row[0],
            'userId'                                  => $row[1],
            'invoiceTypeId'                           => $row[2],
            'parentInvoice'                           => $row[3]
          );
        }
      }
    }
    $invoiceCreated                                   = $responseNewInvoice[0];
    $invoiceId                                        = $invoiceCreated['id'];
    send_remote_curl("Invoice for Booking with UUID $uuidInvoice was created with id $invoiceId .",(basename($_SERVER['PHP_SELF'], '.php')));
    $resNewInvoice->free_result();
    /*------------------------------------------------------------------------------------------------------------*/
    /*                                      Create Invoice Items                                                  */  
    /*------------------------------------------------------------------------------------------------------------*/
    send_remote_curl("Creating the entries in the invoice_item table for invoice with id $invoiceId .",(basename($_SERVER['PHP_SELF'], '.php')));
    $newInvoiceObject                                   =   $responseNewInvoice[0];
    $newInvoiceId                                       =   $newInvoiceObject['id'];
    $selectedSegments                                   =   explode(',',$selectedSegment);
    $start                                              =   strtotime($selectedSegments[0]);
    $startTime                                          =   date("Y-m-d H:i:s",$start);
    $end                                                =   strtotime($selectedSegments[0]) + 60*60;
    $endTime                                            =   date("Y-m-d H:i:s",$end);
    /* Iterating over the for loop to create the individual 1 hour segments */
    for ($x = 1; $x <= $selectedBookingDuration; $x++) {
      $queryCreateInvoiceItem                            =   "INSERT INTO invoice_item (invoice_id, location_id, number_of_people, number_of_hours, with_instructor, start_time, end_time, userId) VALUES ('$newInvoiceId', '$selectedLocationId' , '$selectedOccupancy', '$selectedBookingDuration',$shootingInstructor, '$startTime' , '$endTime', 1);";
      $queryNewInvoiceItem                              =   "SELECT *  FROM invoice_item WHERE invoice_id='$newInvoiceId' ORDER BY id DESC LIMIT 1;";
      $resCreateInvoiceItem                             =   mysqli_query($mysqli, $queryCreateInvoiceItem, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
      if($queryCreateInvoiceItem){
        $resNewInvoiceItem = mysqli_query($mysqli, $queryNewInvoiceItem, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
        if ($resNewInvoiceItem) {
          while ($row = mysqli_fetch_row($resNewInvoiceItem)) {
            $responseNewInvoiceItem[]=array( 
              'id'                                      => $row[0],
              'invoiceId'                               => $row[1],
              'locationId'                              => $row[2],
              'numberOfPeople'                          => $row[3],
              'numberOfHours'                           => $row[4],
              'withInstructor'                          => $row[5],
              'startTime'                               => $row[6],
              'endTime'                                 => $row[7]
          );
          }
          send_remote_curl("Entry for the Segment from $startTime to $endTime for Invoice id $invoiceId  was created succesfully.",(basename($_SERVER['PHP_SELF'], '.php')));
          $resNewInvoiceItem->free_result();
        }
      }
      $startTime                                        =   date("Y-m-d H:i:s",$start + 60*60*intval($x) );
      $endTime                                          =   date("Y-m-d H:i:s",$end+ 60*60*intval($x) );
    }
    $responseMessage                                    =   $resultMessage[$GOOD_REQUEST];
    mysqli_close($mysqli);
  }
}
catch(Exception $e){
  /*------------------------------------------------------------------------------------------------------------*/
  /*                                  Catch Loop for 500-Internal Server Error                                  */
  /*------------------------------------------------------------------------------------------------------------*/
  $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
  $eMessage                                             =   $e->getMessage();
  $eLine                                                =   $e->getLine();
  $eFile                                                =   $e->getFile();
  $responseMessage                                      =   $resultMessage[$INTERNAL_SERVER_ERROR];
  $responseMessage                                      =   "$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ;
  send_remote_curl('Verification of User by Phone Number had an Exception.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ,(basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
}

$responseArray = array(  
  "message"                                             =>  strval($responseMessage),
  "startSegmentIsInThePast"                             =>  boolval($startSegmentIsInThePast),
  "invoice"                                             =>  $responseNewInvoice,
  "invoiceItems"                                        =>  $responseNewInvoiceItem
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Creation of the Booking for the Shooting Range returned $requestResponse.",(basename($_SERVER['PHP_SELF'], '.php')));
?>