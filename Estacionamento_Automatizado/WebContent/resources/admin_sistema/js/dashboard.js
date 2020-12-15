var divSenha = false;
$(document).ready(function () {
    formSenha = function () {
        if (divSenha) {
            $("#divSenha").hide();
            divSenha = false;
        } else {
            $("#divSenha").show();
            divSenha = true;
        }
    };

    $('#btnSalvar').click(function (e) {
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
                    } else if (succJson == 2) {
                        resp = ("Senha alterada com sucesso!");
                        exibirMessagem(resp, 1);
                        formSenha();
                        $("#confSenha").val("");
                        $("#novaSenha").val("");
                    } else {
                        exibirMessagem(succJson, 2);
                    }
                },
                error: function (errJson) {
                    resp = ("Erro ao alterar o cadastro!");
                    exibirMessagem(resp, 2);
                }
            };
        } else {
            alert("A confirmação de senha esta diferente!")
        }
        autoPark.ajax.post(cfg);
    });
});