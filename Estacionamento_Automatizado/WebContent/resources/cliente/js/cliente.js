var Cliente = new Object();

$(document).ready(function(){

   $("#menu").load("menu.html");    
    Cliente.pagamento.capturarInf=function(){
        
        var pagamento = new Object();
           
        pagamento.catao = $("#cartao").val();
        pagamento.nomeTitular = $("#NomeTitular").val();
        pagamento.validade = $("#validade").val();
        pagamento.codigoVerificacao = $("#codigoVerificacao").val();

        Cliente.pagamento.enviar(pagamento);

    };// fim da função

    Cliente.pagamento.enviar=function(pagamento){
    

        
    
    };// fim da função

    Cliente.pagamento.view=function(pagamento){
       




    };//fim da função

});