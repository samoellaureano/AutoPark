$(document).ready(function () {
    $("#menu").load("menu.html");

    buscarVagas = function () {

        var idEstacionamento = $("#estacionamento").val();

        var cfg = {

            type: "POST",
            url: "../../rest/checkinRest/buscarVagas/" + idEstacionamento,
            success: function (vagasDisponiveis) {
                exibirVaga(vagasDisponiveis);
                buscarClientesDoDia(idEstacionamento);
            },
            error: function (err) {
                alert("Erro ao buscar dados dashboard: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirVaga = function (vagasDisponiveis) {
        $("#vagaDisponivel").html(vagasDisponiveis);
    };

    buscarClientesDoDia = function (idEstacionamento) {

        var cfg = {

            type: "POST",
            url: "../../rest/checkinRest/buscarClientesDoDia/" + idEstacionamento,
            success: function (numeroClientes) {
                exibirNumeroClientes(numeroClientes);
                buscaReceitaDoDia(idEstacionamento);
            },
            error: function (err) {
                alert("Erro ao buscar dados dashboard: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirNumeroClientes = function (numeroDeClientes) {
        $("#clienteDia").html(numeroDeClientes);
    };

    buscaReceitaDoDia = function (idEstacionamento) {
        var cfg = {
            type: "POST",
            url: "../../rest/checkoutRest/buscaReceitaDoDia/" + idEstacionamento,
            success: function (receita) {
                exibirReceita(receita);
            },
            error: function (err) {
                alert("Erro ao buscar dados dashboard: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirReceita = function (receita) {
        $("#receita").html(receita);
    };

    checkin = function () {
        var placa = $("#placa").val();
        var idEstacionamento = $("#estacionamento").val();
        var cfg = {
            url: "../../rest/checkinRest/addCheckin/" + placa + "&" + idEstacionamento,
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Check-in com sucesso!");
                    exibirMessagem(resp, 1);
                } else if (succJson == 2){
                    resp = ("Este check-in já existe!");
                    exibirMessagem(resp, 2);
                }
                buscarVagas();
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o check-in!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }

    checkout = function () {
        var placa = $("#placa").val();
        var idEstacionamento = $("#estacionamento").val();
        var cfg = {
            url: "../../rest/checkoutRest/addCheckout/" + placa + "&" + idEstacionamento,
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Check-out com sucesso!");
                    exibirMessagem(resp, 1);
                } else if (succJson == 2){
                    resp = ("Necessário validar primeiro!");
                    exibirMessagem(resp, 2);
                }
                buscarVagas();
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o check-out!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }

    $("#btnCheck").click(function () {
        var radios = $('input[type="radio"]');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                if (radios[i].value == "check-in") {
                    checkin();
                } else if (radios[i].value == "check-out") {
                    checkout();
                }else{
                    validar();
                }
            }
        }
    });

    buscaEstacionamento = function () {

        if (dadosSessao.id != undefined) {
            var cfg = {
                type: "POST",
                url: "../../rest/estacionamentoRest/buscaEstacionamentosPorUsuario/" + dadosSessao.id,
                success: function (listaDeEstacionamento) {
                    exibirEstacionamentos(listaDeEstacionamento);
                },
                error: function (err) {
                    alert("Erro ao buscar os estacionamentos: " + err.responseText);
                }
            };
            autoPark.ajax.post(cfg);
        }

    };

    exibirEstacionamentos = function (listaDeEstacionamento) {
        var html = "";
        for (var i = 0; i < listaDeEstacionamento.length; i++) {
            html += ("<option value='" + listaDeEstacionamento[i].id + "'>" + listaDeEstacionamento[i].descricao + "</option>");
        }
        $("#estacionamento").html(html);
        buscarVagas();
    }

    validar = function () {
        var placa = $("#placa").val();
        var cfg = {
            type: "POST",
            url: "../../rest/checkinRest/validaCheckin/" + placa,
            success: function (succJson) {
                window.location.href = ("dashboard.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    };

    setTimeout(function () {
        buscaEstacionamento();
    }, 1500);
});