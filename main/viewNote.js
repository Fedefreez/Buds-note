function logout() {
  var clickBtnValue = "logout";
  var ajaxurl = '../php/sessionDestroyer.php',
  data =  {'action': clickBtnValue};
  $.post(ajaxurl, data, function (response) {
  if (response) {
      $('.logout').attr('hidden', true);
      $('.log').attr('hidden', false);
    } else {
      $('.logout').attr('hidden', true);
      $('.log').attr('hidden', false);
      error("sessione");
    }
  });
  $('.adminTools').empty();
  $(".adminTools").hide();
  $("#greet").empty();
  $(".scriviNota").empty();
  $("#scriviNotaBtn").hide();
  localStorage.setItem("logged_in", false);
}
function error(err) {
  $("#warn").show();
  switch (err) {
    case "sessione":
      $("#warn").html("Errore nel logout, se hai visto questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
    break;
    case "IES":
      $("#warn").html("Abbiamo riscontrato un errore nella ricerca, se stai vedendo questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "man":
      $("#warn").html("Il server é in manutenzione, certe funzionalità potrebbero essere bloccate.");
      break;
    case "IEMAN":
      $("#warn").html("Errore nell'impostazione della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "IEMANS":
      $("#warn").html("Errore nell'impostazione della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "IEMANR":
      $("#warn").html("Errore nella lettura dello stato della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "NOMAN":
      $("#warn").html("Non sei autorizzato a modificare lo stato della manutenzione. Questo incidente é stato segnalato.");
      break;
    case "MANAA":
      $("#warn").html("Manutenzione giá attiva!" + " Codice: " + err);
      break;
    case "MANAT":
      $("#warn").html("Manutenzione giá terminata!" + " Codice: " + err);
      break;
    case "NOTENV":
      $("#warn").html("Nota non valida!" + " Codice: " + err);
      break;
    case "NOTEANV":
      $("#warn").html("Tipo di azione non valido (se vedi questo messaggio riferiscilo agli amministratori)!" + " Codice: " + err);
      break;
    case "NOTENL":
      $("#warn").html("Prima devi eseguire il login!");
      break;
    case "NOTEW":
      $("#warn").html("Errore nella scrittura della nota, se vedi questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "NOTEDNA":
      $("#warn").html("Non sei autorizzato a cancellare le note, questo incidente é stato segnalato");
      break;
    case "NOTEDE":
      $("#warn").html("C'é stato un errore nella rimozione della nota, controlla il log delgi erroi." + " Codice: " + err);
      break;
    case "NOTESC":
      $("#warn").html("Non si possono usare caratteri speciali in una nota! (. e / non supportati)");
      break;
    case "NOTEDNF":
      $("#warn").html("Nota non trovata!");
      break;
    case "NOTEUNV":
      $("#warn").html("Testo della nota non valido" + " Codice: " + err);
      break;
    case "NOTEUNA":
      $("#warn").html("Non sei autorizzato a modificare questa nota, l'incidendte é stato segnalato");
      break;
    case "NOTEUNE":
      $("#warn").html("La nota che volevi aggiornare non é stata trovata, copia le modifiche e prova a ricaricare la pagina. Se il problema persiste contatta gli amministratori." + " Codice: " + err);
      break;
    case "NOTEUUF":
      $("#warn").html("Errore nell'aggiornamento della nota, se vedi questo messaggio contatta gli amministratori." + " Codice: " + err);
      break;
    case "NOTERNE":
      $("#warn").html("La nota che stai provando di valutare non esiste... o.O (riferisci questo messaggio agli amministratori)" + " Codice: " + err);
      break;
    case "NOTERAE":
      $("#warn").html("Hai giá valutato questa nota! " + " Codice " + err);
      break;
    case "NOTENLG":
      $("#warn").html("Prima devi loggarti!");
      break;
    case "NOTERWIE":
      $("#warn").html("C'é stato un errore nella scrittura della valutazione della nota, rifersici questo messaggio agli amministratori." + " Codice: " + err);
      break;
    case "NOTERNV":
      $("#warn").html("Parametri di valutazione non validi!" + " Codice " + err);
      break;
    case "COMMENTNV":
      $("#warn").html("Commento non valido!" + " Codice: " + err);
      break;
    case "COMMENTANV":
      $("#warn").html("Tipo di azione non valido (se vedi questo messaggio riferiscilo agli amministratori)!" + " Codice: " + err);
      break;
    case "COMMENTNL":
      $("#warn").html("Devi essere loggato per scrivere un commento!");
      break;
    case "COMMENTW":
      $("#warn").html("Errore nella scrittura del commento, se vedi questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "COMMENTDNA":
      $("#warn").html("Non sei autorizzato a cancellare i commenti, questo incidente é stato segnalato");
      break;
    case "COMMENTDE":
      $("#warn").html("C'é stato un errore nella rimozione del commento, controlla il log delgi erroi.");
      break;
    case "COMMENTDNF":
      $("#warn").html("Commento non trovato!");
      break;
    case "RESMINR":
      $("#warn").html("La larghezza del broswer, in questo momento non é sufficiente per un funzionamento corretto del sito. Si prega di allargare il broswer.");
      break;
    case "IMGUAE":
      //finché non si potranno modificare le immagini relative alla nota, questo errore non dovrebbe apparire
      $("#warn").html("Hai giá caricato un'immagine relativa alla nota con lo stesso nome!" + " Codice: " + err);
      break;
    case "IMGUIE":
      $("#warn").html("Abbiamo riscontrato un errore interno nel caricamento dell'immagine!" + " Codice: " + err);
      break;
    case "IMGUNL":
      $("#warn").html("Prima devi eseguire il login!" + " Codice: " + err);
      break;
    case "IMGUUE":
      $("#warn").html("Errore sconosciuto nel caricamento dell'immagine! <bold>Riferisci questo messaggio agli amministratori</bold>" + " Codice: " + err);
      break;
    case "IMGUNO":
      $("#warn").html("Non sei il proprietario della nota quindi non puoi aggiungerci delle immagini! Codice: " + err);
      break;
    case "IMGUVNV":
      $("#warn").html("Valori non validi per il caricamento dell'immagine!" + " Codice: " + err);
      break;
    case "IMGUFNS":
      $("#warn").html("Questo tipo di immagine non é supportato!" + " Codice: " + err);
      break;
    case "IMGUFNI":
      $("#warn").html("Il file che stai cercando di caricare non é un'immagine!" + "Codice: " + err);
      break;
    case "IMGUFTB":
      $("#warn").html("La dimensione massima per un'immagine é di 5MB!" + " Codice: " + err);
      break;
    case "IMGUMIE":
      $("#warn").html("C'é stato un errore nel caricamento dell'immagine!" + " Codice: " + err);
      break;
    case "IMGUUIE":
      $("#warn").html("Errore imprevisto nel caricamento dell'immagine! <bold>Riferisci questo messaggio agli amministratori.</bold>" + " Codice: " + err);
      break;
    case "IMGUNEN":
      $("#warn").html("La nota a cui stai cercando di allegare l'immagine non esiste!" + " Codice: " + err);
      break;
    case "IMGDIE":
      $("#warn").html("Qualcosa é andato storto nella rimozione dell'immagine nel database. (riferisci il messaggio agli amministratori) Codice: " + err);
      break;
    case "IMGDNA":
      $("#warn").html("Non sei autorizzato a rimuovere questa immagine, l'incidente é stato registrato.");
      break;
    case "IMGDID":
      $("#warn").html("L'immagine che stai provando di rimuovere non é associata a questa nota. Codice: " + err);
      break;
    case "IMGDUE":
      $("#warn").html("Errore sconosciuto nella rimozione dell'immagine, riferisci il messaggio agli amministratori. Codice: " + err);
      break;
    case "IMGDVNV":
      $("#warn").html("I parametri per la rimozione dell'immagine non sono validi. Codice: " + err);
      break;
    case "IMGDNL":
      $("#warn").html("Per rimovere un'immagine devi eseguire il login! Codice: " + err);
      break;
    case "COMMENTUIE":
      $("#warn").html("Errore nell'aggiornamento dei commenti, riferisci questo messaggio agli amministratori. Codice: " + err);
      break;
    case "COMMENTUVNV":
      $("#warn").html("Valori non validi per l'aggiornamento dei commenti, riferisci questo messaggio agli amministratori. Codice: " + err);
      break;
    default:
      $("#warn").html("Abbiamo riscontrato un errore, se stai vedendo questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
    break;
  }
  setTimeout(function(){$("#warn").hide();}, 10000);
}
function postComment() {
  var action = "write";
  var ajaxurl = '../php/commentManager.php',
  data =  {
    'type': action,
    'noteId': localStorage.getItem("noteId"),
    'content': $("#commentText").val().replace(/\n/g, "<br>")
  };
  $.post(ajaxurl, data, function (response) {
    response = JSON.parse(response);
  if (response["state"] == "done") {
      $(".localSpawn").prepend('<span id="' + response["id"] +  '"></span>');
      $("#" + response["id"]).html("<div class=commentText><span class='revwText'>" + $("#commentText").val().replace(/\n/g, "<br>") + '</span><button class="delCommentBtn" onclick="delComment(' + response["id"] + ');">Elimina commento</button></div>');
      $("#" + response["id"]).append('<div class=commentInfo>' + response["username"] + " - " + response["date"] + "</div>");
      $("#commentText").val("");
    } else {
      error(response);
    }
  });
}
function man(c) {
  if (c == "on") {
   var ajaxurl = "../php/manutenzione.php";
   var manutenzione = "true";
   data = {
     'valman': manutenzione
   }
   $.post(ajaxurl, data, function(response) {
     response = JSON.parse(response);
     if (response == "done") {
       $("#warn").show();
       $("#warn").html("fatto");
       setTimeout(function(){
         $("#warn").hide();
       }, 5000);
     } else {
       error(response);
     }
   });
  } else {
    var ajaxurl = "../php/manutenzione.php";
    var manutenzione = "false";
    data = {
      'valman': manutenzione
    }
    $.post(ajaxurl, data, function(response) {
      response = JSON.parse(response);
      if (response == "done") {
        $("#warn").show();
        $("#warn").html("fatto");
        setTimeout(function(){
          $("#warn").hide();
        }, 5000);
      } else {
        error(response);
      }
    });
  }
}
function deleteNote() {
  $("#delNoteBtn").html("Conferma");
  $("#delNoteBtn").attr("onclick", "delNote()");
  $("#abortNoteDeletion").show();
}
function abortNoteDeletion() {
  $("#delNoteBtn").html("Rimuovi nota");
  $("#delNoteBtn").attr("onclick", "deleteNote()");
  $("#abortNoteDeletion").hide();
}
function delNote() {
  var ajaxurl = "../php/noteManager.php";
  data = {
    'noteId': localStorage.getItem("noteId"),
    'type': 'delete'
  }
  $.post(ajaxurl, data, function(response) {
    response = JSON.parse(response);
    if (response == "done") {
      //$(".comments").remove();
      $("#warn").show();
      $("#warn").html("Fatto");
      $("#abortNoteDeletion").hide();
      $("#warn").hide();
      window.location.href = "../../";
    } else {
      error(response);
    }
  });
  localStorage.removeItem("noteId");
  $("#delNoteBtn").html("Rimuovi nota");
  $("#delNoteBtn").attr("onclick", "deleteNote()");
}

function delCommentShow() {
  $(".delNote").hide();
  $("#everythingAboutNote").show();
  $(".delCommentBtn").show();
  $("#delCommentBtn").html("Annulla");
  $("#delCommentBtn").attr("onclick", "abortCommentDeletion()");
}
function abortCommentDeletion() {
  $(".delNote").hide();
  $("#everythingAboutNote").show();
  $(".delCommentBtn").hide();
  $("#delCommentBtn").html("Rimuovi commento");
  $("#delCommentBtn").attr("onclick", "delCommentShow()");
}
function delComment(id) {
  var ajaxurl = "../php/commentManager.php";
  id = id.toString(10);
  data = {
    'id': id,
    'type': 'delete'
  }
  $.post(ajaxurl, data, function(response) {
    response = JSON.parse(response);
    if (response == "done") {
      $("#warn").show();
      $("#warn").html("Fatto");
      setTimeout(function(){
        $("#warn").hide();
      }, 5000);
    } else {
      error(response);
    }
    $("#" + id).remove();
    $("#everythingAboutNote").show();
  });
}
function showNoteEditor() {
  $("#modifyNoteBtn").hide();
  $(".spawnTtl").replaceWith("<textarea id='modifyTtlTxtH' rows='1' cols='100'>" + $(".spawnTtl").html() + "</textarea>");
  //senza /.../g js rimpiazza solo il primo match
  $(".noteText").replaceWith("<textarea id='modifyContentTxtH' cols='100' rows='10'>" + $(".noteText").html().replace(/<br>/g,"\n") + "</textarea>");
  $("#modifyNoteConfirm").show();
}
function modifyNote() {
  $("#modifyNoteConfirm").hide();
  $("#modifyNoteBtn").show();
  $("#modifyTtlTxtH").replaceWith("<span class='spawnTtl'>" + $("#modifyTtlTxtH").val() + "</span>");
  var content = $("#modifyContentTxtH").val();
  $("#modifyContentTxtH").replaceWith("<span class='noteText'>" + $("#modifyContentTxtH").val().replace(/\n/g, "<br>") + "</span>");
  var ajaxurl = "../php/noteManager.php";
  var newTitle = $(".spawnTtl").html().replace(/'/g, "sc-a");
  newTitle = newTitle.replace(/"/g, "sc-q");
  data = {
    'noteId': localStorage.getItem("noteId"),
    'newTitle': newTitle,
    'newContent': content,
    'type': 'update'
  }
  $.post(ajaxurl, data, function(response) {
    response = JSON.parse(response);
    if (response["status"] == "done") {
      //in questo modo aggiorniamo il link della pagina senza doverla ricaricare con window.location.href, i primi due parametri della funzione servono ad altre cose
      //window.history.pushState("", "", "http://" + location.host + "/php/viewNote.php?id=" + id);
      //NOTE: DEPRECATED: da quando usiamo gli id, il titolo non cambia l'url
    } else {
      error(response["status"]);
    }
  });
}
function toolbarUser() {
  $(".adminTools").show();
  $(".user").show();
}
function rateNote(rating) {
  var ajaxurl = "../php/noteManager.php";
  data = {
    'noteId': localStorage.getItem("noteId"),
    'rating': rating,
    'type': 'rate'
}
  $.post(ajaxurl, data, function(response) {
    response = JSON.parse(response);
    if (response["status"] == "done") {
      if (rating && response["type"] == "modify") {
        $(".likes").html(parseInt($(".likes").html()) + 1);
        $(".dislikes").html(parseInt($(".dislikes").html()) - 1);
      } else if (!rating && response["type"] == "modify") {
        $(".likes").html(parseInt($(".likes").html()) - 1);
        $(".dislikes").html(parseInt($(".dislikes").html()) + 1);
      } else if (rating) {
        $(".likes").html(parseInt($(".likes").html()) + 1);
      } else {
        $(".dislikes").html(parseInt($(".dislikes").html()) + 1);
      }
    } else {
      error(response["status"]);
    }
  });
}

function removeImage(id) {
  var ajaxurl = "deleteImage.php";
  data = {
    "noteId": localStorage.getItem("noteId"),
    "id": id
  }
  $.post(ajaxurl, data, function(response) {
    var response = JSON.parse(response);
    if (response["status"] === "success") {
      $("#" + id).remove();
      $("#warn").show();
      $("#warn").html("Fatto");
      setTimeout(function(){
        $("#warn").hide();
      }, 5000);
    } else {
      error(response["status"]);
    }
  });
}
function showImageRemoval() {
  $(".removeImage").show();
  $("#showImageRemoval").html("Fine");
  $("#showImageRemoval").attr("onclick", "hideImageRemoval()");
}
function hideImageRemoval() {
  $(".removeImage").hide();
  $("#showImageRemoval").html("Rimuovi immagine");
  $("#showImageRemoval").attr("onclick", "showImageRemoval()");
}

function checkForNewComments() {
  if (localStorage.getItem('noteNotFound') === "false") {
    var ajaxurl = "commentManager.php";
    var commentsIds = [];
    var allComments = $(".commentText");
    if (allComments.length !== 0) {
      for (var i = 0; i < allComments.length; i++) {
        comment = allComments[i];
        commentsIds.push($(comment).attr("commentId") + "");
      }
    } else {
      commentsIds = ["null"];
    }
    var data = {
      'commentsIds' : commentsIds,
      'noteId' : localStorage.getItem("noteId"),
      'type' : 'check'
    }
    $.post(ajaxurl, data, function(response) {
      response = JSON.parse(response);
      if (response["status"] === "outdated") {
        for (var i = 0; i < response["newComments"].length; i++) {
          $(".localSpawn").append('<span id="' + response["newComments"][i]["id"] +  '"></span>');
          $("#" + response["newComments"][i]["id"]).html("<div commentId=" + response["newComments"][i]["id"] +" class=commentText><span class='revwText'>" + response["newComments"][i]["review"] + '</span><button class="delCommentBtn" onclick="delComment(' + response["newComments"][i]["id"] + ');">Elimina commento</button></div>');
          $("#" + response["newComments"][i]["id"]).append('<div class=commentInfo>' + response["newComments"][i]["user"] + " - " + response["newComments"][i]["date"] + "</div>");
        }
      } else if (response["status"] === "outdated-deletions") {
        for (var i = 0; i < response["deletedCommentsIds"].length; i++) {
          $("#" + response["deletedCommentsIds"][i]).remove();
        }
      } else if (response["status"] === "deleted") {
        $("#warn").show();
        $("#warn").html("Da un controllo la nota risulta rimossa, tornerai alla home in 5 secondi. Codice: " + response["status"] + "<button onclick='abortNoteDeletedRedirection()' class='btn'>Annulla</button>");
        if (localStorage.getItem("abortNoteDeletedRedirection") !== "true") {
          localStorage.setItem("abortNoteDeletedRedirection", false);
        }
        setTimeout(function(){
          $("#warn").hide();
          if (localStorage.getItem("abortNoteDeletedRedirection") === "false") {
            window.location.href = "../..";
          }
        }, 5000);
      }  else if (response["status"] !== undefined && response["status"] !== "up-to-date") {
        error(response["status"]);
      } else if (response["status"] === undefined && response["status"] !== "up-to-date"){
        error(response);
      }
    });
  }
}

function abortNoteDeletedRedirection() {
  localStorage.setItem("abortNoteDeletedRedirection", true);
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

$(document).ready(function() {
  if ($(window).width() < 730) {
    error("RESMINR");
  }
  // 94/1024=x/width: in 1024px di grandezza ci stanno 94 chars,
  //usiamo questa proporzione per calcolare dove mettere i <br/>
  width = Math.ceil(($(window).width() * 0.8) * 94 / 1024); //prendiamo l'80% poi proporzione
  var comments = document.getElementsByClassName("revwText");
  for (var i = 0; i < comments.length; i++) {
    var readyText = "";
    tmp = comments[i];
    text = tmp.innerHTML;
    lines = text.split("<br>");
    //eliminiamo tutte le nostre aggiunte precedenti (da php in questo caso)
    //prendo le righe del commento in un array
    for (var c = 0; c < (lines.length - 1 /*non serve nell'ultima*/); c++) {
      lines[c] = lines[c] + "<br>";
    }
    for (var c = 0; c < lines.length; c++) {
      currentLine = lines[c];
      //So che questi passaggi non sono contratti e sono brutti ma non
      //possiamo contrarre tutto perché i broswers danno errore
      if (currentLine.length > width) {
        //niente a capo se il n. di caratteri é perfetto
        //non posso chiamare il contatore di nuovo c per ovvi motivi
        for (var c1 = 0; c1 < Math.floor(currentLine.length / width); c1++) {
          //usiamo floor perché sopra a 0.5 il round andrebbe a +1 e metterebbe
          //la roba alla fine della stringa dato che non é ancora pienamente maggiore
          //ma solo sopra a x + 1/2
          //usiamo width*(c+1) perché se no rimetteremmo un br sempre a width
          currentLine = currentLine.splice(width * (c1+1), 0, "-<br>-");
        }
        readyText += currentLine;
      } else {
        //la linea va aggiunta anche se non modificata
        readyText += currentLine;
      }
    }
    tmp.innerHTML = readyText;
  }
  $("#addPic").on("change"/*quando un file viene selezionato*/, function(){
    if ($("#addPic").val() !== '') {
      var image = document.getElementById("addPic").files[0];
      var image_name = image.name;
      var image_extension = image_name.split('.').pop().toLowerCase();
      if (image_name.split('.').length > 2) {
        alert("Formato non supportato! (Mantenere solo l'estensione originale)");
      } else {
        if (jQuery.inArray(image_extension, ["gif", "png", "jpg", "jpeg"]) == -1) {
          alert("Formato non supportato!");
        } else {
          var image_size = image.size;
          if (image_size > 22000000) {
            alert("La dimensione massima per un'immagine é di 22MB!");
          } else {
            var data = new FormData();
            data.append("uploadImage", image);
            data.append("noteId", localStorage.getItem("noteId"));
            $.ajax({
              url:"uploadImg.php",
              method:"POST",
              data:data,
              contentType:false,
              cahe:false,
              processData:false,
              beforeSend:function(){
                $("#warn").html("<progress id='imageUploadProgress'></progress>");
                $("#warn").attr("style", "background-color: white;");
                $("#warn").show();
                localStorage.setItem("uploadStatus", "time_wait");
              },
              xhr:function(){
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(event) {
                  if (localStorage.getItem("uploadStatus") !== "done") {
                    document.getElementById("imageUploadProgress").value = (event.loaded/event.total);
                  }
                }, false);
                xhr.addEventListener("load", function(event) {
                  localStorage.setItem("uploadStatus", "done");
                }, false);
                return xhr;
              },
              success:function(response){
                response = JSON.parse(response);
                if (response["status"] !== "success") {
                  error(response["status"]);
                  $("#addPic").val(""); //per svuotare il contenuto: issue #22
                } else {
                  $("#pics").append("<div class='removeImageContainer' id='" + response["id"] + "'>" + response["img_tag"] + "</div>");
                  $("#warn").show();
                  $("#warn").attr("style", "background-color: lightblue;");
                  $("#warn").html("Immagine aggiunta!");
                  $("#addPic").val(""); //per svuotare il contenuto: issue #22
                  setTimeout(function(){
                    $("#warn").attr("style", "background-color: red;");
                    $("#warn").hide();
                  }, 5000);
                }
              }
            });
          }
        }
      }
    }
  });
  setInterval(function(){checkForNewComments();}, 10000);
});
//rifacciamo la procedura di sopra ogni volta che la dimesione del broswer é modificata
var done = true;
$(window).resize(function(){
  if ($(window).width() < 730) {
    error("RESMINR");
  }
  if (done) {
    done = false;
    // 94/1024=x/width: in 1024px di grandezza ci stanno 94 chars,
    //usiamo questa proporzione per calcolare dove mettere i <br/>
    width = Math.ceil(($(window).width() * 0.8) * 94 / 1024); //prendiamo l'80% poi proporzione
    var comments = document.getElementsByClassName("revwText");
    for (var i = 0; i < comments.length; i++) {
      var readyText = "";
      tmp = comments[i];
      text = tmp.innerHTML;
      //eliminiamo tutte le nostre aggiunte precedenti
      text = text.replace(/-<br>-/g, "");// \/ = / senza uscire dal container della g
      lines = text.split("<br>");
      //eliminiamo tutte le nostre aggiunte precedenti (da php in questo caso)
      //prendo le righe del commento in un array
      for (var c = 0; c < (lines.length - 1 /*non serve nell'ultima*/); c++) {
        lines[c] = lines[c] + "<br>";
      }
      //So che questi passaggi non sono contratti e sono brutti ma non
      //possiamo contrarre tutto perché i broswers danno errore
      for (var c = 0; c < lines.length; c++) {
        currentLine = lines[c];
        //So che questi passaggi non sono contratti e sono brutti ma non
        //possiamo contrarre tutto perché i broswers danno errore
        if (currentLine.length > width) {
          //niente a capo se il n. di caratteri é perfetto
          //non posso chiamare il contatore di nuovo c per ovvi motivi
          for (var c1 = 0; c1 < Math.floor(currentLine.length / width); c1++) {
            //usiamo floor perché sopra a 0.5 il round andrebbe a +1 e metterebbe
            //la roba alla fine della stringa dato che non é ancora pienamente maggiore
            //ma solo sopra a x + 1/2
            //usiamo width*(c+1) perché se no rimetteremmo un br sempre a width
            currentLine = currentLine.splice(width * (c1+1), 0, "-<br>-");
          }
          readyText += currentLine;
        } else {
          //la linea va aggiunta anche se non modificata
          readyText += currentLine;
        }
      }
      tmp.innerHTML = readyText;
    }
    done = true;
  }
});
