<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');
require_once('./apertraillogs.php');
/*------------------------------------------------------------------------------------------------------------*/
/*                                                    Starting Variables                                      */
/*------------------------------------------------------------------------------------------------------------*/
$databaseHost              = 'localhost';
$databaseUsername          = 'www-strelnic';
$databasePassword          = 'bQASvDoM9K4g';
$databaseName              = 'www-strelnic';

$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");

$GOOD_REQUEST              = 200;
$INTERNAL_SERVER_ERROR     = 500;

$requestResponse           = $GOOD_REQUEST;
$responseMessage           = "";
$response                 = "";

/*------------------------------------------------------------------------------------------------------------*/
/*                                     Load endpoint response messages                                       */
/*------------------------------------------------------------------------------------------------------------*/
$resultMessage = [];
$query = "SELECT value FROM `global_variables` WHERE name='200_postSendEmail';";
$res   = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) { $resultMessage[$GOOD_REQUEST] = $row[0]; }

$query = "SELECT value FROM `global_variables` WHERE name='500_postSendEmail';";
$res   = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die(mysqli_error($mysqli));
while ($row = mysqli_fetch_row($res)) { $resultMessage[$INTERNAL_SERVER_ERROR] = $row[0]; }

/*------------------------------------------------------------------------------------------------------------*/
/*                                            Destructuring Query Parameters                                  */
/*------------------------------------------------------------------------------------------------------------*/
try {
  // NOTE: In production, do NOT accept API keys from GET params.
  // Prefer: $smtp2goApiKey = getenv('SMTP2GO_API_KEY');
  $smtp2goApiKey        = isset($_GET['smtp2goKey']) && $_GET['smtp2goKey'] !== "" ? $_GET['smtp2goKey'] : false;
  $emailTo              = isset($_GET['emailTo']) ? trim($_GET['emailTo']) : "";
  $emailFrom            = isset($_GET['emailFrom']) ? trim($_GET['emailFrom']) : "";
  $templateId           = isset($_GET['templateId']) ? trim($_GET['templateId']) : ""; // SMTP2GO template_id
  $invoiceId            = isset($_GET['invoiceId']) ? trim($_GET['invoiceId']) : "";
  $segmentBooked        = isset($_GET['segmentBooked']) ? trim($_GET['segmentBooked']) : "";
  $nameOnReservation    = isset($_GET['nameOnReservation']) ? trim($_GET['nameOnReservation']) : "";
  $shootingRangeName    = isset($_GET['shootingRangeName']) ? trim($_GET['shootingRangeName']) : "";
  $phoneNumber          = isset($_GET['phoneNumber']) ? trim($_GET['phoneNumber']) : "";
  $uuidInvoice          = isset($_GET['uuidInvoice']) ? trim($_GET['uuidInvoice']) : "";
  $comment              = isset($_GET['comment']) ? trim($_GET['comment']) : "";

  if (!$smtp2goApiKey) {
    throw new Exception("Missing smtp2goKey");
  }
  if ($emailTo === "" || $emailFrom === "") {
    throw new Exception("Missing emailTo or emailFrom");
  }

  /*------------------------------------------------------------------------------*/
  /*                   CURL REQUEST TO SEND EMAIL                                 */
  /*------------------------------------------------------------------------------*/
  send_remote_curl("Sending email via SMTP2GO for reservation UUID $uuidInvoice.", basename($_SERVER['PHP_SELF'], '.php'));

  // Build template_data (these names must match your SMTP2GO template variables: {{ invoiceId }}, etc.)
  $templateData = [
    "invoiceId"            => $uuidInvoice,
    "name"                 => $nameOnReservation,
    "shootingRange"        => $shootingRangeName,
    "segmentBooked"        => $segmentBooked,
    "nameOnTheReservation" => $nameOnReservation,
    "phoneNumber"          => $phoneNumber,
    "comment"              => $comment
  ];

  $payload = [
    "sender"        => $emailFrom,
    "to"            => [$emailTo],
    "subject"       => "New Contact",
    // If you're using templates, you can omit html_body/text_body if your template includes the content.
    // Leaving them in is fine too (some people use them as fallback).
    "html_body"     => "<p>Test Message</p>",
    "text_body"     => "Test Message",
    "template_id"   => $templateId,
    "template_data" => $templateData
  ];

  $curl = curl_init();
  curl_setopt_array($curl, [
    CURLOPT_URL            => "https://api.smtp2go.com/v3/email/send",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => "",
    CURLOPT_MAXREDIRS      => 10,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST  => "POST",
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => [
      "accept: application/json",
      "content-type: application/json",
      "X-Smtp2go-Api-Key: " . $smtp2goApiKey
    ],
  ]);

  $raw = curl_exec($curl);
  $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
  $curl_err  = curl_error($curl);
  curl_close($curl);

  if ($raw === false) {
    throw new Exception("cURL failed: " . $curl_err);
  }

  $decoded = json_decode($raw, true);

  // SMTP2GO indicates success with HTTP 200 and data.succeeded/failed.  [oai_citation:3‡SMTP2GO-API-Docs](https://developers.smtp2go.com/docs/getting-started-with-templates)
  if ($http_code === 200 && isset($decoded["data"]["succeeded"]) && intval($decoded["data"]["succeeded"]) >= 1) {
    $requestResponse = $GOOD_REQUEST;
    $response        = "Email Sent";
    send_remote_curl("SMTP2GO send succeeded (HTTP $http_code).", basename($_SERVER['PHP_SELF'], '.php'));
  } else {
    $requestResponse = $INTERNAL_SERVER_ERROR;
    $response        = "Email failed (HTTP $http_code). Response: " . $raw;
    send_remote_curl("SMTP2GO send failed (HTTP $http_code). Raw: $raw", basename($_SERVER['PHP_SELF'], '.php'));
  }

  mysqli_close($mysqli);
}
// php -r 'parse_str("testMode=1&emailTo=diegoaclaramount@gmail.com&emailFrom=dac@revolgy.com&templateId=YOUR_TEMPLATE_ID&uuidInvoice=INV-12345&nameOnReservation=John Doe&shootingRangeName=My Range&segmentBooked=Segment A&phoneNumber=5551234567", $_GET); include "postSendEmail.php";'
catch(Exception $e){
  $requestResponse = $INTERNAL_SERVER_ERROR;

  $eMessage = $e->getMessage();
  $eLine    = $e->getLine();
  $eFile    = $e->getFile();

  $responseMessage = isset($resultMessage[$INTERNAL_SERVER_ERROR]) ? $resultMessage[$INTERNAL_SERVER_ERROR] : "Internal Server Error";
  $responseMessage = "$responseMessage...Internal Server Error $eMessage in File: $eFile in Line: $eLine";

  send_remote_curl('Sending Email failed.', basename($_SERVER['PHP_SELF'], '.php'));
  send_remote_curl($responseMessage, basename($_SERVER['PHP_SELF'], '.php'));

  if ($mysqli) { mysqli_close($mysqli); }
}

$responseArray = [
  "message" => strval($responseMessage),
  "payload" => $response
];

http_response_code($requestResponse);
echo json_encode($responseArray);

send_remote_curl("Sending Email returned $requestResponse.", basename($_SERVER['PHP_SELF'], '.php'));
?>