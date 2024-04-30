<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

if (isset($_GET['sendGridKey']) && $_GET['sendGridKey']!="") {
  $sendGridKey = $_GET['sendGridKey'];
} else {
  $sendGridKey = false;
}
if (isset($_GET['emailTo']) && $_GET['emailTo']!="") {
  $emailTo = $_GET['emailTo'];
} else {
  $emailTo = "";
}
if (isset($_GET['emailFrom']) && $_GET['emailFrom']!="") {
  $emailFrom = $_GET['emailFrom'];
} else {
  $emailFrom = "";
}
if (isset($_GET['templateId']) && $_GET['templateId']!="") {
  $templateId = $_GET['templateId'];
} else {
  $templateId = "";
}
if (isset($_GET['invoiceId']) && $_GET['invoiceId']!="") {
  $invoiceId = $_GET['invoiceId'];
} else {
  $invoiceId = "";
}
if (isset($_GET['segmentBooked']) && $_GET['segmentBooked']!="") {
  $segmentBooked = $_GET['segmentBooked'];
} else {
  $segmentBooked = "";
}
if (isset($_GET['nameOnReservation']) && $_GET['nameOnReservation']!="") {
  $nameOnReservation = $_GET['nameOnReservation'];
} else {
  $nameOnReservation = "";
}
if (isset($_GET['shootingRangeName']) && $_GET['shootingRangeName']!="") {
  $shootingRangeName = $_GET['shootingRangeName'];
} else {
  $shootingRangeName = "";
}
if (isset($_GET['phoneNumber']) && $_GET['phoneNumber']!="") {
  $phoneNumber = $_GET['phoneNumber'];
} else {
  $phoneNumber = "";
}
if (isset($_GET['uuidInvoice']) && $_GET['uuidInvoice']!="") {
  $uuidInvoice = $_GET['uuidInvoice'];
} else {
  $uuidInvoice = "";
}
if (isset($_GET['comment']) && $_GET['comment']!="") {
  $comment = $_GET['comment'];
} else {
  $comment = "";
}
/*------------------------------------------------------------------------------*/
/*                   CURL REQUEST TO SEND EMAIL                                 */
/*------------------------------------------------------------------------------*/
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
$response = curl_exec($curl);
$err = curl_error($curl);
echo $test;
echo $response;
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
http_response_code(200);
?>