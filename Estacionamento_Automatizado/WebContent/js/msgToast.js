function exibirMessagem(msg, tipo) {
  var msgDiv = $("#msg");

  switch (tipo) {
      case 1:
        msgDiv.css("background-color", "#008040");
          tipo = "<span class='glyphicon glyphicon-ok msg-icon'></span>";
          break;
      case 2:
        msgDiv.css("background-color", "#b4004e");
          tipo = "<span class='glyphicon glyphicon-remove msg-icon'></span>";
          break;
      default:
          tipo = "";
          break;
  }

  msgDiv.html(tipo + msg);

  msgDiv.slideDown(300, function(){
  }).fadeIn({
      duration: 300,
      queue: true
  });
  // Após 3 segundos remover a classe
   setTimeout(function () {
       msgDiv.slideUp(300, function(){
       }).fadeOut({
           duration: 300,
           queue: false
       });       
   }, 1500);
}