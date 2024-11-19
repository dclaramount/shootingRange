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
$INTERNAL_SERVER_ERROR                                =   500;
//Initialization of the Variables for this End-Point
$requestResponse                                      =   $GOOD_REQUEST;
$responseMessage                                      =   "";
$response                                             =   "";
//Retrieving the Messages for the different HTTP-Codes of this endpoint
$query                                                =   "SELECT value FROM `global_variables` WHERE name='200_postSendEmailOwner';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$GOOD_REQUEST]                       =   $row[0];
};
$query                                                =   "SELECT value FROM `global_variables` WHERE name='500_postSendEmailOwner';";
$res                                                  =   mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) {
  $resultMessage[$INTERNAL_SERVER_ERROR]              =   $row[0];
};
/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try{
  if (isset($_GET['sendGridKey']) && $_GET['sendGridKey']!="") {
    $sendGridKey                                      =   $_GET['sendGridKey'];
  } else {
    $sendGridKey                                      =   false;
  }
  if (isset($_GET['emailTo']) && $_GET['emailTo']!="") {
    $emailTo                                          =   $_GET['emailTo'];
  } else {
    $emailTo                                          =   "";
  }
  $emailTo = "info@strelniceprerov.cz";
  if (isset($_GET['emailFrom']) && $_GET['emailFrom']!="") {
    $emailFrom                                        =   $_GET['emailFrom'];
  } else {
    $emailFrom                                        =   "";
  }
  if (isset($_GET['templateId']) && $_GET['templateId']!="") {
    $templateId                                       =   $_GET['templateId'];
  } else {
    $templateId                                       =   "";
  }
  $templateId="d-531b230f28aa4f7985de95370275fda7";
  if (isset($_GET['invoiceId']) && $_GET['invoiceId']!="") {
    $invoiceId                                        =   $_GET['invoiceId'];
  } else {
    $invoiceId                                        =   "";
  }
  if (isset($_GET['segmentBooked']) && $_GET['segmentBooked']!="") {
    $segmentBooked                                    =   $_GET['segmentBooked'];
  } else {
    $segmentBooked                                    =   "";
  }
  if (isset($_GET['nameOnReservation']) && $_GET['nameOnReservation']!="") {
    $nameOnReservation                                =   $_GET['nameOnReservation'];
  } else {
    $nameOnReservation                                =   "";
  }
  if (isset($_GET['shootingRangeName']) && $_GET['shootingRangeName']!="") {
    $shootingRangeName                                =   $_GET['shootingRangeName'];
  } else {
    $shootingRangeName                                =   "";
  }
  if (isset($_GET['phoneNumber']) && $_GET['phoneNumber']!="") {
    $phoneNumber                                      =   $_GET['phoneNumber'];
  } else {
    $phoneNumber                                      =   "";
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
  if (isset($_GET['withInstructor']) && $_GET['withInstructor']!="") {
    $withInstructor                                   =   $_GET['withInstructor'];
  } else {
    $withInstructor                                   =   "";
  }
  /*------------------------------------------------------------------------------*/
  /*                   CURL REQUEST TO SEND EMAIL                                 */
  /*------------------------------------------------------------------------------*/
  send_remote_curl("Sending email to owner for reservation with UUID $uuidInvoice.",(basename($_SERVER['PHP_SELF'], '.php')));
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.sendgrid.com/v3/mail/send",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "{\n  
                                \"personalizations\":   [\n         {\n      
                                    \"to\":             [\n         {\n           \"email\":      \"$emailTo\"\n        }\n       ],\n
                                    \"dynamic_template_data\":             {\n           
                                          \"invoiceId\":                  \"$uuidInvoice\",\n
                                          \"name\":                       \"$nameOnReservation\",\n
                                          \"shootingRange\":              \"$shootingRangeName\",\n
                                          \"segmentBooked\":              \"$segmentBooked\",\n
                                          \"nameOnTheReservation\":       \"$nameOnReservation\",\n
                                          \"withInstructor\":             \"$withInstructor\",\n
                                          \"phoneNumber\":                \"$phoneNumber\"\n           
                                      },\n            
                                    \"subject\":                                  \"New Contact\"\n                     }\n       ],\n  
                                    \"from\":                       {\n           \"email\":      \"$emailFrom\"\n      },\n
                                    \"template_id\":                \"$templateId\",\n    
                                    \"content\":        [\n         {\n           \"type\":       \"text/html\",\n      
                                                                                  \"value\":      \"Test Message\"\n    }\n  ]\n}",
    CURLOPT_HTTPHEADER => array(
      "authorization: Bearer $sendGridKey",
      "cache-control: no-cache",
      "content-type: application/json"
    ),
  ));
  curl_exec($curl);
  // Check HTTP status code
  if (!curl_errno($curl)) {
    switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
      case 200:  
        $requestResponse                                      =   $GOOD_REQUEST;
        $response                                             =   "Email Sent";
        send_remote_curl("Sending Email to Owner returned $http_code from SEND GRID.",(basename($_SERVER['PHP_SELF'], '.php')));
        break;
      case 202:  
          $requestResponse                                      =   $GOOD_REQUEST;
          $response                                             =   "Email Sent";
          send_remote_curl("Sending Email to Owner returned $http_code from SEND GRID.",(basename($_SERVER['PHP_SELF'], '.php')));
          break;
      default:
        $requestResponse                                      =   $INTERNAL_SERVER_ERROR;
        $response                                             =   "Unexpected HTTP Code $http_code from SEND GRID.";
        send_remote_curl("Unexpected HTTP Code $http_code from SEND GRID.",(basename($_SERVER['PHP_SELF'], '.php')));
    }
  }
  curl_close($curl);
  mysqli_close($mysqli);
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
  send_remote_curl('Sending Email to Owner failed.',(basename($_SERVER['PHP_SELF'], '.php')));
  send_remote_curl("$responseMessage...Internal Server Error $eMessage  in File: $eFile in Line: $eLine" ,(basename($_SERVER['PHP_SELF'], '.php')));
  mysqli_close($mysqli);
  curl_close($ch);
}
$responseArray = array(  
  "message"                                             =>  strval($responseMessage),
  "payload"                                             =>  $response
);
http_response_code($requestResponse);
echo json_encode($responseArray);
send_remote_curl("Sending Email to owner returned $requestResponse.",(basename($_SERVER['PHP_SELF'], '.php')));
?>