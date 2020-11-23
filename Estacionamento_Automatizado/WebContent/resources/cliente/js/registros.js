$(document).ready(function () {
    $("#menu").load("menu.html");

    $("#buscaRegistros").click(function (e) {
        var dataInicial = reformatDate($("#buscarDataInicial").val());
        var dataFinal = reformatDate($("#buscarDataFinal").val());
        var cfg = {
            type: "POST",
            url: "../../rest/registroRest/buscaRegistro/" + dataInicial + "&" + dataFinal + "&" + dadosSessao.id,
            success: function (listaDeRegistros) {
                visualizarRegistro(listaDeRegistros);
            },
            error: function (errJson) {
                alert("Erro ao buscar Configurações: " + errJson.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });

    visualizarRegistro = function (listaDeRegistros) {

        var registroHtml = "";
        if (listaDeRegistros != undefined) {
            if (listaDeRegistros.checkin.length > 0) {
                for (var i = 0; i < listaDeRegistros.checkin.length; i++) {
                            registroHtml = ("<ul class='itemRegistro'><input type='radio' name='registro' id='reg" + i + "'>"
                            + "<label for='reg" + i + "'>" + new Date(listaDeRegistros.checkin[i].dataHora)+"</label>"
                            + "<li>Check-in: <span>" +  + "</span></li>"
                            + "<li>Check-out: <span>" +  + "</span></li>"
                            + "<li>Permanencia: <span>" +  + "</span></li>"
                            + "<li>Valor Hora:  <span>R$:" + + "</span></li></ul>");
                        
                };
            } else {
                registroHtml += "<ul class='itemRegistro'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
            };
            $("#registroHtml").append(registroHtml);
        };
    };

    function reformatDate(dateStr) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
    }
});