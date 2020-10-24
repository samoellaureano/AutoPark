var pagamento = new Object();
var cliente = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");
   
    $('#abilitarEdicao').click(function(e){
        $('input').prop('disabled', false);
    });

    $('#cadPagamento').click(function(e){
	
		cliente.id = clienteID;
		pagamento.cliente = cliente;
       
        pagamento.numCartao = $("#cartao").val()
        pagamento.titular = $("#NomeTitular").val()
        pagamento.validade = $("#validade").val()
        pagamento.codVerificacao = $("#codigoVerificacao").val()
        
        var cfg = {
            url: "../../rest/pagamentoRest/addPagamento",
            data: JSON.stringify(pagamento),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Pagamento cadastrado com sucesso!");
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

    
    $('#buscaPagamento').click(function(){    
       
        var cfg = {
            url: "../rest/pagamentoRest/viewPagamentos",
            data: JSON.stringify(pagamento),
            success: function (pagamento) {
                visualizarFormaDPagamento(pagamento);
            },  
            error: function (errJson) {
                resp = ("Erro ao buscar os dados!");
                exibirMessagem(resp, 2);
            }
        };

        autoPark.ajax.post(cfg);
    });// fim do buscar

    visualizarFormaDPagamento=function(pagamento){

        if( pagamento!=null && pagamento!=undefined){

            $("#cartao").val(pagamento.numCartao);
            $("#NomeTitular").val(pagamento.titular);
            $("#validade").val(pagamento.validade);
            $("#codigoVerificacao").text(pagamento.codVerificacao);
            $("#formCadPagamento").css('display','none');
        };
    };  
// fim do visualizar
   // $("#formCadPagamento").css('display','none');
   // $('input'). prop('disabled', true);
 //   buscar();
   
});

    