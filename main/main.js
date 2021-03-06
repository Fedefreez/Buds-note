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
      $("#warn").html("Devi eseguire il login per scrivere una nota!");
      break;
    case "NOTEW":
      $("#warn").html("Errore nella scrittura della nota, se vedi questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "NOTEWYNV":
      $("#warn").html("Anno non valido! Codice: " + err);
      break;
    case "NOTEDNA":
      $("#warn").html("Non sei autorizzato a cancellare le note, questo incidente é stato segnalato");
      break;
    case "NOTEDE":
      $("#warn").html("C'é stato un errore nella rimozione della nota, controlla il log delgi erroi.");
      break;
    case "NOTESC":
      $("#warn").html("Non si possono usare caratteri speciali in una nota! (. e / non supportati)");
      break;
    case "NOTESYNV":
      $("#warn").html("Anno della ricerca non valido! Codice: " + err);
      break;
    case "NOTEDNF":
      $("#warn").html("Nota non trovata!");
      break;
    case "NOTEUNV":
      $("#warn").html("Testo della nota non valido");
      break;
    case "NOTEUNA":
      $("#warn").html("Non sei autorizzato a modificare questa nota, l'incidendte é stato segnalato");
      break;
    case "NOTEUNE":
      $("#warn").html("La nota che volevi aggiornare non é stata trovata, copia le modifiche e prova a ricaricare la pagina. Se il problema persiste contatta gli amministratori.");
      break;
    case "FIREFOX":
      $("#warn").html("A causa di errori nel broswer, alcuni elementi del sito potrebbero non funzionare correttamente in Firefox (consigliamo Chrome o Edge). Vedi: https://support.mozilla.org/en-US/questions/1191898 <button class='mozErrorDeactivation' onclick='mozShown()'>Ok</button>");
      break;
    case "NOTEWAE":
      $("#warn").html("Nota giá esistente");
      break;
    case "IEAG":
      $("#warn").html("Errore nel retrieve di acc**** se vedi questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "USERANV":
      $("#warn").html("Azione non valida!" + " Codice: " + err);
      break;
    case "USERNV":
      $("#warn").html("Parametro per l'azione sull'utente non valido! (Attenzione ai caratteri speciali)" + " Codice: " + err);
      break;
    case "USERNL":
      $("#warn").html("Prima devi eseguire il login!" + " Codice: " + err);
      break;
    case "USERSNV":
    $("#warn").html("Parametro per ricerca dell'utente non valido! (Attenzione ai caratteri speciali)" + " Codice: " + err);
      break;
    case "USERSIE":
      $("#warn").html("Abbiamo riscontrato un errore interno nella ricerca dell'utente, riferisci questo messaggio agli amministratori." + " Codice: " + err);
      break;
    case "IMGUAE":
      //finché non si potranno modificare le immagini relative alla nota, questo errore non dovrebbe apparire
      $("#warn").html("Hai giá caricato un'immagine relativa alla nota con lo stesso nome!" + " Codice: " + err);
      break;
    case "IMGUIE":
      $("#warn").html("Abbiamo riscontrato un errore interno nel caricamento dell'immagine! (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUNL":
      $("#warn").html("Prima devi eseguire il login!" + " Codice: " + err);
      break;
    case "IMGUUE":
      $("#warn").html("Errore sconosciuto nel caricamento dell'immagine! <bold>Riferisci questo messaggio agli amministratori</bold> (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUVNV":
      $("#warn").html("Valori non validi per il caricamento dell'immagine! (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUFNS":
      $("#warn").html("Questo tipo di immagine non é supportato! (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUFNI":
      $("#warn").html("Il file che stai cercando di caricare non é un'immagine! (Tuttavia la nota é stata pubblicata senza immagine)" + "Codice: " + err);
      break;
    case "IMGUFTB":
      $("#warn").html("La dimensione massima per un'immagine é di 22MB! (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUMIE":
      $("#warn").html("C'é stato un errore nel caricamento dell'immagine! (Tuttavia la nota é stata pubblicata senza immagine)" + " Codice: " + err);
      break;
    case "IMGUUIE":
      $("#warn").html("Errore imprevisto nel caricamento dell'immagine! (Tuttavia la nota é stata pubblicata senza immagine) <bold>Riferisci questo messaggio agli amministratori</bold>" + " Codice: " + err);
      break;
    case "IMGUNEN":
      $("#warn").html("La nota a cui stai cercando di allegare l'immagine non esiste!" + " Codice: " + err);
      break;
    default:
      $("#warn").html("Abbiamo riscontrato un errore, se stai vedendo questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
    break;
  }
  setTimeout(function(){$("#warn").hide();}, 10000);
}
function cerca() {
  $("#risultati").empty();
  var arg = $("#search").val();
  var ajaxurl = "../php/research.php";
  if ($("#filtroMateria").val() == "" && $("#filtroIndirizzo").val() == "" && $("#filtroUtente").val() == "" && $("#filtroAnno").val() == "" &&$("#filtroDatefrom").val() == "" &&$("#filtroDateto").val() == "" &&$("#filtroOrdine").val() == "" && $("#filtroOrderBy").val() == "") {
    var filtro = false;
  } else {
    var filtro = true;
  }
  if (arg == "" && !filtro) {
    $("#risultati").html("Inserisci una ricerca valida!");
    type = null;
  } else if ($("#deptNum").prop("checked") == true) {
    type = "deptNum";
    var l = "dept";
  } else if ($("#deptName").prop("checked") == true) {
    type = "deptName";
    var l = "dept";
  } else if ($("#subjName").prop("checked") == true) {
    type = "subjName";
    var l = "subj";
  } else if ($("#subjNum").prop("checked") == true) {
    type = "subjNum";
    var l = "subj";
  } else if ($("#noteTtl").prop("checked") == true) {
    type = "noteTtl";
  } else {
    type = "note";
  }
  if (type != null && arg != null && type != "note") {
    data =  {'phrase': arg,
    'type': type};
    $.post(ajaxurl, data, function (response) {
      $("#risultati").empty();
      var response = JSON.parse(response);
      if (response == "Nrt") {
        $("#risultati").html("Nessun risultato trovato")
      } else if (response == "IES" || response == "IE") {
        error(reponse);
      } else {
        $("#scriviNotaBtn").hide();
        for (i = 0; i < response[1].length; i++) {
          response = response[1][i].replace(/sc-a/g, "&apos;");
          response = response.replace(/sc-q/g, "&quot;");
          $("#risultati").append(response + "<br/>");
        }
      }
      hideSearch();
    });
  } else if (type == "note"){
    var title = arg;
    title = title.replace(/"/g, "sc-q");
    title = title.replace(/'/g, "sc-a");
    var user = $("#filtroUtente").val();
    var subj = $("#filtroMateria").val();
    var years = [];
    for (var i = 0; i < 5; i++) {
      if ($("#inputyear_" + (i + 1)).prop("checked")) {
        years[i] = true;
      } else {
        years[i] = false;
      }
    }
    var dept = $("#filtroIndirizzo").val();
    var teacher = user;
    var datefrom = $("#filtroDatefrom").val();
    var dateto = $("#filtroDateto").val();
    var orderby = $("#filtroOrderBy").val();
    var order = $("#filtroOrdine").val();

    data = {
      "type": type,
      "title": title,
      "user": user,
      "subj": subj,
      "years": years,
      "dept": dept,
      "teacher": teacher,
      "datefrom": datefrom,
      "dateto": dateto,
      "orderby": orderby,
      "order": order
    }
    $.post(ajaxurl, data, function (response) {
      $("#risultati").empty();
      var response = JSON.parse(response);
      if (response == "Nrt") {
        $("#risultati").html("Nessun risultato trovato");
      } else if (response == "IES" || response == "IE" || response == "NOTESYNV") {
        error(response);
      } else {
        $("#scriviNotaBtn").hide();
        for (i = 0; i < response.length; i++) {
          $("#risultati").append("<a href='php/viewNote.php?noteId=" + response[i]["id"] + "'>" + response[i]["title"] + " Autore: " + response[i]["user"] + " Data: " + response[i]["date"] + "</a><br/>");
        }
      }
      hideSearch();
    });
  } else {
    $("#risultati").html("Parametri di ricerca non validi");
  }
  arg = null;
  type = null;
}
function hideSearch() {
  document.getElementById("Search").style.display = "none";
  document.getElementById("SearchDiv").style.display = "none";
}
function getSubjs() {
  hideSearch();
  var ajaxurl = "../php/research.php";
  var type = "subjs";
  arg = "";
  data =  {'phrase': arg,
    'type': type};
    $.post(ajaxurl, data, function (response) {
      $("#risultati").empty();
      var response = JSON.parse(response);
      if (response == "Nrt") {
        $("#risultati").html("Nessun risultato trovato");
      }  else if (response == "IES" || response == "IE") {
        error(response);
      } else {
        for (i = 0; i < response[1].length; i++) {
          $("#scriviNotaBtn").hide();
          $("#risultati").append("<a href='subj/" + i + "/'>" + response[1][i] + "</a><br/>");
        }
      }
      });
}
function getDepts() {
  hideSearch();
  var ajaxurl = "../php/research.php";
  var type = "depts";
  arg = "";
  data =  {'phrase': arg,
    'type': type};
    $.post(ajaxurl, data, function (response) {
      $("#risultati").empty();
      var response = JSON.parse(response);
      if (response == "Nrt") {
        $("#risultati").html("Nessun risultato trovato");
      } else if (response == "IES" || response == "IE") {
        error(response);
      } else {
        for (i = 0; i < response[1].length; i++) {
          $("#scriviNotaBtn").hide();
          $("#risultati").append("<a href='dept/" + i + "/'>" + response[1][i] + "</a><br/>");
        }
      }
    });
}
function getNotes() {
  hideSearch();
  var ajaxurl = "../php/research.php";
  var type = "notes";
  arg = "";
  data =  {'phrase': arg,
    'type': type};
    $.post(ajaxurl, data, function (response) {
      var response = JSON.parse(response);
      $("#risultati").empty();
      if (response == "Nrt") {
        $("#risultati").html("Nessun risultato trovato");
      } else if (response == "IES" || response == "IE") {
        error(response);
      } else {
        for (i = 0; i < response.length; i++) {
          $("#scriviNotaBtn").hide();
          $("#risultati").append('<a href="php/viewNote.php?noteId=' + response[i]["id"] + '">' + response[i]["title"] + " Autore: " + response[i]["user"] + " Data: " + response[i]["date"] + "</a><br/>");
        }
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
         $("#warn").hide()
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
          $("#warn").hide()
        }, 5000);
      } else {
        error(response);
      }
    });
  }
}
function submitNote() {
  $(".scriviNota").hide();
  $("#scriviNotaBtn").show();
  var ajaxurl = "../php/noteManager.php";
  var title = $("#writeNoteTitle").val();
  var subj = $("#writeNoteSubj").val();
  var dept = $("#writeNoteDept").val();
  var year = parseInt($("#writeNoteYear").val());
  var content = $("#writeNoteContent").val();
  title = title.replace(/'/g, "sc-a");
  title = title.replace(/"/g, "sc-q");
  data = {
    'title': title,
    'content': content,
    'subj': subj,
    'dept': dept,
    'year': year,
    'type': 'write',
  }
  $.post(ajaxurl, data, function(response) {
    response = JSON.parse(response);
    if (response["status"] == "done") {
      localStorage.setItem("noteId", response["id"]);
      if ($("#uploadImage").val() !== '') {
        uploadImage();
      } else {
        $("#warn").show();
        $("#warn").attr("style", "background-color: lightblue;");
        $("#warn").html("Nota pubblicata!");
        setTimeout(function(){
          $("#warn").attr("style", "background-color: red;");
          $("#warn").hide();
        }, 3000);
      }
    } else {
      error(response["status"]);
    }
  });
}
function mostraSpazioNote() {
  hideSearch();
  $("#risultati").empty();
  $(".scriviNota").show();
  $(".homePage").hide();
  $("#scriviNotaBtn").hide();
}
function searchUser() {
  closeSearch();
  var phrase = $("#searchUserInput").val();
  if (phrase != "") {
    var ajaxurl = "../php/userManager.php";
    data = {
      'phrase' : phrase,
      'type' : "search"
    }
    $.post(ajaxurl, data, function(response) {
      response = JSON.parse(response);
      if (response["status"] == "success") {
        for (var i = 0; i < response["results"].length; i++) {
          $(".risultati").html("<a href='php/viewUser.php?username=" + response["results"][i]["username"] + "'>" + response["results"][i]["username"] + "</a>");
        }
      } else if (response["status"] === "nrt") {
        $(".risultati").html("Nessun risultato trovato.");
      } else {
        error(response["status"]);
      }
    });
  } else {
    $("#warn").show();
    $("#warn").html("Inserire una chiave di ricerca valida!");
    setTimeout(function(){
      $("#warn").hide();
    }, 5000);
  }
}
function mozShown() {
  localStorage.setItem("mozError", false);
  $("#warn").hide();
}
$(document).ready(function(){
  document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      cerca();
    }
  });
  document.getElementById("searchUserInput").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchUser();
    }
  });
  //se uno visualizza una nota poi va nella home page rimarrebbe il titolo nella voce title
  //quindi puliamo
  localStorage.removeItem("title");
});
function uploadImage() {
  if ($("#uploadImage").val() !== '') {
    var image = document.getElementById("uploadImage").files[0];
    var image_name = image.name;
    var image_extension = image_name.split('.').pop().toLowerCase();
    if (image_name.split('.').length > 2) {
      alert("Formato immagine non supportato! (Mantenere solo l'estensione originale)");
    } else {
      if (jQuery.inArray(image_extension, ["gif", "png", "jpg", "jpeg"]) == -1) {
        alert("Fomrato non supportato!");
      } else {
        var image_size = image.size;
        if (image_size > 22000000) {
          alert("La dimensione massima per un'immagine é di 22MB!");
        } else {
          var data = new FormData();
          data.append("uploadImage", image);
          data.append("noteId", localStorage.getItem("noteId"));
          $.ajax({
            url:"php/uploadImg.php",
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
                $("#warn").attr("style", "background-color: lightblue;");
                $("#warn").html("Nota pubblicata!");
                setTimeout(function(){
                  $("#warn").attr("style", "background-color: red;");
                  $("#warn").hide();
                }, 5000);
              }, false);
              return xhr;
            },
            success:function(response){
              response = JSON.parse(response);
              if (response["status"] !== "success") {
                localStorage.setItem("uploadStatus", "success");
                error(response["status"]);
              } else {
                localStorage.setItem("uploadStatus", "failure");
              }
            }
          });
          // var ajax = new XMLHttpRequest();
          // ajax.upload.addEventListener("progress", progressHandler, false);
          // ajax.addEventListener("load", completeHandler, false);
          // ajax.addEventListener("error", errorHandler, false);
          // ajax.addEventListener("abort", abortHandler, false);
          // ajax.open("POST", "php/uploadImg.php");
          // ajax.send(data);
        }
      }
    }
  }
}

// function progressHandler(event) {
//   $("#loaded_n_total").html("Caricati " + event.loaded + " di " + event.total + " bytes");
//   var pct = (event.loaded / event.total) * 100;
//   $("#progressBar").value = Math.round(pct);
//   $("#status").html(Math.round(pct) + " caricato");
//   console.log("updt " + event.loaded + " | " + event.total);
// }
// function completeHandler(event) {
//   $("#status").html(event.target.responseText);
//   $("#progressBar").value = 0;
//   console.log("Success");
// }
// function errorHandler(event) {
//   $("#status").html("Upload failed");
//   localStorage.setItem("uploadStatus", false);
// }
// function abortHandler(event) {
//   $("#status").html("Operazione annullata.");
// }
$(document).ready(function() {
  $("#uploadImage").on("change"/*quando un file viene selezionato*/, function(){
    if ($("#uploadImage").val() !== '') {
      var image = document.getElementById("uploadImage").files[0];
      $("#warn").attr("style", "background-color: lightblue;");
      $("#warn").html("Immagine " + image.name + " selezionata!");
      setTimeout(function(){
        $("#warn").attr("style", "background-color: red;");
        $("#warn").hide();
      }, 5000);
    }
  });
});
