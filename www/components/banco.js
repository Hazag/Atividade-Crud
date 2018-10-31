// This is a JavaScript file

 var camearaOptions = {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
        function getImage() {
            navigator.camera.getPicture(uploadPhoto,onError, camearaOptions);
        }

function onError(err){ alert(error); }

$(document).on("click", "#btnCadastrar", function() {
  var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            
            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://192.168.1.4/phonegap/upload/upload.php",
            function (result) {
                console.log(JSON.stringify(result));
            },
            function (error) {
                console.log(JSON.stringify(error));
            }, options);

    var parametros={ 
        "modelo": $("#txtModelo").val(),
        "cor": $("#txtCor").val(),
        "fabricante": $("#txtFabricante").val(),
        "ano": $("#txtAno").val(),
        "valor": $("#txtValor").val(),
        "arquivo": $("#my-file-selector").val()
    };

    $.ajax({
      type:"post",
      url:"https://atividademobilecrud-hazag.c9users.io/cadastro.php",
      data: parametros,
      success: function(data){
        navigator.notification.alert(data);
        $("#txtModelo").val(""),
        $("#txtCor").val(""),
        $("#txtFabricante").val(""),
        $("#txtAno").val(""),
        $("#txtValor").val("")
      },
      error:function(data){
        navigator.notification.alert("erro"+data);
      }

    });
});
$(document).on("click", "#btnLista", function() {

  $(location).attr("href","lista.html");
  });
$(document).on("click", "#btnCadastro", function() {

  $(location).attr("href","cadastro.html");
  });

function preencheveiculos(){
      $.ajax({
      type:"post",
      url:"https://atividademobilecrud-hazag.c9users.io/listarVeiculos.php",
      dataType: "json",
      success: function(data){
        var itemlista = "";
        $.each(data.veiculos, function(i, dados){
          itemlista += "<option value='"+dados.codigo+ "'>"+dados.modelo+"</option>>";
        });
        $("#lista").html(itemlista);
      },
      error:function(data){
        navigator.notification.alert("erro"+data);
      }

    });

}
$(document).on("change", "#lista", function(){
    var codigoSelecion = $("option:selected", ("#lista")).val();

    $.ajax({
      type:"get",
      url:"https://atividademobilecrud-hazag.c9users.io/listarUmVeiculos.php",
      data:"codigo="+codigoSelecion,
      dataType: "json",
      success: function(data){
       $.each(data.veiculos, function(i, data){

       $("#codigo").val(data.codigo);
       $("#txtModelo").val(data.modelo);
       $("#txtCor").val(data.cor);
       $("#txtFabricante").val(data.fabricante);
       $("#txtAno").val(data.ano);
       $("#txtValor").val(data.valor);
       });
      },
      error:function(data){
        navigator.notification.alert("erro"+data);
      }

    });
});


$(document).on("click", "#deletar", function(){
    var codigoSelecion = $("option:selected", ("#lista")).val();

    $.ajax({
      type:"get",
      url:"https://atividademobilecrud-hazag.c9users.io/deletar.php",
      data:"codigo="+codigoSelecion,
      
      success: function(data){
       navigator.notification.alert(data);
       location.reload();

       
      },
      error:function(data){
        navigator.notification.alert("erro"+data);
      }

    });
});










$(document).on("click", "#salvarEdit", function(){
    var parametros={
      "codigo": $("#codigo").val(),
      "modelo": $("#txtModelo").val(),
      "cor": $("#txtCor").val(),
      "fabricante": $("#txtFabricante").val(),
      "ano": $("#txtAno").val(),
      "valor": $("#txtValor").val()
    };

    $.ajax({
      type:"post",
      url:"https://atividademobilecrud-hazag.c9users.io/atualizar.php",
      data: parametros,
      success: function(data){
      navigator.notification.alert(data);
      location.reload();
      },
      error:function(data){
        navigator.notification.alert("erro"+data);
      }

    });
});
$(document).on("click","#editar", function(){
  habilita();
});
$(document).on("click","#cancelar", function(){
  desabilita();
  $("#txtModelo").val("");
  $("#txtCor").val("");
  $("#txtFabricante").val("");
  $("#txtAno").val("");
  $("#txtValor").val("");
});

function desabilita(){
        $('#txtModelo').prop('readonly',true);
        $('#txtCor').prop('readonly',true);
        $('#txtFabricante').prop('readonly',true);
        $('#txtAno').prop('readonly',true);
        $('#txtValor').prop('readonly',true);

}
  function habilita(){
        $('#txtModelo').prop('readonly',false);
        $('#txtCor').prop('readonly',false);
        $('#txtFabricante').prop('readonly',false);
        $('#txtAno').prop('readonly',false);
        $('#txtValor').prop('readonly',false);

  }
