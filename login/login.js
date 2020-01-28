var errThrown = false;
function submitform() {
    var username = $("#Username").val();
    var password = $("#Password").val();
    var ajaxurl = '../php/read.php',
    data =  {'Username': username,
             'Password' : password};
    $.post(ajaxurl, data, function (response) {
    if (response == "passed") {
      window.location.href = "../";
    } else {
      errore(response);
    }
  });
}
function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}
function testInput() {
  var usr = $("#Username").val();
  var pswd = $("#Password").val();

  if(usr == null || pswd == null|| usr == undefined || pswd == undefined || usr == "" || pswd == "" || usr.length > 30 || pswd.length > 30 || usr.includes("'") || usr.includes(")")) {
    if (errThrown == false) {
      $("#localWarn").html("Inserire dati validi!");
      errThrown = true;
    }
  } else if (hasWhiteSpace(usr) == false && hasWhiteSpace(pswd) == false) {
    submitform();
  } else {
    if (errThrown == false) {
      $("#localWarn").html("Inserire dati validi!");
      errThrown = true;
    }
  }
}
function errore(err) {
  switch (err) {
    case "credenziali":
      $("#localWarn").html("Username o password non corretti!");
    break;
    case "nonAN":
      $("#localWarn").html("Inserire dati validi (senza caratteri speciali)!");
    break;
    case "internalError":
      $("#localWarn").html("Errore interno");
    break;
    case "bannato":
      window.location.href = "../ban";
    break;
    default:
      $("#localWarn").html("Errore interno codice sconosciuto (se vedi questo messaggio riferiscilo agli amministratori)");
    break;
  }
}
$(document).ready( function() {
  document.getElementById("Password").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      testInput();
    }
  });
  document.getElementById("Username").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      testInput();
    }
  });
});
