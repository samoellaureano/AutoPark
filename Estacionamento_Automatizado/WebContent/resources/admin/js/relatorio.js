var listaDeRegistros = null;
$(document).ready(function () {
    $("#menu").load("menu.html");
    $('#buscarRelatorio').click(function (e) {
        listaDeRegistros = null;
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

    function gerarPDF() {
        //trazer  importe para a o html e referenciar a tabela
        //sem css de prerencia e apontar a tabela para o doc.autotable com o id da mesma


        var doc = new jsPDF();
        doc.setFontSize(11);
        doc.text(10, 10, 'Logos Assistência Tecnica Especializada');
        doc.text(10, 15, 'Rua: Dr. João Colin, nº 780, joinville - SC ');
        doc.text(10, 20, 'Telefone: (47) 3227 9076');
        doc.text(0, 30, '--------------------------------------------------------------------------------------------------------------------------------------------------------------------');
        doc.setFontSize(22);
        doc.text(65, 45, 'Relatório da Empresa');
        doc.setFontSize(11);
        doc.text(20, 65, 'Status das ordem de Serviço: ' + status);
        doc.text(20, 70, 'Valor Total: ' + vlt);

        doc.autoTable({ html: "#idtableEdit2", startY: 95 });

        var data = new Date();
        var mes = parseInt(data.getMonth()) + parseInt(1);
        var dia = data.getDate() + "_" + mes + "_" + data.getFullYear();
        doc.save("Relatorio - " + dia + ".pdf");
    }
});
