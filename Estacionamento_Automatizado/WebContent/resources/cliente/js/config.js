
var usuario = null;
var cliente = null;

var usuario2 = new Object();
var cliente2 = new Object();
$("#cpfEdit").mask('000.000.000-00'); 
$(document).ready(function () {
    $("#menu").load("menu.html");
    buscarDados = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/clienteRest/buscaDados/" + dadosSessao.id,
            success: function (cliente) {
                exibirDados(cliente);
            },
            error: function (err) {
                alert("Erro ao buscar Configurações: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }

    exibirDados = function (cliente) {

        $("#nomeEdit").val(cliente.nome);
        $("#cpfEdit").val(cliente.usuario.cpf);
        $("#cpfEdit").mask('000.000.000-00');
        usuario2.senha = cliente.usuario.senha;
        cliente2.usuario = usuario2;
        $("#celEdit").val(mtel(cliente.celular));
        $("#emailEdit").val(cliente.email);
        $("#salvarAlteracoes").val(cliente.id);
    }

    $('#salvarAlteracoes').click(function (e) {
        usuario = new Object();
        cliente = new Object();
        var formSelecionado = $("input[name='dados']:checked").val();
        var cfg = null;
        if (formSelecionado == "usuario") {
            cliente.id = $("#salvarAlteracoes").val();
            cliente.nome = $("#nomeEdit").val();
            usuario.id = dadosSessao.id;
            cliente.usuario = usuario;
            cliente.celular = $("#celEdit").val();
            cliente.celular = cliente.celular.replace(/[^0-9]/g, '');
            cliente.email = $("#emailEdit").val();
            
            cfg = {
                url: "../../rest/clienteRest/atualizaCliente",
                data: JSON.stringify(cliente),
                success: function (succJson) {
                    if (succJson == 1) {
                        resp = ("Cadastro alterado com sucesso!");
                        exibirMessagem(resp, 1);
                    } else {
                        resp = ("Erro ao alterar o cadastro!");
                        exibirMessagem(resp, 2);
                    }

                    buscarDados();
                },
                error: function (errJson) {
                    resp = ("Erro ao alterar o cadastro!");
                    exibirMessagem(resp, 2);
                }
            };
        } else {
            var confSenha = $("#confSenha").val();
            var novaSenha = $("#novaSenha").val();
            usuario = new Object();

            if (confSenha == novaSenha && novaSenha != "") {
                usuario.id = dadosSessao.id;
                usuario.senha = btoa(novaSenha);

                cfg = {
                    url: "../../rest/usuarioRest/alteraSenha",
                    data: JSON.stringify(usuario),
                    success: function (succJson) {
                        if (succJson == 1) {
                            resp = ("Esta senha já esta em uso!");
                            exibirMessagem(resp, 2);
                        } else if(succJson == 2) {
                            resp = ("Senha alterada com sucesso!");
                            exibirMessagem(resp, 1);
                        }else{
                            exibirMessagem(succJson, 2);
                        }

                        buscarDados();
                    },
                    error: function (errJson) {
                        resp = ("Erro ao alterar o cadastro!");
                        exibirMessagem(resp, 2);
                    }
                };
            } else {
                alert("A confirmação de senha esta diferente!")
            }
        }
        autoPark.ajax.post(cfg);
    });
    setTimeout(function () {
        buscarDados();
    }, 500);
});