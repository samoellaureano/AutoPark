var veiculo = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadVeiculo').click(function(e){
        var arrayCadFun = [];
        var $inputs = $('#formCadVeiculo :input,select');
        // percorre os inputs
        $inputs.each(function() {
            arrayCadFun.push($(this).val());
        });
        veiculo.marca = arrayCadFun[0];
        veiculo.modelo = arrayCadFun[1];
        veiculo.ano = arrayCadFun[2];
        veiculo.placa1 = arrayCadFun[3];

        var cfg = {
            url: "../rest/veiculoRest/addVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Pagamento cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O Pagamento ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo Pagamento!");
                    exibirMessagem(resp, 2);
                }
                
                // funcionario.buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Pagamento!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
});

