var funcionario = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

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

    $('#cadFuncionario').click(function(e){
        funcionario.nome = $("#nome").val();
        funcionario.celular = $("#celular").val();
        funcionario.email = $("#email").val();
        funcionario.empresa = $("#empresa").val();

        var cfg = {
            url: "../rest/funcionarioRest/addFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Funcionário cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O Funcionário ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo funcionário!");
                    exibirMessagem(resp, 2);
                }
                
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo funcionário!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscar();

    $('#carrega-listaFuncionario').click(function(e){
        /*https://tableless.com.br/conteudo-sob-demanda-com-jquery/ */
    });
});

