﻿<?php

/*
 * La funzione fa una ricerca dei dept con il nome e/o il codice e poi ritorna una matrice con le informazioni, se si lascia NULL un parametro verrà considerato %
 *
 * @param $conn La connessione che stiamo usando
 * @param $name Il nome del dept che vogliamo ricercare
 * @param $id L'id del dept che vogliamo ricercare
 *
 * @return
 * @return "internalError" Se viene sollevata una eccezione PDOException
 */
function dept($conn, $name, $id){
  if($conn == "null"){
    return -1;
  }
  if($name == NULL){
    $name = '%';
  }
  if($id == NULL){
    $id = "%";
  }
  try {
    $query = $conn->prepare("SELECT * FROM dept WHERE (name LIKE :dept_name) AND (code  LIKE :id) ORDER BY code");
    $query->bindParam(':dept_name', $name);
    $query->bindParam(':id', $id);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $result = $query->fetchAll();
  } catch(PDOException $e) {
    if (PDOError($e)) {
      return "internalError";
    }
  } finally {
    $conn = null;
  }
  $results = array(array(), array());
  foreach ($result as $row){
    array_push($results[0], $row["code"]);
    array_push($results[1], $row["name"]);
  }
  return $results;
}

/*
 * La funzione fa una ricerca delle subj con il nome e/o il codice e poi ritorna una matrice con le informazioni, se si lascia NULL un parametro verrà considerato %
 *
 * @param $conn La connessione che stiamo usando
 * @param $name Il nome della subj che vogliamo ricercare
 * @param $id L'id della subj che vogliamo ricercare
 *
 * @return
 * @return "internalError" Se viene sollevata una eccezione PDOException
 */
function subj($conn, $name, $id){
  if($conn == "null"){
    return -1;
  }
  if($name == NULL){
    $name = '%';
  }
  if($id == NULL){
    $id = "%";
  }
  try {
    $query = $conn->prepare("SELECT * FROM subj WHERE (name LIKE :subj_name) AND (code LIKE :id) ORDER BY code");
    $query->bindParam(':subj_name', $name);
    $query->bindParam(':id', $id);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $result = $query->fetchAll();
  } catch(PDOException $e) {
    if (PDOError($e)) {
      return "internalError";
    }
  } finally {
    $conn = null;
  }
  $results = array(array(), array());
  foreach ($result as $row){
    array_push($results[0], $row["code"]);
    array_push($results[1], $row["name"]);
  }
  return $results;
}


/*
 * La funzione serve a ricercare uno user dentro la tabella user inserrendo vari parametri, se alcuni di essi vengono lasciati NULL veranno considerati nella query come %, verranno poi restituite una o più tuple con gli elementi che rispettano i parametri
 *
 * @param $conn La connessione con la quale stiamo lavorando
 * @param $username Lo username dell'utente di cui vogliamo le informazioni'(Se è "" diventa % nella query)
 * @param $mail La mail dello user di cui vogliamo le informazioni (Se è "" diventa % nella query)
 * @param $acc_lvl Il grado di accesso dell'utente di cui vogliamo le informazioni (Se è NULL diventa TRUE nella query)
 * @param $fail_acc Il numero di failed access dell'utente di cui vogliamo le informazioni
 * @param last_log_from La data minima dell'ultimo login dell'utente di cui vogliamo le informazioni (Se è "" diventa TRUE nella query)
 * @param last_log_to La data massima dell'ultimo login dell'utente di cui vogliamo le informazioni (Se è "" diventa TRUE nella query)
 *
 * @return $result[x]["yyy"] Un array nel quale ci sono tutti gli user che rispettano i parametri ineriti dove x è l'ordine di sorting nella query (parte da 0) e yyy è il nome dell'attributo che vogliamo visualizzare
 * @return "internalError" Se viene sollevata una PDOException
 */
