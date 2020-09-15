var pagamento = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadPagamento').click(function(e){
       
        pagamento.numCartao = $("#cartao").val()
        pagamento.titular = $("#NomeTitular").val()
        pagamento.validade = $("#validade").val()
        pagamento.codVerificacao = $("#codigoVerificacao").val()
        
        var cfg = {
            url: "../rest/pagamentosRest/addPagamentos",
            data: JSON.stringify(pagamento),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("pagamentos cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O pagamento ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo pagamento!");
                    exibirMessagem(resp, 2);
                }             
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Pagamento!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });


    buscar = function(){    
       
        var cfg = {
            url: "../rest/pagamentosRest/viewPagamentos",
            data: JSON.stringify(pagamento),
            success: function (pagamento) {
               visualizar(pagamento);
            },  
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Pagamento!");
                exibirMessagem(resp, 2);
            }
        };

        autoPark.ajax.post(cfg);
    };// fim do buscar

    visualizar=function(pagamento){

        if( pagamento!=null && pagamento.length>0){

            $("#cartao").val(pagamento.numCartao);
            $("#NomeTitular").val(pagamento.titular);
            $("#validade").val(pagamento.validade);
            $("#codigoVerificacao").val(pagamento.codVerificacao);
        };
    };  // fim do visualizar

    buscar();
});

