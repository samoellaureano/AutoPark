$(document).ready(function () {


   $("#menu").load("menu.html");

   busca = function () {
      var cfg = {
         url: "../../rest/checkinRest/buscaCheckin/" + dadosSessao.id,
         success: function (checkin) {
            visualizar(checkin);
         },
         error: function (errJson) {
            resp = ("Erro ao buscar os dados!");
            exibirMessagem(resp, 2);
         }
      };
      autoPark.ajax.post(cfg);
   };
   visualizar = function (checkin) {
      if(checkin != undefined){
         var d = (new Date(checkin.dataHora));
         const now = new Date(); // Data de hoje
         const past = new Date(checkin.dataHora); // Outra data no passado
         const diff = Math.abs(now.getTime() - past.getTime());
         var diferenca = new Date(diff);
   
         $("#dataCheckin").text(d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear());
         $("#horaCheckin").text(d.getHours() + ":" + d.getMinutes());
         $("#tempoDecorrido").text((diferenca.getUTCHours()+24*diferenca.getUTCDate())+"h "+diferenca.getUTCMinutes()+"m");
      }else{
         $("#dataCheckin").text("Nenhum registro");
         $("#horaCheckin").text("Nenhum registro");
         $("#tempoDecorrido").text("Nenhum registro");
      }
   };

   buscaSaldo = function () {
      var cfg = {
         url: "../../rest/creditoRest/buscaCredito/" + dadosSessao.id,
         success: function (credito) {
            visualizarSaldo(credito);
         },
         error: function (errJson) {
            resp = ("Erro ao buscar os dados!");
            exibirMessagem(resp, 2);
         }
      };
      autoPark.ajax.post(cfg);
   };

   visualizarSaldo = function (credito) {
      if(credito != undefined){
         $("#valorCredito").text(credito.saldo);
      }else{
         $("#valorCredito").text("Nenhum registro");
      }
   };

   setTimeout(function () {
      busca();
      buscaSaldo();
   }, 500);
});