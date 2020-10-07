var veiculo = null;
var cliente = null;
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadVeiculo').click(function(e){
        veiculo = new Object();
		cliente = new Object();
		
		cliente.id = clienteID;
		veiculo.cliente = cliente;
        veiculo.marca = $("#marca").val();
        veiculo.modelo = $("#modelo").val();
        veiculo.ano = $("#ano").val();
        veiculo.placa = $("#placa").val();

        var cfg = {
            url: "rest/veiculoRest/addVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculo cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O Veiculo ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo Veiculo!");
                    exibirMessagem(resp, 2);
                };              
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
    
});