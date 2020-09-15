var tabelaPreco = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadTabelaPreco').click(function(e){
        tabelaPreco.valor = $("#valor").val();
        tabelaPreco.tipoVeiculo = $("#tipoVeiculo").val();
        tabelaPreco.estacionamento = $("#estacionamento").val();
        tabelaPreco.tipoCobranca = $("#tipoCobranca").val();

        var cfg = {
            url: "../rest/tabelaPrecoRest/addTabelaPreco",
            data: JSON.stringify(tabelaPreco),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Item cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O item ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo item!");
                    exibirMessagem(resp, 2);
                }
                
                // funcionario.buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo item!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
});

