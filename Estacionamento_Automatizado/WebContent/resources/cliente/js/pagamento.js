var veiculo = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadPagamento').click(function(e){
        var arrayCadFun = [];
        var $inputs = $('#formCadPagamento :input');
        // percorre os inputs
        $inputs.each(function() {
            arrayCadFun.push($(this).val());
        });
        veiculo.numCartao = arrayCadFun[0];
        veiculo.titular = arrayCadFun[1];
        veiculo.validade = arrayCadFun[2];
        veiculo.codVerificacao = arrayCadFun[3];

        var cfg = {
            url: "../rest/veiculosRest/addveiculos",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculos cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O Veiculo ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo Veiculo!");
                    exibirMessagem(resp, 2);
                }
                
                // funcionario.buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
});

