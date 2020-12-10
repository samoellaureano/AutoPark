
var usuario = null;
var funcionario = null;

var usuario2 = new Object();
var funcionario2 = new Object();

$("#cpfEdit").mask('000.000.000-00'); 
$(document).ready(function(){
    $("#menu").load("menu.html"); 

    buscarDados = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscaDados/" + dadosSessao.id,
            success: function (funcionario) {
                exibirDados(funcionario);
            },
            error: function (err) {
                alert("Erro ao buscar Configurações: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }

    exibirDados = function (funcionario) {

        $("#nomeEdit").val(funcionario.nome);
        $("#cpfEdit").val(funcionario.usuario.cpf);
        $("#cpfEdit").mask('000.000.000-00');    
        usuario2.senha = funcionario.usuario.senha;
        funcionario2.usuario = usuario2;
        $("#celEdit").val(mtel(funcionario.celular));
        $("#emailEdit").val(funcionario.email);        
        $("#salvarAlteracoes").val(funcionario.id);
    }

    $('#salvarAlteracoes').click(function (e){
        usuario = new Object();
        funcionario = new Object();
        var formSelecionado = $("input[name='dados']:checked").val();
        var cfg = null;

        if (formSelecionado == "usuario") {
            funcionario.id = $("#salvarAlteracoes").val();
            funcionario.nome = $("#nomeEdit").val();
            usuario.id = dadosSessao.id;
            funcionario.usuario = usuario;
            funcionario.celular = $("#celEdit").val();
            funcionario.celular = funcionario.celular.replace(/[^0-9]/g, '');
            funcionario.email = $("#emailEdit").val();

            cfg = {
                url: "../../rest/funcionarioRest/atualizaFuncionario",
                data: JSON.stringify(funcionario),
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

            if (confSenha == novaSenha && novaSenha != ""){
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

     }, 1000);
  
   
    
});