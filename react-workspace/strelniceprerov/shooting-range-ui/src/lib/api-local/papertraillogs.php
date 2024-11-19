<?php
# replace PAPERTRAIL_HOSTNAME and PAPERTRAIL_PORT
# see http://help.papertrailapp.com/ for additional PHP syslog options

function send_remote_syslog($message, $component = "web", $program = "strelnice prerov - prod") {
  $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
  foreach(explode("\n", $message) as $line) {
    $syslog_message = "<22>" . date('M d H:i:s ') . $program . ' ' . $component . ': ' . $line;
    socket_sendto($sock, $syslog_message, strlen($syslog_message), 0, 'logs3.papertrailapp.com', '42721');
  }
  socket_close($sock);
};

function send_remote_curl($message, $component = "PROD-WEB", $program = "strelnice-prerov-prod"){
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, "https://logs.collector.solarwinds.com/v1/logs");

  curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  curl_setopt($curl, CURLOPT_USERPWD, ':22tJ1bbWOcyvP9w7fYtZxp0x7nHG');
  curl_setopt($curl, CURLOPT_POST, true);
  $totalResponse = array(  
    "invoice"             => "test",
    "invoiceItems"        => "test2"
  );
  curl_setopt($curl, CURLOPT_POSTFIELDS, "<22>" . date('M d H:i:s ') . $program . ' ' . $component . ': ' . $message);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    if ($err) {
      // echo "cURL Error #:" . $err;
    } else {
      // echo $response;
    }
};

#send_remote_curl("Test using curl");
# send_remote_syslog("Any log message");
# send_remote_syslog("Something just happened", "other-component");
# send_remote_syslog("Something just happened", "a-background-job-name", "whatever-app-name");
?>