<?php
  function err_handler($code, $msg) : bool {
    switch ($code) {
      case 23000:
      echo "Username giá esistente!";
      return true;
      break;
      default:
      error_log($msg);
      return false;
      break;
    }
  }
 ?>
