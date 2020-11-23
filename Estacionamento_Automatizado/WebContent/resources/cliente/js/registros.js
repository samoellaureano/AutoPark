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
        if (listaDeRegistros != undefined) {
            var registroHtml = "";
            if (listaDeRegistros.checkin.length > 0) {
                for (var i = 0; i < listaDeRegistros.checkin.length; i++) {
                            var data = new Date(listaDeRegistros.checkin[i].dataHora);

                            const now = new Date(listaDeRegistros.checkout[i].dataHora); // Data de hoje
                            const past = new Date(listaDeRegistros.checkin[i].dataHora); // Outra data no passado
                            const diff = Math.abs(now.getTime() - past.getTime());
                            var diferenca = new Date(diff);
                            registroHtml += "<ul class='itemRegistro'><input type='radio' name='registro' id='reg" + i + "' hidden>"
                            + "<label for='reg" + i + "'>" + data.getUTCDate()+"/"+data.getUTCMonth()+"/"+data.getUTCFullYear()+"</label>"
                            + "<li>Veiculo:<span>"+listaDeRegistros.checkin[i].veiculo.placa+"</span></li>"
                            + "<li>Tempo de Uso:<span>"+(diferenca.getUTCDate()-1)+"d "+diferenca.getUTCHours()+"h "+diferenca.getUTCMinutes()+"m</span></li>"
                            + "<li>Valor:<span>"+listaDeRegistros.checkout[i].valor+"</span></li></ul>";
                        
                };
            } else {
                registroHtml = "<span>Nenhum registro encontrado</span>";
            };
            $("#registroHtml").html(registroHtml);
        };
    };

    function reformatDate(dateStr) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
    }
});