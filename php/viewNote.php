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
    <meta charset="utf-8"/>
    <title>Buds-note</title>
    <script src="../jquery/jquery.min.js"></script>
    <script type="text/javascript" src="../main/viewNote.js"></script>
    <link rel="stylesheet/less"  type="text/css" href="../main/stylesheets/main.less"></link>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
  </head>
  <body>
    <p style="position:sticky;top:0px;width:100%">
      <div class="navbar" id="navbar">
        <a href="../" class="navbar-left">HOME</a>
        <a href="../login/" class="navbar-right log">LOGIN</a>
        <a href="../register/" class="navbar-right log">REGISTER</a>
        <a id="logout" onclick="logout()"  class="navbar-right logout">LOGOUT</a>
      </div>
      <span id="greet">
        <?php
          if (isset($_SESSION["logged_in"])) {
            if ($_SESSION["logged_in"] === "1") {
              echo "Benvenuto, " . $_SESSION["username"];
            }
          }
        ?>
      </span>
    </p>
    <div id="everythingAboutNote">
      <div class="noteInfoDisplay" hidden>
        <?php
          require_once 'core.php';
          require_once "funs.php";
          function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
          }
          if ($_SERVER["REQUEST_METHOD"] == "GET") {
            if (empty($_GET["noteId"])) {
              die("<h1>URL non formato correttamente! (Quindi, ovviamente, nota non trovata D:)");
            } else {
              $noteId = test_input($_GET["noteId"]);
              error_log('Visualizzazione: ' . $noteId);
              $note = searchNote(connectDb(), NULL, $noteId, NULL, NULL, NULL, ["true", "true", "true", "true", "true"], NULL, NULL, NULL, NULL, NULL, NULL);
              $title = $note[0]["title"];
            }
            if (empty($note[0]['title'])) {
              echo "<script>$('.noteInfoDisplay').hide();</script>";
              $display = false;
            } else {
              $display = true;
            }
          }
          ?>
        <div class="noteHeaderTtl">
          <?php
            if ($display) {
              echo "<script>localStorage.setItem('noteId', '" . $noteId . "');</script>";
              echo "<span class=spawnTtl>" . $title . "</span><br/>";
            }
          ?></div>
        <div class="noteInfo">
          <br/>
          <div class="noteHeaderUser">Utente:
            <?php
              if ($display) {
                echo $note[0]["user"];
              }
            ?></div>
          <div class="noteHeaderDept">Indirizzo:
            <?php
              if ($display) {
                echo $note[0]["dept"];
              }
            ?></div>
          <div class="noteHeaderSubj">Materia:
            <?php
              if ($display) {
                echo $note[0]["subj"];
              }
            ?></div>
          <div class="noteHeaderYear">Anno:
            <?php
              if ($display) {
                echo $note[0]["year"];
              }
            ?></div>
          <div class="noteHeaderDate">Data:
            <?php
              if ($display) {
                echo $note[0]["date"];
              }
            ?></div><br/>
          <div class="noteRating">
            Likes:
            <?php
            if (checkNote(connectDb(), $noteId)) {
                if (($likes = getLikes($noteId)) === false || ($dislikes = getDislikes($noteId)) === false) {
                  echo "<script>error('NOTEREF'); $('.noteRating').html('Errore nel fetching dei likes e dislikes D:');</script>";
                  $displayRate = false;
                } else {
                  echo "<span class='likes'>" . $likes . "</span>";
                  $displayRate = true;
                }
              } else {
                $displayRate = false;
              }
              ?>
            Dislikes: <?php
              if ($displayRate) {
                echo "<span class='dislikes'>" . $dislikes . "</span>";
              }
            ?>
          </div>
          <button id="mipiace" onclick="rateNote(true)" class="likesBtn">Mi piace</button>
          <button id="nonmipiace" onclick="rateNote(false)" class="likesBtn">Non mi piace</button>
        </div>
        <div class="noteContent">
          <div class="noteText">
            <?php
              if ($display) {
                foreach (getNote(connectDb(), $noteId) as $row) {
                  $row = str_replace("\n", "<br />", $row);
                  $row = str_replace("'", "&#39;", $row);
                  echo $row;
                }
              }
             ?>
           </div>
           <div id="pics">
             <?php
               foreach (getPicsPathsAndIds($noteId) as $pic) {
                 echo '<div class="removeImageContainer" id="' . $pic["id"] . '">';
                 echo '  <img style="width: 100%;" src="' . $pic["dir"] . '">';
                 echo '  <button id=' . $pic["id"] . '" class="btn removeImage" onclick="removeImage(' . $pic["id"] . ')">Rimuovi immagine</button>';
                 echo '</div>';
               }
              ?>
           </div>
        </div>
      </div>
      <?php
        if (!$display) {
          echo "<h1>Nota non trovata ) :</h1><script>localStorage.setItem('noteNotFound', true);</script>";
        } else {
          echo "<script>localStorage.setItem('noteNotFound', false);</script>";
        }
       ?>
      <div class="comments" style="display: none;">
        <span>COMMENTI</span><br/>
        <div class="localSpawn"></div>
        <div class="otherComments">
          <?php
            if ($display) {
              require_once 'core.php';
              require_once 'funs.php';
              $comments = searchRevw(connectDb(), NULL, NULL, $noteId, NULL, NULL, NULL, NULL, NULL);
              foreach ($comments as $comment) {
                $comment["review"] = str_replace("&lt;br&gt;", "<br>", $comment["review"]);
                $comment = str_replace("'", "&#39;", $comment);
                echo "<span id=" . $comment["id"] . "><div commentId=" . $comment["id"] . " class=commentText><span class='revwText'>" . $comment['review'] . "</span><button class=delCommentBtn onclick=delComment(" . $comment["id"] . ");>Elimina commento</button></div><div class=commentInfo>" . $comment["user"] . " - " . $comment["date"] . "</div><br/></span>";
              }
            }
          ?>
        </div>
         <br/>
        <textarea rows="1" cols="100" wrap="hard" placeholder="Inserisci un commento..." id="commentText" style="display: none;" class="postCommentElms commentTxt"></textarea>
        <button onclick="postComment()" style="display: none;" class="postCommentElms commentBtn">Pubblica</button>
        <br/><br/><br/><br/>
      </div>
    </div>
    <div id="warn" class="warn" style="display:none">
    </div>
    <div class="navbar adminTools" style="/*position:absolute;bottom:5px;padding:10px 15px 10px 15px;*/display:none">
      <a onclick="man('on')" class="navbar-left admin" style="display: none;">Avvia manutenzione</a>
      <a onclick="man('off')" class="navbar-left admin" style="display: none;">Termina manutenzione</a>
      <a id="modifyNoteBtn" onclick="showNoteEditor()" class="navbar-right user" style="display: none;">Modifica nota</a>
      <a id="modifyNoteConfirm" onclick="modifyNote()"class="navbar-right" style="display: none;">Salva</a>
      <a onclick="abortNoteDeletion()" id="abortNoteDeletion" class="navbar-right" style="display: none;">Annulla</a>
      <a onclick="deleteNote()" class="navbar-right admin user" id="delNoteBtn" style="display: none;">Rimuovi nota</a>
      <a onclick="delCommentShow()" class="navbar-right admin" id="delCommentBtn" style="display: none;">Rimuovi commento</a>
      <input type="file" class="navbar-right uploadImage" id="addPic" style="display: none;"/>
      <label for="addPic" class="user padding navbar-right" style="display: none;">Aggiungi immagine</label>
      <a onclick="showImageRemoval()" class="navbar-right admin user" id="showImageRemoval" style="display: none;">Rimuovi immgine</a>
    </div>
    <div class="delNote" style="display: none;">
    </div>
  </body>
</html>
<?php
  if(gettype($m = getManStatus()) === "string") {
    echo "<script>error($m);</script>";
  } elseif ($m == true) {
    echo "<script>error('man');</script>";
  }
  $noteExists = false;
  if (checkNote(connectDb(), $noteId)) {
    echo "<script> $('.comments').show();</script>";
    $noteExists = true;
  }
  if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['logged_in'] == '1') {
      echo "<script>$('.log').attr('hidden', true); $('#scriviNotaBtn').show();</script>";
      if(getAcclvl($_SESSION["username"]) == 1) {
        echo "<script>$('.admin').show();</script>";
        if ($noteExists) {
          echo "<script>$('.adminTools').show();</script>";
        }
      }
      if (checkNote(connectDb(), $noteId)) {
        echo "<script> $('.postCommentElms').show();</script>";
        if (isNoteOwner(connectDb(), $noteId, $_SESSION["username"])) {
          echo "<script>$('#modifyNoteBtn').show(); toolbarUser();</script>";
        }
      }
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
