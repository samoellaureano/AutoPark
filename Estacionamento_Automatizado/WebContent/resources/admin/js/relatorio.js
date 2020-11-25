$(document).ready(function(){
    $("#menu").load("menu.html");

    // $('#buscarRelatorio').click(function(e){
    //     var valorBusca = $("#buscarReg").val();
    //     var dataI = $("#buscarDataInicial").val();
    //     var dataF = $("#buscarDataFinal").val();
    //     var cfg = {
    //         type: "POST",
    //         url: "../rest/registrosRest/buscarRegistros/valorBusca=" + valorBusca +"&dataInicial=" + dataI + "&dataFinal=" + dataF,
    //         success: function (listaDeRegistros) {
    //             exibirRegistros(listaDeRegistros);
    //         },
    //         error: function (err) {
    //             alert("Erro ao buscar Registros: " + err.responseText);
    //         }
    //     };
    //     autoPark.ajax.post(cfg);
    // });

    // exibirRegistros = function(listaDeRegistros){
    //     var registrosHTML = "<ul class='itemRegistro'>";
    //     if (listaDeRegistros != undefined) {
    //         if (listaDeRegistros.length > 0) {
    //             for (var i = 0; i < listaDeRegistros.length; i++) {
    //                 registrosHTML += "<input type='radio' name='registro' id='reg"+i+"' hidden>"
    //                 +"<label for='reg"+i+"'>"+listaDeRegistros.cliente.nome+"</label>"
    //                 +"<li><div><form action=''><label for='nome'>Veiculo:<span>"+listaDeRegistros.veiculo.placa+"</span></label>"
    //                 +"<label for='nome'>Check-in:<span>"+listaDeRegistros.checkin.data+"</span></label>"
    //                 +"<label for='nome'>Check-out:<span>"+listaDeRegistros.checkout.data+"</span></label></form></div></li>"
    //             }
    //             registrosHTML+="</ul>";
    //         } else {
    //             registrosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
    //         }
    //         $("#listaRegistrosHTML").append(registrosHTML);
    //     }
    // }

    $('#buscarRelatorio').click(function(e){
        var dataInicial = reformatDate($("#buscarDataInicial").val());
        var dataFinal = reformatDate($("#buscarDataFinal").val());
        var cfg = {
            type: "POST",
            url: "../../rest/registroRest/buscaRegistro/" + dataInicial + "&" + dataFinal + "&0",
            success: function (listaDeRegistros) {
                visualizarRegistro(listaDeRegistros);
            },
            error: function (errJson) {
                alert("Erro ao buscar relatório: " + errJson.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });

    visualizarRegistro = function (listaDeRegistros) {
        if (listaDeRegistros != undefined) {
            var registroHtml = "";
            if (listaDeRegistros.checkin.length > 0) {
                for (var i = 0; i < listaDeRegistros.checkin.length; i++) {
                    if (listaDeRegistros.checkout[i] != undefined) {
                        var data = new Date(listaDeRegistros.checkin[i].dataHora);

                        const now = new Date(listaDeRegistros.checkout[i].dataHora); // Data de hoje
                        const past = new Date(listaDeRegistros.checkin[i].dataHora); // Outra data no passado
                        const diff = Math.abs(now.getTime() - past.getTime());
                        var diferenca = new Date(diff);
                        registroHtml += "<ul class='itemRegistro'><input type='radio' name='registro' id='reg" + i + "' hidden>"
                            + "<label for='reg" + i + "'>" + data.getUTCDate() + "/" + data.getUTCMonth() + "/" + data.getUTCFullYear() + "</label>"
                            + "<li>Veiculo:<span>" + listaDeRegistros.checkin[i].veiculo.placa + "</span></li>"
                            + "<li>Tempo de Uso:<span>" + (diferenca.getUTCDate() - 1) + "d " + diferenca.getUTCHours() + "h " + diferenca.getUTCMinutes() + "m</span></li>"
                            + "<li>Valor:<span>" + listaDeRegistros.checkout[i].valor + "</span></li></ul>";
                    }
                };
            } else {
                registroHtml = "<span>Nenhum registro encontrado</span>";
            };
            $("#listaRegistrosHTML").html(registroHtml);
        };
    };

    function reformatDate(dateStr) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
    }
});