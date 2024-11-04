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
}

// send_remote_syslog("Test");
# send_remote_syslog("Any log message");
# send_remote_syslog("Something just happened", "other-component");
# send_remote_syslog("Something just happened", "a-background-job-name", "whatever-app-name");
?>