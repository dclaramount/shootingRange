<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

if (isset($_GET['uuidInvoice']) && $_GET['uuidInvoice']!="") {
  $uuidInvoice = $_GET['uuidInvoice'];
} else {
  $uuidInvoice = "";
}

$query = "SELECT id FROM  invoice WHERE uuidInvoice='$uuidInvoice';";
 $res = mysqli_query($mysqli, $query, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
 if ($res) {
   while ($row = mysqli_fetch_row($res)) {
     $invoiceId = $row[0]; 
   }
   $res->free_result();
}
$queryUpdateInvoiceItem = "UPDATE invoice_item SET isDeleted= true WHERE invoice_id=$invoiceId;";
$resUpdateInvoiceItem = mysqli_query($mysqli, $queryUpdateInvoiceItem, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));

$queryUpdateInvoice = "UPDATE invoice SET is_deleted= true WHERE id=$invoiceId;";
$resUpdateInvoice = mysqli_query($mysqli, $queryUpdateInvoice, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
echo $resUpdateInvoice;
mysqli_close($mysqli);
http_response_code(200);
?>