function user(PDOObject $conn, String $username, String $mail, int $acc_lvl, String $fail_acc, String $last_log_from, String $last_log_to){

  if($conn == NULL){
    return -1;
  }
  if($username == ""){
    $username = '%';
  }
  if($mail == ""){
    $mail = '%';
  }
  if($acc_lvl == NULL){
    $acc_lvl = TRUE;
  }
  if($last_log_from == ""){
    $last_log_from = TRUE;
  }
  if($last_log_to == ""){
    $last_log_to = TRUE;
  }
    try {
    $query = $conn->prepare("SELECT * FROM user WHERE (username LIKE :usrn) AND (mail LIKE :email) AND (acc_lvl = :acclvl) AND (fail_acc = :failacc) AND (last_log BETWEEN :lastlogfrom AND :lastlogto)");
    $query->bindParam(':usrn', $username);
    $query->bindParam(':email', $mail);
    $query->bindParam(':acclvl', $acc_lvl);
    $query->bindParam(':failacc', $fail_acc);
    $query->bindParam(':lastlogfrom', $last_log_from);
    $query->bindParam(':lastlogto', $last_log_to);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $result = $query->fetchAll();
  } catch(PDOException $e) {
    if (PDOError($e)) {
      return "internalError";
    }
  } finally {
    $conn = null;
  }
    $results = array();
    foreach ($result as $row){
      array_push($results, array(
        "username"=>$row["username"], "email"=>$row["email"],
        "acc_lvl"=>$row["acc_lvl"], "fail_acc"=>$row["fail_acc"],
        "last_log"=>$row["last_log"]
      ));
    }
  return $results;
}

  /*
   * La funzione ritorna una nota che rispetta i parametri inseriti
   *
   *  @param $conn La connessione con la quale stiamo lavorando
   * @param $title Il titolo della nota cercare
   * @param $dir La directpry in cui si trova la nota da cercare
   * @param $user L'utente che ha scritto la nota da carcare
   * @param $subj La materia a cui appartiene la nota da cercare
   * @param $year L'anno corrispondente alla nota da carcare
   * @param $dept Il dipartimento a cui appartiene la nota
   * @param $datefrom La data minima di creazione della nota
   * @param $dateto La data massima di creazione della nota
   * @param $order Inserire il nome dell'attributo secondo cui si vuole ordinare il risultato della query
   * @param $v Il verso di ordinamento dei risultati ("DESC" o "ASC")
   *
   * @return
   * @return "internalError" Se vengono sollevate delle PDOException
   */
  function searchNote($conn, $title, $dir, $user, $subj, $year, $dept, $datefrom, $dateto, $order, $v) {
    if ($title == NULL) {
      $title = "%";
    }
    if ($dir == NULL) {
      $dir = "%";
    }
    if ($user == NULL) {
      $user = "%";
    }
    if ($subj == NULL || $subj == "Tutto") {
      $subj = "%";
    }
    if ($year == NULL) {
      $year = "%";
    }
    if ($dept == NULL || $dept == "Tutto") {
      $dept = "%";
    }
    if ($datefrom == NULL) {
      $datefrom = "%";
    } else {
      //$datefrom = str_replace("/", "-", $datefrom) . "0:0:0";
    }
    if ($dateto == NULL) {
      $dateto = date("Y-m-d H:i:s");
    } else {
      //$dateto = str_replace("/", "-", $dateto) . "0:0:0";
    }
    if ($order == NULL) {
      $order = "date";
    }
    if ($v == NULL) {
      $v = "DESC";
    } elseif ($v == "discendente") {
      $v = "DESC";
    } else {
      $v = "ASC";
    }

    try {
      $query = $conn->prepare("SELECT * FROM note WHERE (title LIKE :ttl) AND (dir LIKE :dir) AND (user LIKE :usr) AND (subj LIKE :subj) AND (year LIKE :year) AND (dept LIKE :dept) AND (date BETWEEN :datefrom AND :dateto) ORDER BY $order $v");
      $title = str_replace(" ", "_", $title);
      $query->bindParam(":ttl", $title);
      $query->bindParam(":dir", $dir);
      $query->bindParam(":usr", $user);
      $query->bindParam(":subj", $subj);
      $query->bindParam(":year", $year);
      $query->bindParam(":dept", $dept);
      $query->bindParam(":datefrom", $datefrom);
      $query->bindParam(":dateto", $dateto);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      $results = array();
      $i = 0;
      foreach ($result as $row) {
        array_push($results, array());
        $results[$i]["title"] = str_replace("_", " ", $row["title"]);
        $results[$i]["dir"] = $row["dir"];
        $results[$i]["user"] = $row["user"];
        $results[$i]["subj"] = $row["subj"];
        $results[$i]["year"] = $row["year"];
        $results[$i]["dept"] = $row["dept"];
        $results[$i]["date"] = $row["date"];
        $i++;
      }
      return $results;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione inserisce una nuova nota nella table note
   *
   * @param $conn La connessione che stiamo usando
   * @param $title Il titolo della nota che vogliamo inserire
   * @param $user L'utente che sta creando la nota
   * @param $subj La materia a cui si riferisce l'appunto
   * @param $dept Il dept a cui si riferisce la dept
   * @param $content Il testo contenuto nella nota
   *
   * @return true Se tutto va come deve e la nota viene caricata senza problemi
   */
  function writeNote($conn, String $title, String $user, String $subj, String $dept, String $content) {
    $title = str_replace(" ", "_", $title);
    $dir = "/notedb/$user/$title.txt";
    $year = date("Y");
    $date = date("Y-m-d H:i:s");
    try {
      $query = $conn->prepare("INSERT INTO note VALUES (:ttl, :dir, :user, :subj, :year, :dept, :date)");
      $query->bindParam(":ttl", $title);
      $query->bindParam(":dir", $dir);
      $query->bindParam(":user", $user);
      $query->bindParam(":subj", $subj);
      $query->bindParam(":year", $year);
      $query->bindParam(":dept", $dept);
      $query->bindParam(":date", $date);
      $noteFile = fopen("../notedb/$user/$title.txt", "w+");
      if ($noteFile == false) {
        die();
      }
      fwrite($noteFile, $content);
      fclose($noteFile);
      $query->execute();
      return true;
    } catch (PDOException $e) {
      PDOError($e);
      die(json_encode("NOTEW"));
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione cancella una nota dato il suo titolo
   *
   * @param $conn La connessione che stiamo usando
   * @param $title Il titolo della nota da cancellare
   *
   * @return true Se tutto va come deve e viene cancellata
   * @return false Se viene sollevata una PDOException
   */
  function delNote($conn, String $title) {
    $title = str_replace(" ", "_", $title);
    error_log("Deleting: $title");
    try {
      $query = $conn->prepare("SELECT dir FROM note WHERE title = :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $dir = $query->fetchAll();
      $dir = $dir[0]["dir"];
      exec("rm ..$dir");
      $query = $conn->prepare("DELETE FROM note WHERE title = :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();

      return true;
    } catch (PDOException $e) {
      PDOError($e);
      return false;
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione dice se è presente la nota con il titolo $title fra le note
   *
   * @param $conn La connessione che vogliamo usare
   * @param $title Il titolo della nota di cui vogliamo verificare la presenza
   *
   * @return true Se una nota con titolo $title è già presente
   * @return false Se non c'è nessuna nota con quel titolo o se è stato sollevata una PDOException
   */
  function checkNote($conn, String $title) {
    $title = str_replace(" ", "_", $title);
    try {
      $query = $conn->prepare("SELECT user FROM note WHERE title = :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();
      $result = $query->fetchAll();
      if (empty($result[0]["user"])) {
        return false;
      } else {
	      return true;
      }
    } catch (PDOException $e) {
      PDOError($e);
      return false;
    } finally {
      $conn = null;
    }
  }

  function getNote($conn, String $title) {
    $title = str_replace(" ", "_", $title);
    try {
      $query = $conn->prepare("SELECT dir FROM note WHERE title = :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $dir = $query->fetchAll();
      $dir = $dir[0]["dir"];
      return file("../$dir");
    } catch (PDOException $e) {
      PDOError($e);
      return false;
    } finally {
      $conn = null;
    }
  }

  function searchMark($conn, $id, $user, $title, $mark, $datefrom, $dateto, $code){

    if($conn == "null"){
      return -1;
    }
    if($id == NULL){
      $id = "%";
    }
    if($user == NULL){
      $user = '%';
    }
    if($title == NULL){
      $title = "%";
    } else {
      $title = str_replace(" ", "_", $title);
    }
    if($mark == NULL){
      $mark = "%";
    }elseif($mark<1){
      $mark = 1;
    }elseif($mark>5){
      $mark = 5;
    }
    if ($datefrom == NULL) {
      $datefrom = "%";
    }
    if ($dateto == NULL) {
      $dateto = date("Y-m-d H:i:s");
    }
    if($code == NULL){
      $code = "title";
    }
    try {
      $query = $conn->prepare("SELECT * FROM mark WHERE (id LIKE :id) AND (user LIKE :user) AND (title LIKE :title) AND (mark LIKE :mark) AND(date BETWEEN :datefrom AND :dateto) ORDER BY :code");
      $query->bindParam(':id', $id);
      $query->bindParam(':user', $user);
      $query->bindParam(':title', $title);
      $query->bindParam(':mark', $mark);
      $query->bindParam(':datefrom', $datefrom);
      $query->bindParam(':dateto', $dateto);
      $query->bindParam(':code', $code);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      $results = array();
      $i = 0;
      foreach ($result as $row) {
        array_push($results, array());
        //dobbiamo usare il _ perché nel where di delete non funzionerebbe usare spazi
        $results[$i]["id"] = $row["id"];
        $results[$i]["user"] = $row["user"];
        $results[$i]["title"] = str_replace("_", " ", $row["title"]);
        $results[$i]["mark"] = $row["mark"];
        $results[$i]["date"] = $row["date"];
        $i++;
      }
      return $results;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }

  function searchRepo($conn, $id, $user, $title, $text, $datefrom, $dateto, $code){

    if($conn == "null"){
      return -1;
    }
    if($id == NULL){
      $id = "%";
    }
    if($user == NULL){
      $user = '%';
    }
    if($title == NULL){
      $title = "%";
    } else {
      $title = str_replace(" ", "_", $title);
    }
    if($text == NULL){
      $text = "%";
    }
    if ($datefrom == NULL) {
      $datefrom = "%";
    }
    if ($dateto == NULL) {
      $dateto = date("Y-m-d H:i:s");
    }
    if($code == NULL){
      $code = "title";
    }
    try {
      $query = $conn->prepare("SELECT * FROM repo WHERE (id LIKE :id) AND (user LIKE :user) AND (title LIKE :title) AND (text LIKE :text) AND(date BETWEEN :datefrom AND :dateto) ORDER BY :code");
      $query->bindParam(':id', $id);
      $query->bindParam(':user', $user);
      $query->bindParam(':title', $title);
      $query->bindParam(':text', $text);
      $query->bindParam(':datefrom', $datefrom);
      $query->bindParam(':dateto', $dateto);
      $query->bindParam(':code', $code);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      $results = array();
      $i = 0;
      foreach ($result as $row) {
        array_push($results, array());
        //dobbiamo usare il _ perché nel where di delete non funzionerebbe usare spazi
        $results[$i]["id"] = $row["id"];
        $results[$i]["user"] = $row["user"];
        $results[$i]["title"] = str_replace("_", " ", $row["title"]);
        $results[$i]["text"] = $row["text"];
        $results[$i]["date"] = $row["date"];
        $i++;
      }
      return $results;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }

  function searchRevw($conn, $id, $user, $title, $review, $datefrom, $dateto, $order, $v){

    if($conn == "null"){
      return -1;
    }
    if($id == NULL){
      $id = "%";
    }
    if($user == NULL){
      $user = '%';
    }
    if($title == NULL){
      $title = "%";
    } else {
      $title = str_replace(" ", "_", $title);
    }
    if($review == NULL){
      $review = "%";
    }
    if ($datefrom == NULL) {
      $datefrom = "%";
    }
    if ($dateto == NULL) {
      $dateto = date("Y-m-d H:i:s");
    }
    if($order == NULL){
      $order = "date";
    }
    if ($v == NULL) {
      $v = "DESC";
    } elseif ($v == "discendente") {
      $v = "DESC";
    } else {
      $v = "ASC";
    }
    try {
      $query = $conn->prepare("SELECT * FROM revw WHERE (id LIKE :id) AND (user LIKE :user) AND (title LIKE :title) AND (review LIKE :review) AND(date BETWEEN :datefrom AND :dateto) ORDER BY $order $v");
      $query->bindParam(':id', $id);
      $query->bindParam(':user', $user);
      $query->bindParam(':title', $title);
      $query->bindParam(':review', $review);
      $query->bindParam(':datefrom', $datefrom);
      $query->bindParam(':dateto', $dateto);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      $results = array();
      $i = 0;
      foreach ($result as $row) {
        array_push($results, array());
        //dobbiamo usare il _ perché nel where di delete non funzionerebbe usare spazi
        $results[$i]["id"] = $row["id"];
        $results[$i]["user"] = $row["user"];
        $results[$i]["title"] = str_replace("_", " ", $row["title"]);
        $results[$i]["review"] = $row["review"];
        $results[$i]["date"] = $row["date"];
        $i++;
      }
      return $results;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }
  function postComment($conn, String $user, String $title, String $content) {
    if ($user == NULL || $content == NULL || $conn == "null" || $conn == NULL) {
      return false;
    }
    $title = str_replace(" ", "_", $title);
    try {
      $query = $conn->prepare("INSERT INTO revw (user, title, review, date) VALUES (:user, :title, :review, NOW())");
      $query->bindParam(":user", $user);
      $query->bindParam(":title", $title);
      $query->bindParam(":review", $content);
      $query->execute();
      $query = $conn->prepare("SELECT id FROM revw WHERE review LIKE :content");
      $query->bindParam(":content", $content);
      $query->execute();
      $id = $query->fetchAll();
      $response = array();
      $response["state"] = true;
      $response["id"] = $id[0]["id"];
      return $response;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }
  function delComment($conn, $id) {
    if ($id == "" || $id == "%" || $id == NULL || $conn == "null" || $conn == NULL) {
      return false;
    }
    try {
      $query = $conn->prepare("DELETE FROM revw WHERE id = :id");
      $query->bindParam(":id", $id);
      $query->execute();
      return true;
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }
  function isNoteOwner($conn, $title, $user) {
    if ($conn == "null" || $conn == NULL || $title == NULL || $user == NULL) {
      return false;
    }
    try {
      $title = str_replace(" ", "_", $title);
      $query = $conn->prepare("SELECT user FROM note WHERE title LIKE :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();
      if ($query->fetchAll()[0]["user"] == $user) {
        return true;
      } else {
        return false;
      }
    } catch(PDOException $e) {
      if (PDOError($e)) {
        return "internalError";
      }
    } finally {
      $conn = null;
    }
  }
  function updateNote($conn, $user, $title, $newTitle, $newContent) {
    $title = str_replace(" ", "_", $title);
    $newTitle = str_replace(" ", "_", $newTitle);
    $newDir = "/notedb/$user/$newTitle.txt";
    try {
      $query = $conn->prepare("SELECT dir FROM note WHERE title = :ttl");
      $query->bindParam(":ttl", $title);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $dir = $query->fetchAll();
      $dir = $dir[0]["dir"];
      if ($dir !== $newDir) {
        exec("mv ..$dir ..$newDir");
      }
      if ($content = fopen("..$newDir", "w+")) {
        //se usiamo r+ non possiamo eliminare caratteri, con w+ il file viene distrutto e riscritto.
        fwrite($content, $newContent);
        fclose($content);
        $query = $conn->prepare("UPDATE note SET title = :newTtl WHERE title = :ttl");
        $query->bindParam(":newTtl", $newTitle);
        $query->bindParam(":ttl", $title);
        $query->execute();
        $query = $conn->prepare("UPDATE note SET dir = :newDir WHERE title = :newTtl");
        $query->bindParam(":newTtl", $newTitle);
        $query->bindParam(":newDir", $newDir);
        $query->execute();
        return true;
      } else {
        return false;
      }
    } catch(PDOException $e) {
      PDOError($e);
      return false;
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione inserisce il rating di una nota se l'utente non l'aveva già inserito o se il rating che vuole inserire ora è diverso da quelle che aveva inserito in passato
   *
   * @param $username Lo username che vuole inserire la nota
   * @param $title Il titolo della nota della quale si vuole inserire il rating
   * @param $rating Il rating che si vuole isnerire (true per Mi piace e false per Non mi piace)
   *
   * @return true Se il rating viene aggiunto o aggiornato senza problemi
   * @return "internalError" Se è stata sollevta una PDOexception
   * @return false Se il rating che si vuole inserire era già presente
   */
  function rateNote(String $username, String $title, bool $rating) {
    $title = str_replace(" ", "_", $title);
    if ($rating) {
      $rating = 1;
    } else {
      $rating = 0;
    }
    try {
      if(alreadyRated($username, $title) == 0) {
         $conn = connectDb();
         $query = $conn->prepare("INSERT INTO rate (user, note, rate, date)  VALUES (:username, :title, :rating, NOW())");
         $query->bindParam(":username", $username);
         $query->bindParam(":title", $title);
         $query->bindParam(":rating", $rating);
         $query->execute();
         return true;
       } elseif((alreadyRated($username, $title) == 1) && (getRate($username, $title) != -1) && (getRate($username, $title) != $rating)) {
         $conn = connectDb();
         $query = $conn->prepare("UPDATE rate SET rate = :rating  WHERE (user = :username) AND (note = :title)");
         $query->bindParam(":rating", $rating);
         $query->bindParam(":username", $username);
         $query->bindParam(":title", $title);
         $query->execute();
         return true;
       } else {
         return false;
       }
    } catch(PDOException $e) {
      PDOError($e);
      return "internalError";
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione serve a verificare se l'utente ha già inserito un rating per la nota, ritorna il numero di rating già inseriti (dovrebbe essere fra 1 e 0)
   *
   * @param $username Lo username dell'utente di cui si vuole controllare il rate
   * @param title La nota sulla quale si cerca il possibile rate dell'utente
   *
   * @return Il numero di rate messi dall'utente alla nota $title (dovrebbe essere fra 0 e 1)
   * @return -1 Se è stata sollevata una eccezzione PDOException
   */
  function alreadyRated(String $username, String $title) {
    $title = str_replace(" ", "_", $title);
    try {
      $conn = connectDb();
      $query = $conn->prepare("SELECT COUNT(*) as num FROM rate WHERE (user = :username) AND (note = :title)");
      $query->bindParam(":username", $username);
      $query->bindParam(":title", $title);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      return $result[0]["num"];
    } catch(PDOException $e) {
      PDOError($e);
      return -1;
    } finally {
      $conn = null;
    }
  }

  /*
   * Restituisce il rate dato a una nota da un utente se c'è il rate, altrimenti restituisce -1
   *
   * @param $username Lo username del quale si vuole fare la ricerca
   * @param $title Il titolo della nota sulla quale si deve cercare il rate
   *
   * @return -1 Se non c'è alcun rate su quella nota da parte dell'utente o se è stata sollevata una PDOException
   * @return 1 Se il rate è TRUE
   * @return 0 Se il rate è FALSE
   */
  function getRate(String $username, String $title){
    $title = str_replace(" ", "_", $title);
    try {
      if (alreadyRated($username, $title) != 1) {
        return -1;
      } else {
        $conn = connectDb();
        $query = $conn->prepare("SELECT rate FROM rate WHERE (user = :username) AND (note = :title)");
        $query->bindParam(":username", $username);
        $query->bindParam(":title", $title);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetchAll();
        return $result[0]["rate"];
      }
    } catch(PDOException $e) {
      PDOError($e);
      return -1;
    } finally {
      $conn = null;
    }
  }

  /*
   * La funzione ritorna il numero di rate positivi sulla nota $note
   *
   * @param $note Il nome della nota nella quale cercare i rate
   *
   * @return Il numero di rate positivi
   * @return false In caso di errore se viene sollevata una PDOException
   */
  function getLikes($note){
    $note = str_replace(" ", "_", $note);
    try{
      $conn = connectDb();
      $query = $conn->prepare("SELECT COUNT(*) as num FROM rate WHERE (note = :note) AND (rate = 1)");
      $query->bindParam(":note", $note);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      return $result[0]["num"];
    }catch(PDOException $e){
      PDOError($e);
      return false;
    }finally{
      $conn = null;
    }
  }

  /*
   * La funzione ritorna il numero di rate negativi sulla nota $note
   *
   * @param $note Il nome della nota nella quale cercare i rate
   *
   * @return Il numero di rate negativi
   * @return false In caso di errore se viene sollevata una PDOException
   */
  function getDislikes($note){
    $note = str_replace(" ", "_", $note);
    try{
      $conn = connectDb();
      $query = $conn->prepare("SELECT COUNT(*) as num FROM rate WHERE (note = :note) AND (rate = 0)");
      $query->bindParam(":note", $note);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      return $result[0]["num"];
    }catch(PDOException $e){
      PDOError($e);
      return false;
    }finally{
      $conn = null;
    }
  }

  /*
   * La funzione ritorna il numero totale dei rate lasciati dall'utente $user sotto tutte le note del DB
   *
   * @param $user Il nome dell'utente del quale cercare i rate
   *
   * @return Il numero di rate lasciati dall'utente (non i rate che gli altri lasciano sotto le sue note ma quelli che lui lascia in tutte le note del database)
   * @return false In caso di errore se viene sollevata una PDOException
   */
  function getLeftRate($user){
    try{
      $conn = connectDb();
      $query = $conn->prepare("SELECT COUNT(*) as num FROM rate WHERE user = :user");
      $query->bindParam(":user", $user);
      $query->execute();
      $query->setFetchMode(PDO::FETCH_ASSOC);
      $result = $query->fetchAll();
      return $result[0]["num"];
    }catch(PDOException $e){
      PDOError($e);
      return false;
    }finally{
      $conn = null;
    }
  }

?>
