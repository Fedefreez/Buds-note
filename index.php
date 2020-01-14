<?php session_start();
  header("Expires: 0");
  header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  if (isset($_SESSION["logged_in"])) {
  	if ($_SESSION["logged_in"] === "1" && $_SESSION["username"] != null) {
  		echo "<script>window.location.href='home/';</script>";
  	}
  }
?>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Welcome to Bud's note</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<style>

			body{
				font-family: "Poppins", sans-serif;
			  height: 100vh;
			  background-color: #a3d6f0;
			}

			.logo {
				position: relative;
				left: 35%;
				width: 30%;
			}
			.button{
				position: relative;
				width: 70%;
				background-color: #56baed;
			}
			.credential_rec{
				bottom : 0;
			}
			.with-padding{
				margin-top: 3%;
				margin-bottom: 3%;
			}

			.wrapper {
			  display: flex;
			  align-items: center;
			  flex-direction: column;
			  justify-content: center;
			  width: 100%;
			  min-height: 100%;
			  padding: 20px;
			}

			#formContent {
			  -webkit-border-radius: 10px 10px 10px 10px;
			  border-radius: 10px 10px 10px 10px;
			  background: #fff;
			  padding: 30px;
			  width: 90%;
			  max-width: 450px;
			  position: relative;
			  padding: 0px;
			  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
			  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
			  text-align: center;
			}

			#formFooter {
			  background-color: #f6f6f6;
			  border-top: 1px solid #dce8f1;
			  padding: 25px;
			  text-align: center;
			  -webkit-border-radius: 0 0 10px 10px;
			  border-radius: 0 0 10px 10px;
			}



			/* TABS */

			h2.inactive {
			  color: #cccccc;
			}

			h2.active {
			  color: #0d0d0d;
			  border-bottom: 2px solid #5fbae9;
			}



			/* FORM TYPOGRAPHY*/

			input[type=button], input[type=submit], input[type=reset]  {
			  background-color: #56baed;
			  border: none;
			  color: white;
			  padding: 15px 80px;
			  text-align: center;
			  text-decoration: none;
			  display: inline-block;
			  text-transform: uppercase;
			  font-size: 13px;
			  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
			  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
			  -webkit-border-radius: 5px 5px 5px 5px;
			  border-radius: 5px 5px 5px 5px;
			  margin: 5px 20px 40px 20px;
			  -webkit-transition: all 0.3s ease-in-out;
			  -moz-transition: all 0.3s ease-in-out;
			  -ms-transition: all 0.3s ease-in-out;
			  -o-transition: all 0.3s ease-in-out;
			  transition: all 0.3s ease-in-out;
			}

			input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
			  background-color: #39ace7;
			}

			input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
			  -moz-transform: scale(0.95);
			  -webkit-transform: scale(0.95);
			  -o-transform: scale(0.95);
			  -ms-transform: scale(0.95);
			  transform: scale(0.95);
			}

			input[type=text] {
			  background-color: #f6f6f6;
			  border: none;
			  color: #0d0d0d;
			  padding: 15px 32px;
			  text-align: center;
			  text-decoration: none;
			  display: inline-block;
			  font-size: 16px;
			  margin: 5px;
			  width: 85%;
			  border: 2px solid #f6f6f6;
			  -webkit-transition: all 0.5s ease-in-out;
			  -moz-transition: all 0.5s ease-in-out;
			  -ms-transition: all 0.5s ease-in-out;
			  -o-transition: all 0.5s ease-in-out;
			  transition: all 0.5s ease-in-out;
			  -webkit-border-radius: 5px 5px 5px 5px;
			  border-radius: 5px 5px 5px 5px;
			}

			input[type=text]:focus {
			  background-color: #fff;
			  border-bottom: 2px solid #5fbae9;
			}

			input[type=text]:placeholder {
			  color: #cccccc;
			}



			/* ANIMATIONS */

			/* Simple CSS3 Fade-in-down Animation */
			.fadeInDown {
			  -webkit-animation-name: fadeInDown;
			  animation-name: fadeInDown;
			  -webkit-animation-duration: 1s;
			  animation-duration: 1s;
			  -webkit-animation-fill-mode: both;
			  animation-fill-mode: both;
			}

			@-webkit-keyframes fadeInDown {
			  0% {
			    opacity: 0;
			    -webkit-transform: translate3d(0, -100%, 0);
			    transform: translate3d(0, -100%, 0);
			  }
			  100% {
			    opacity: 1;
			    -webkit-transform: none;
			    transform: none;
			  }
			}

			@keyframes fadeInDown {
			  0% {
			    opacity: 0;
			    -webkit-transform: translate3d(0, -100%, 0);
			    transform: translate3d(0, -100%, 0);
			  }
			  100% {
			    opacity: 1;
			    -webkit-transform: none;
			    transform: none;
			  }
			}

			/* Simple CSS3 Fade-in Animation */
			@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
			@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
			@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

			.fadeIn {
			  opacity:0;
			  -webkit-animation:fadeIn ease-in 1;
			  -moz-animation:fadeIn ease-in 1;
			  animation:fadeIn ease-in 1;

			  -webkit-animation-fill-mode:forwards;
			  -moz-animation-fill-mode:forwards;
			  animation-fill-mode:forwards;

			  -webkit-animation-duration:1s;
			  -moz-animation-duration:1s;
			  animation-duration:1s;
			}

			.fadeIn.first {
			  -webkit-animation-delay: 0.4s;
			  -moz-animation-delay: 0.4s;
			  animation-delay: 0.4s;
			}

			.fadeIn.second {
			  -webkit-animation-delay: 0.6s;
			  -moz-animation-delay: 0.6s;
			  animation-delay: 0.6s;
			}

			.fadeIn.third {
			  -webkit-animation-delay: 0.8s;
			  -moz-animation-delay: 0.8s;
			  animation-delay: 0.8s;
			}

			.fadeIn.fourth {
			  -webkit-animation-delay: 1s;
			  -moz-animation-delay: 1s;
			  animation-delay: 1s;
			}

			/* Simple CSS3 Fade-in Animation */
			.underlineHover:after {
			  display: block;
			  left: 0;
			  bottom: -10px;
			  width: 0;
			  height: 2px;
			  background-color: #56baed;
			  content: "";
			  transition: width 0.2s;
			}

			.underlineHover:hover {
			  color: #0d0d0d;
			}

			.underlineHover:hover:after{
			  width: 100%;
			}

		</style>
	</head>
	<body>
		<div class="container-fluid">
			<div class="wrapper fadeInDown">
				<div class="row">
					<div class="col-sm-12">
						<img src="bootstrap/Logotest.png" alt="Logo di Bud's note" class="logo"></img>
					</div>
				</div>
			</br>
				<div id="formContent">
				</br>
					<div class="row">
						<div class="col-sm-12">
							<p class="text-center">Welcome to Bud's Note!</p>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12 text-center with-padding">
							<button onclick="window.location.href='login/'" type="button" class="btn btn-info btn-lg button">Login</button>
						</div>
					</div>
					<div class="row">
					<div class="col-sm-12 text-center">
							<button onclick="window.location.href='register'" type="button" class="btn btn-info btn-lg button">Register</button>
						</div>
					</div>
				</br>
				</div>
			</div>
		<script src="jquery/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
	</body>
</html>
