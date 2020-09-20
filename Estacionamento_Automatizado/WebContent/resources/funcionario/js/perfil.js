
var configUsuario = null;
$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#salvarAlteracoes').click(function(e){
        var formSelecionado = $("input[name='dados']:checked").val();
        console.log(formSelecionado);
        if(formSelecionado == "usuario"){
            configUsuario = new Object();
            configUsuario.nome = $("#nomeEdit").val();
            configUsuario.cpf = $("#cpfEdit").val();
            configUsuario.celular = $("#celEdit").val();
            configUsuario.email = $("#emailEdit").val();
        }else{
            configUsuario = new Object();
            configUsuario.senha = $("#senha").val();
            configUsuario.novaSenha = $("#novaSenha").val();
        }
        

        var cfg = {
            url: "../rest/configUsuarioRest/configUsuario",
            data: JSON.stringify(configUsuario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Item alterado com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
                    resp = ("Erro ao alterar o item!");
                    exibirMessagem(resp, 2);
                }

                // funcionario.buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao alterar o item!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
});