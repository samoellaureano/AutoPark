$(document).ready(function(){
    $("#menu").load("menu.html");

    buscar = function(){
        var cfg = {
            type: "POST",
            url: "../rest/dashboardRest/buscarDashboard/",
            success: function (dashboard) {
                exibirDashboard(dashboard);
            },
            error: function (err) {
                alert("Erro ao buscar dados dashboard: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirDashboard = function(dashboard){
        $("#vagaDisponivel").html(dashboard.vagaDisponivel);
        $("#clienteDia").html(dashboard.clienteDia);
        $("#receita").html(dashboard.receita);

        for(var i=0; i < dashboard.listaDeEstacionamento.length; i++){
            $("#listaFilial").append("<option value='"+i+"'>"+dashboard.listaDeEstacionamento.nome+"</option>")
        }
    }

    checkin = function(){
        var placa = $("#placa").val();
        var idEstacionamento = $("#estacionamento").val();
        var cfg = {
            url: "../../rest/checkinRest/addCheckin/" + placa +"&"+idEstacionamento,
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Check-in com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("dashboard.html");
                }else{
                    resp = ("Erro ao realizar o check-in!");
                    exibirMessagem(resp, 2);
                }
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o check-in!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }

    checkout = function(){
        var placa = $("#placa").val();
        var cfg = {
            url: "../../rest/checkoutRest/addCheckout/" + placa +"&"+dadosSessao.id,
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Check-out com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
                    resp = ("Erro ao realizar o check-out!");
                    exibirMessagem(resp, 2);
                }
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o check-out!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $("#btnCheck").click(function(){
        var radios = $('input[type="radio"]');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                if(radios[i].value == "check-in"){
                    checkin();
                }else{
                    checkout();
                }
            }
        }
    });

    buscaEstacionamento = function () {
            setTimeout(function(){
                if(dadosSessao.id != undefined){
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
            }, 500);
    };

    exibirEstacionamentos = function (listaDeEstacionamento) {
        var html="";
        for (var i = 0; i < listaDeEstacionamento.length; i++) {
            html += ("<option value='" + listaDeEstacionamento[i].id + "'>" + listaDeEstacionamento[i].descricao + "</option>");
        }    
        $("#estacionamento").html(html);
    }

    buscar();
    buscaEstacionamento();
});