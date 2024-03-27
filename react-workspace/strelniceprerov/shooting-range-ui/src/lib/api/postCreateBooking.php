<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header('Content-Type: application/json; charset=utf-8');

$databaseHost = 'localhost';
$databaseUsername = 'www-strelnic';
$databasePassword = 'bQASvDoM9K4g';
$databaseName = 'www-strelnic';
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

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
if (isset($_GET['shootingPermit']) && $_GET['shootingPermit']!="") {
  $shootingPermit = $_GET['shootingPermit'];
} else {
  $shootingPermit = "";
}
if (isset($_GET['shootingPermitNumber']) && $_GET['shootingPermitNumber']!="") {
  $shootingPermitNumber = $_GET['shootingPermitNumber'];
} else {
  $shootingPermitNumber = "";
}
if (isset($_GET['shootingInstructor']) && $_GET['shootingInstructor']!="") {
  $shootingInstructor = $_GET['shootingInstructor'];
} else {
  $shootingInstructor = "";
}
if (isset($_GET['name']) && $_GET['name']!="") {
  $name = $_GET['name'];
} else {
  $name = "";
}
if (isset($_GET['email']) && $_GET['email']!="") {
  $email = $_GET['email'];
} else {
  $email = "";
}
if (isset($_GET['phone']) && $_GET['phone']!="") {
  $phone = $_GET['phone'];
} else {
  $phone = "";
}
$queryCreateUser = "INSERT INTO user_list (name, user_type_id, email, phoneNumber, isDeleted, userId) VALUES ('$name', 1 , '$email', '$phone',false , 1);";
$queryNewUser = "SELECT *  FROM user_list WHERE email='${email}' ORDER BY id DESC LIMIT 1;";
$resCreateUser = mysqli_query($mysqli, $queryCreateUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
if($resCreateUser){
  $res = mysqli_query($mysqli, $queryNewUser, MYSQLI_USE_RESULT) or die( mysqli_error($mysqli));
  if ($res) {
    $index = 1;
    while ($row = mysqli_fetch_row($res)) {
      $responseUserArray[]=array( 
                              'id'                              => $row[0],
                              'userTypeId'                      => $row[1],
                              'name'                            => $row[2],
                              'email'                           => $row[3],
                              'phoneNumber'                     => $row[4]
                            );
      $index++;
    }
    $res->free_result();
  }
}
$newUserObject = $responseUserArray[0];
$newUserId = $newUserObject['id'];
$queryCreateInvoice = "INSERT INTO invoice (user_id, invoice_type_id, is_deleted, userId) VALUES ('$newUserId', 1 , false, 1);";
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
$start = strtotime($selectedSegment);
$startTime = date("Y-m-d h:i:s",$start);
$end = strtotime($selectedSegment) + 60*60;
$endTime = date("Y-m-d h:i:s",$end);

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

$totalResponse = array(
  "user"                => $newUserObject,
  "invoice"             => $newInvoiceObject,
  "invoiceItems"        => $responseNewInvoiceItem
);
mysqli_close($mysqli);
http_response_code(200);
echo json_encode($totalResponse);
//echo $queryCreateInvoiceItem;
?>