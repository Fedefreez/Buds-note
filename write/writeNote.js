function selectSubj(which) {
  $("#Subject").html($(which).html());
}

function selectDept(which) {
  $("#Dept").html($(which).html());
}

function submitNote() {
  var ajaxurl = "../php/noteManager.php";
  var title = $("#Title").val();
  var subj = $("#Subject").html();
  var dept = $("#Dept").html();
  for (var i = 1; i <= 5; i++) {
    if ($("#year_"+i).prop("checked")) {
      var year = i;
      break;
    }
  }
  var content = $("#Content").val();

  if (title.trim() == "" || content.trim() == "") {
    localError("cntNv");
  } else if (![1, 2, 3, 4, 5].includes(year)) {
    localError("yNv");
  } else if (subj.trim() == "Subject") {
    localError("sNv");
  } else if (dept.trim() == "Department") {
    localError("dNv");
  } else {
    startAnimation();
    data = {
      'title': title,
      'content': content,
      'subj': subj,
      'dept': dept,
      'year': year,
      'type': 'write'
    }
    $.post(ajaxurl, data, function(response) {
      response = JSON.parse(response);
      console.log(response);
      if (response["status"] == "done") {
        localStorage.setItem("noteId", response["id"]);
        if ($("#uploadImage").val() !== '') {
          uploadImage();
        } else {
          setTimeout(function(){
            window.location.href = "https://budsnote.ddns.net/viewNote/?id=" + localStorage.getItem("noteId");
          }, 1000);
        }
      } else {
        error(response["status"]);
        setTimeout(function(){
          $("#animation").hide();
          $(".pageContainer").show();
        }, 3000);
      }
    });
  }
}

function uploadImage() {
  if ($("#uploadImage").val() !== '') {
    var image = document.getElementById("uploadImage").files[0];
    var image_name = image.name;
    var image_extension = image_name.split('.').pop().toLowerCase();
    if (image_name.split('.').length > 2) {
      alert("Formato immagine non supportato! (Mantenere solo l'estensione originale)");
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
            url:"../php/uploadImg.php",
            method:"POST",
            data:data,
            contentType:false,
            cahe:false,
            processData:false,
            beforeSend:function(){
              $("#warn").html("<br/><div class='progress'><div id='imageUploadProgress' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div></div>");
              $("#warn").attr("style", "background-color: white;");
              $("#warn").show();
              localStorage.setItem("uploadStatus", "time_wait");
            },
            xhr:function(){
              var xhr = new window.XMLHttpRequest();
              xhr.upload.addEventListener("progress", function(event) {
                if (localStorage.getItem("uploadStatus") !== "done") {
                  $("#imageUploadProgress").attr("style", "width: " + (event.loaded/event.total*100) + "%");
                }
              }, false);
              xhr.addEventListener("load", function(event) {
                localStorage.setItem("uploadStatus", "done");
                  setTimeout(function(){
                    window.location.href = "https://budsnote.ddns.net/viewNote/?id=" + localStorage.getItem("noteId");
                  }, 1000);
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
        }
      }
    }
  }
}

$(document).ready(function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if (check) {
    localError("mobile");
  }
  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  $("#uploadImage").on("change", function(){
    var image = document.getElementById("uploadImage").files[0];
    var image_name = image.name;
    var image_extension = image_name.split('.').pop().toLowerCase();
    if (image_name.split('.').length > 2) {
      alert("Formato immagine non supportato! (Mantenere solo l'estensione originale)");
    } else {
      if (jQuery.inArray(image_extension, ["gif", "png", "jpg", "jpeg"]) == -1) {
        alert("Formato non supportato!");
      } else {
        if (image.size > 22000000) {
          alert("La dimensione massima per un'immagine é di 22MB!");
        }
      }
    }
  });
});

function startAnimation() {
  $("#animation").html("<span class='back'><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span></span><br/><span id='warn'></span>");
  $("#animation").show();
  $(".pageContainer").hide();
}

function localError(err) {
  $(".localWarn").show();
  switch (err) {
    case "cntNv":
      txt = "Il titolo o il contenuto non possono essere solamente composti da spazi.";
      break;
    case "yNv":
      txt = "Selezionare un anno.";
      break;
    case "dNv":
      txt = "Selezionare un indirizzo.";
      break;
    case "sNv":
      txt = "Selezionare una materia.";
      break;
    case "mobile":
      txt = "La pagina é instabile su broswers per telefoni, ne sconsigliamo l'uso fino alla rimozione di questo avviso.";
      break;
  }
  $("#localWarn").html(txt);
  setTimeout(function(){
    $(".localWarn").hide();
  }, 5000);
}
