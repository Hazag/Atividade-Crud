// This is a JavaScript file
$(document).on("click", "#btnEnviar", function() {
    var parametros={ 
        "nome": $("#txtNome").val(),
        "cpf": $("#txtCpf").val()
    };

    $.ajax({
      type:"post",
      url:"https://crudmobile3i2-hazag.c9users.io/cadastro2.php",
      data: parametros,
      success: function(data){
        navigator.notification.alert(data);
        $("#txtNome").val(""),
        $("#txtCpf").val("")
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

function preenchepessoas(){
      $.ajax({
      type:"post",
      url:"https://crudmobile3i2-hazag.c9users.io/listarPessoas.php",
      dataType: "json",
      success: function(data){
        var itemlista = "";
        $.each(data.pessoas, function(i, dados){
          itemlista += "<option value='"+dados.codigo+ "'>"+dados.nome+"</option>>";
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
      url:"https://crudmobile3i2-hazag.c9users.io/listarumaPessoas.php",
      data:"codigo="+codigoSelecion,
      dataType: "json",
      success: function(data){
       $.each(data.pessoas, function(i, data){

       $("#codigo").val(data.codigo);
       $("#txtNome").val(data.nome);
       $("#txtCpf").val(data.cpf);

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
      url:"https://crudmobile3i2-hazag.c9users.io/deletar1.php",
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
      "nome": $("#txtNome").val(),
      "cpf": $("#txtCpf").val()
    };

    $.ajax({
      type:"post",
      url:"https://crudmobile3i2-hazag.c9users.io/atualizar.php",
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
  $("#txtNome").val("");
  $("#txtCpf").val("");
});

function desabilita(){
        $('#txtNome').prop('readonly',true);
        $('#txtCpf').prop('readonly',true);

}
  function habilita(){
        $('#txtNome').prop('readonly',false);
        $('#txtCpf').prop('readonly',false);

  }

