<?php
  require '../php/ips.php';
  $ip = $_SERVER['REMOTE_ADDR'];
  loginCheck($ip);
 ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bud's note upload</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <script src="../jquery/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="../bootstrap/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="writeNote.css" />
  <script src="../main/errorHandler.js"></script>
  <script src="writeNote.js"></script>
</head>
<body>
  <div class="localWarn alert alert-danger alert-dismissible fade show">
    <strong>Warning! </strong><span id="localWarn"></span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="pageContainer">
    <div class="wrapper fadeInDown">
      <div id="formContent">
      </br>
        <h4>Upload your note!</h4>
        <br/>
        <input type="text" id="Title" class="fadeIn first" placeholder="Title:"/>
        <br/>
      <div class="container fadeIn second">
        <p>Year:</p>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-info">
            <input type="radio" name="options" id="year_1" autocomplete="off"> 1
          </label>
          <label class="btn btn-info">
            <input type="radio" name="options" id="year_2" autocomplete="off"> 2
          </label>
          <label class="btn btn-info">
            <input type="radio" name="options" id="year_3" autocomplete="off"> 3
          </label>
          <label class="btn btn-info">
            <input type="radio" name="options" id="year_4" autocomplete="off"> 4
          </label>
          <label class="btn btn-info">
            <input type="radio" name="options" id="year_5" autocomplete="off"> 5
          </label>
        </div>
      </br>
      </div>
      <div class="dropdown fadeIn third">
        <br/>
          <button type="button" class="btn btn-primary dropdown-toggle" id="Subject" data-toggle="dropdown">
            Subject
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <?php
            require_once "../php/core.php";
            require_once '../php/funs.php';
            $response = subj(connectDb(), NULL, NULL);
            foreach ($response[1] as $subj) {
              echo "<a class='dropdown-item' onclick='selectSubj(this)'>" . $subj . "</a>";
            }
          ?>
        </div>
      </div>
      <div class="dropdown fadeIn third">
        <br/>
        <button type="button" class="btn btn-primary dropdown-toggle" id="Dept" data-toggle="dropdown">
          Department
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <?php
            $response = dept(connectDb(), NULL, NULL);
            foreach ($response[1] as $dept) {
              echo "<a class='dropdown-item' onclick='selectDept(this)'>" . $dept . "</a>";
            }
          ?>
        </div>
      </div>
      <br/>
      <p/>
        <textarea class="form-control fadeIn third" rows="25" id="Content" placeholder="Write here your note..."></textarea>
        <div id="file-upload" class="container">
          <div class="custom-file fadeIn fourth">
            <input type="file" class="custom-file-input" id="uploadImage">
            <label class="custom-file-label" for="uploadImage">Upload here your images...</label>
          </div>
        </div>
        <input onclick="submitNote();" type="submit" class="fadeIn fourth" value="Upload">
        <div id="animation" style="display: none;">
          <div class='progress'>
            <div id='imageUploadProgress' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
