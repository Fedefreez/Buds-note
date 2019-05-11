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
  $("greet").empty();
}
function error(err) {
  switch (err) {
    case "sessione":
      $("#warn").show();
      $("#warn").html("Errore nel logout, se hai visto questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
    break;
    case "IES":
      $("#warn").show();
      $("#warn").html("Abbiamo riscontrato un errore nella ricerca, se stai vedendo questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
      break;
    case "man":
      $("#warn").show();
      $("#warn").html("Il server é in manutenzione, certe funzionalità potrebbero essere bloccate.");
      break;
    case "IEMAN":
      $("#warn").show();
      $("#warn").html("Errore nell'impostazione della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "IEMANS":
      $("#warn").show();
      $("#warn").html("Errore nell'impostazione della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "IEMANR":
      $("#warn").show();
      $("#warn").html("Errore nella lettura dello stato della manutenzione, controlla il log degli errori." + " Codice: " + err);
      break;
    case "NOMAN":
      $("#warn").show();
      $("#warn").html("Non sei autorizzato a modificare lo stato della manutenzione. Questo incidente é stato segnalato.");
      break;
    case "MANAA":
      $("#warn").show();
      $("#warn").html("Manutenzione giá attiva!");
      break;
    case "MANAT":
      $("#warn").show();
      $("#warn").html("Manutenzione giá terminata!");
      break;
    default:
      $("#warn").show();
      $("#warn").html("Abbiamo riscontrato un errore, se stai vedendo questo messaggio riferiscilo agli amministratori." + " Codice: " + err);
    break;
  }
  setTimeout(function(){$("#warn").hide();}, 10000);
}
function cerca() {
  hideSearch();
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
      }
      for (i = 0; i < response[1].length; i++) {
        $("#risultati").append(response[1][i] + "<br/>");
      }
    });
  } else if (type == "note"){
    var title = arg;
    var user = $("#filtroUtente").val();
    var subj = $("#filtroMateria").val();
    var year = $("#filtroAnno").val();
    var dept = $("#filtroIndirizzo").val();
    var teacher = $("#Insegnante").val();
    var datefrom = $("#filtroDatefrom").val();
    var dateto = $("#filtroDateto").val();
    var orderby = $("#filtroOrderBy").val();
    var order = $("#filtroOrdine").val();
    data = {
      "type": type,
      "title": title,
      "user": user,
      "subj": subj,
      "year": year,
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
      } else if (response == "IES" || response == "IE") {
        error(response);
      } else {
        for (i = 0; i < response.length; i++) {
          $("#risultati").append(response[i]["title"] + "<br/>");
        }
      }
    });
  } else {
    $("#risultati").html("Parametri di ricerca non validi");
  }
  arg = null;
  type = null;
}
function hideSearch() {
  $("greet").hide();
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
          $("#risultati").append(response[i]["title"] + "<br/>");
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
$(document).ready(function(){
  document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     cerca();
    }
  });
});
