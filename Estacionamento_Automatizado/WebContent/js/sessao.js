var dadosSessao = new Object();
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "../../buscaDadosSessao",
    dataType: "JSON",
    success: function (sessao) {
      dadosSessao = sessao;
    },
    error: function () {
    }
  });
});