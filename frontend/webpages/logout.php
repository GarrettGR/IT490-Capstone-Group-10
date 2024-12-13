<?php
  // Start the session only if it's not already active
  if (session_status() === PHP_SESSION_NONE) {
    session_start();
  }

  // destorys session to log user out
  session_unset();
  session_destory();

  //redirect to the homepage or login page
  header("Location: login.php");
  exit();

?>