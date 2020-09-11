function exibirMessagem(msg, tipo) {
  var msgDiv = $("#msgLogin");

  switch (tipo) {
      case 1:
          $("#msgLogin").css("background-color", "#008040");
          tipo = "<span class='glyphicon glyphicon-ok msg-icon'></span>";
          break;
      case 2:
          $("#msgLogin").css("background-color", "#b4004e");
          tipo = "<span class='glyphicon glyphicon-remove msg-icon'></span>";
          break;
      default:
          tipo = "";
          break;
  }

  msgDiv.html(tipo + msg);

  $('#msgLogin').slideDown(300, function(){
  }).fadeIn({
      duration: 300,
      queue: true
  });
  // Após 3 segundos remover a classe
  setTimeout(function () {
      $('#msgLogin').slideUp(300, function(){
      }).fadeOut({
          duration: 300,
          queue: false
      });       
  }, 1500);
}