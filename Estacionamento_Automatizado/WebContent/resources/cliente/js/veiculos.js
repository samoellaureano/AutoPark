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
            success: function (listaDeVeiculo) {
                 visualizar(listaDeVeiculo);
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);

        visualizar=function(listaDeVeiculo){

            var veiculoHtml =" <ul class='itemVeiculo'>";

            if (listaDeVeiculo != undefined) {
                if (listaDeVeiculo.length > 0) {
                    for (var i = 0; i < listaDeVeiculo.length; i++){
                        veiculoHtml+="<input type='radio' name='carro' id='car"+i+"' hidden>"
                        +"<label for='car'"+i+"'> "+listaDeVeiculo[i].placa+"</label><li>"
                        +"<label for='editar"+i+"'>Editar</label>"
                        +"<input type='checkbox' name='editar' id='editar'"+i+"' hidden><div>"
                        +"<form action=''><label for='marca"+i+"'>Marca:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idMarca+"' name='marca' id='marca"+i+"' required></select>"
                        +"<label for='modelo"+i+"'>Modelo:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idModelo+"' name='modelo' id='modelo"+i+"' required></select>"
                        +"<label for='ano"+i+"'>Ano:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idAno+"' name='ano' id='ano"+i+"' required></select>"
                        +"<label for='placa"+i+"'>Placa:</label>"
                        +"<input type='text' id='placa"+i+"' value='"+listaDeVeiculo[i].placa+"'>"
                        +"<div><a href=''>Cancelar</a><button onclick='atualizaVeiculo("+i+")' id='editCar"+id+"'>Confirmar</button>"
                        +"</div></form></div></li></ul>";
                    }
                    veiculoHtml+="<a href='' id='carrega-listaFuncionario'>Ver Mais</a>";

                }else {

                    veiculoHtml += "<li style='text-align: center'>Nenhum registro encontrado</li>";
                };
                    $("#ListaDeVeiculosHtml").append(funcionariosHTML + "</ul>");
                };  
            };
        };

        atualizaVeiculo=function(id){
           
            veiculo.marca = $("'#marca"+id+"'").val();
            veiculo.modelo = $("'#modelo"+id+"'").val();
            veiculo.ano = $("'#ano"+id+"'").val();
            veiculo.placa1 = $("'#placa"+id+"'").val();

            var cfg = {
                url: "../rest/veiculoRest/updateVeiculo",
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
        };
});


/*
buscar = function(){
        var valorBusca = $("#buscarFunc").val();
        var cfg = {
            type: "POST",
            url: "../rest/funcionarioRest/buscarFuncionarios/" + valorBusca,
            success: function (listaDeFuncionarios) {
                exibirFuncionarios(listaDeFuncionarios);
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }

    exibirFuncionarios = function(listaDeFuncionarios){
        var funcionariosHTML = "<ul class='itemFuncionario'>";
        if (listaDeFuncionarios != undefined) {
            if (listaDeFuncionarios.length > 0) {
                for (var i = 0; i < listaDeMarcas.length; i++) {
                    funcionariosHTML += ("<input type='radio' name='funcionario' id='func"+i+"' hidden>");
                }
            } else {
                funcionariosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaFuncionariosHTML").html(funcionariosHTML + "</ul>");
        }
    }

*/