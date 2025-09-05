<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'local';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
$mysqli->set_charset("utf8mb4");

if (isset($_GET['selectedLocationId']) && $_GET['selectedLocationId']!="") {
  $selectedLocationId = $_GET['selectedLocationId'];
} else {
  $selectedLocationId = "";
}
if (isset($_GET['selectedSegment']) && $_GET['selectedSegment']!="") {
  $selectedSegment = $_GET['selectedSegment'];
} else {
  $selectedSegment = "";
}
if (isset($_GET['selectedBookingDuration']) && $_GET['selectedBookingDuration']!="") {
  $selectedBookingDuration = $_GET['selectedBookingDuration'];
} else {
  $selectedBookingDuration = "";
}
if (isset($_GET['selectedOccupancy']) && $_GET['selectedOccupancy']!="") {
  $selectedOccupancy = $_GET['selectedOccupancy'];
} else {
  $selectedOccupancy = "";
}
if (isset($_GET['shootingInstructor']) && $_GET['shootingInstructor']!="") {
  $shootingInstructor = $_GET['shootingInstructor'];
} else {
  $shootingInstructor = "";
}
if (isset($_GET['userId']) && $_GET['userId']!="") {
  $userId = $_GET['userId'];
} else {
  $userId = "";
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

$newUserId = $userId;
$queryCreateInvoice = "INSERT INTO invoice (user_id, invoice_type_id, is_deleted, comment, uuidInvoice, userId) VALUES ('$newUserId', 1 , false, '$comment;', '$uuidInvoice',1);";
$queryNewInvoice = "SELECT *  FROM invoice WHERE user_id='$newUserId' ORDER BY id DESC LIMIT 1;";
$resCreateInvoice = mysqli_query($mysqli, $queryCreateInvoice, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if($resCreateInvoice){
  $resNewInvoice = mysqli_query($mysqli, $queryNewInvoice, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($resNewInvoice) {
    $index = 1;
    while ($row = mysqli_fetch_row($resNewInvoice)) {
      $responseNewInvoice[]=array( 
                              'id'                              => $row[0],
                              'userId'                          => $row[1],
                              'invoiceTypeId'                   => $row[2],
                              'parentInvoice'                   => $row[3]
                          );
      $index++;
    }
    $resNewInvoice->free_result();
  }
}
$newInvoiceObject = $responseNewInvoice[0];
$newInvoiceId = $newInvoiceObject['id'];
$selectedSegments = explode(',',$selectedSegment);
$start = strtotime($selectedSegments[0]);
$startTime = date("Y-m-d H:i:s",$start);
$end = strtotime($selectedSegments[0]) + 60*60;
$endTime = date("Y-m-d H:i:s",$end);
echo "The selected Segment";
echo $selectedSegments[0];
for ($x = 1; $x <= $selectedBookingDuration; $x++) {
  $queryCreateInvoiceItem = "INSERT INTO invoice_item (invoice_id, location_id, number_of_people, number_of_hours, with_instructor, start_time, end_time, userId) VALUES ('$newInvoiceId', '$selectedLocationId' , '$selectedOccupancy', '$selectedBookingDuration',$shootingInstructor, '$startTime' , '$endTime', 1);";
  $queryNewInvoiceItem = "SELECT *  FROM invoice_item WHERE invoice_id='$newInvoiceId' ORDER BY id DESC LIMIT 1;";
  $resCreateInvoiceItem = mysqli_query($mysqli, $queryCreateInvoiceItem, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if($queryCreateInvoiceItem){
    $resNewInvoiceItem = mysqli_query($mysqli, $queryNewInvoiceItem, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
    if ($resNewInvoiceItem) {
      $index = 1;
      while ($row = mysqli_fetch_row($resNewInvoiceItem)) {
        $responseNewInvoiceItem[]=array( 
                              'id'                              => $row[0],
                              'invoiceId'                       => $row[1],
                              'locationId'                      => $row[2],
                              'numberOfPeople'                  => $row[3],
                              'numberOfHours'                   => $row[4],
                              'withInstructor'                  => $row[5],
                              'startTime'                       => $row[6],
                              'endTime'                         => $row[7]
                          );
        $index++;
      }
      $resNewInvoiceItem->free_result();
    }
  }
  $startTime = date("Y-m-d H:i:s",$start + 60*60*intval($x) );
  $endTime = date("Y-m-d H:i:s",$end+ 60*60*intval($x) );
}
$totalResponse = array(  
  "invoice"             => $newInvoiceObject,
  "invoiceItems"        => $responseNewInvoiceItem
);
mysqli_close($mysqli);
http_response_code(200);
echo json_encode($totalResponse);
?>