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
        var cfg = {
            url: "../rest/checkinRest/addCheckin/" + placa,
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Check-in com sucesso!");
                    exibirMessagem(resp, 1);
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
            url: "../rest/checkoutRest/addCheckout/" + placa,
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

    buscar();
});