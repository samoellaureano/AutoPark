var veiculo = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadVeiculo').click(function(e){
   
        veiculo.marca = $("#marca").val();
        veiculo.modelo = $("#modelo").val();
        veiculo.ano = $("#ano").val();
        veiculo.placa1 = $("#placa").val();

        var cfg = {
            url: "../rest/veiculoRest/addVeiculo",
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
                }               
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });


    busca=function(){
        var cfg = {
            url: "../rest/veiculoRest/buscaVeiculo",
            data: JSON.stringify(veiculo),
            success: function (listaVeiculo) {
                 visualizar(listaVeiculo);
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);

        visualizar=function(listaVeiculo){

            var html =" <ul class='itemVeiculo'><input type='radio' name='carro' id='car3' hidden>";

            for (var i = 0; i < listaVeiculo.length; i++) {
               
                
            }




        };




    }
    












    



});
