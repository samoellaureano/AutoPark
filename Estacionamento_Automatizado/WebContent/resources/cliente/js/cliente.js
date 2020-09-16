$(document).ready(function(){

   $("#menu").load("menu.html");    
      
   busca=function(){
      var cfg = {
          url: "../rest/daschboardRest/buscaDaschboard",
          success: function (daschboard) {
               visualizar(Daschboard);
          },
          error: function (errJson) {
              resp = ("Erro ao cadastrar um novo Veiculo!");
              exibirMessagem(resp, 2);
          }
      };
      autoPark.ajax.post(cfg);
  };
      visualizar=function(daschboard){

            if (daschboard != undefined) {
               if (daschboard.length > 0) {
               
                  $("#dataCheckin").text(daschboard.data);
                  $("#horaCheckin").text(daschboard.hora);
                  $("#tempoDecorrido").text(daschboard.tempDecorrido);               
                  $("#valorCredito").text(daschboard.valorTotal);
               };                 
            };  
      };  
});