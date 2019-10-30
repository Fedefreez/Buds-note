<?php session_start();
  header("Expires: 0");
  header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Buds_note</title>
    <script src="../../jquery/jquery.min.js"></script>
    <script src="2.js"></script>
    <link rel="stylesheet" type="text/css" href="../../main/stylesheets/positions.css" />
    <link rel="stylesheet/less" type="text/css" href="../../main/stylesheets/main.less" />
	   <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
  </head>
  <body id="Body">
    <div id="warn" class="warn" style="display:none">
    </div>
    <div class="navbar" id="navbar">
      <a href="../.." class="navbar-left">HOME</a>
      <a href="login/" class="navbar-right log">LOGIN</a>
      <a href="register/" class="navbar-right log">REGISTER</a>
      <a id="logout" onclick="logout()"  class="navbar-right logout">LOGOUT</a>
    </div>
      <span id="greet">Liceo linguistico</span>
      <div><br/><br/><br/><br/></div>
    <div id="risultati" class="risultati">
    </div>
  </body>
  <script>
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && localStorage.getItem("mozError") == undefined){
      error("FIREFOX");
    }
  </script>
</html>
<?php
  if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['logged_in'] == '1') {
      echo "<script>$('.log').attr('hidden', true);</script>";
      /*require_once "php/funs.php";
      if(getAcclvl($_SESSION["username"]) == 1) {
        echo "<script>$('.a').show();</script>";
      } per ora possiamo tenere tutti i tipi di richerche, che fastidio danno?*/
    } else {
      session_unset();  //quando si esegue il logout logged_in é settato e != da 1 quindi sappiamo che é stato eseguito il logout
      session_destroy();
      echo "<script>$('.logout').attr('hidden', true);</script>";
    }
  } else {
    echo "<script>$('.logout').attr('hidden', true);</script>";
    //se chiudiamo la sessione anche quando uno non é loggato, non riusciamo a settare logged_in a 1
  }
 ?>
