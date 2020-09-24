
var configUsuario = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");
    buscar = function(){
        //ID do usuario logado
        var valorBusca = 1;
        var cfg = {
            type: "POST",
            url: "../rest/configRest/buscarConfiguracoes/" + valorBusca,
            success: function (configuracoes) {
                configUsuario.tipo = configuracoes.tipoUsuario;
                exibirConfiguracoes(configuracoes);
            },
            error: function (err) {
                alert("Erro ao buscar Configurações: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirConfiguracoes = function(configuracoes){
        $("#nomeEdit").val(configuracoes.nome);
        $("#cpfEdit").val(configuracoes.cpf);
        $("#celEdit").val(configuracoes.celular);
        $("#emailEdit").val(configuracoes.email);
    }

    $('#salvarAlteracoes').click(function(e){
        var formSelecionado = $("input[name='dados']:checked").val();
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

                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao alterar o item!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscar();
    
});