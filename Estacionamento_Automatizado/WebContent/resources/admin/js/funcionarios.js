var funcionario = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#cadFuncionario').click(function(e){
        var arrayCadFun = [];
        var $inputs = $('#formCadFuncionario :input');
        // percorre os inputs
        $inputs.each(function() {
            arrayCadFun.push($(this).val());
        });
        funcionario.nome = arrayCadFun[0];
        funcionario.celular = arrayCadFun[1];
        funcionario.email = arrayCadFun[2];
        funcionario.empresa = arrayCadFun[3];

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
                
                // funcionario.buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo funcionário!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#carrega-listaFuncionario').click(function(e){
        /*https://tableless.com.br/conteudo-sob-demanda-com-jquery/ */
    });
});

