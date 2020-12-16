
var valorTotal = 0;
var estacionamentoRelatorio="";
$(document).ready(function () {
    $("#menu").load("menu.html");
    $('#buscarRelatorio').click(function (e) {
       
        var dataInicial = reformatDate($("#buscarDataInicial").val());
        var dataFinal = reformatDate($("#buscarDataFinal").val());
        var estacionamento = $("#estacionamento").val();

        var cfg = {
            type: "POST",
            url: "../../rest/registroRest/buscaRelatorio/" + dataInicial + "&" + dataFinal + "&"+estacionamento,
            success: function (listaDeRegistros) {
                visualizarRegistro(listaDeRegistros);
            },
            error: function (errJson) {
                alert("Erro ao buscar relatório: " + errJson.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });

    visualizarRegistro = function (listaDeRegistros){
        if (listaDeRegistros != undefined) {
            var registroHtml = "";
            if (listaDeRegistros.checkin.length > 0) {
                geraTabelaPDF(listaDeRegistros);
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

    reformatDate = function (dateStr) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
    };


    geraTabelaPDF = function(listaDeRegistros){
    	estacionamentoRelatorio=listaDeRegistros;
        var html="<table id='idtableEdit2'><thead>"
				+"<th scope='col'>Veiculo</th><th scope='col'>tempo de Uso</th><th scope='col'>Valor</th>"
				+"</tr></thead><tbody>";		

                for(var i=0; i<listaDeRegistros.checkin.length; i++){	
                    if (listaDeRegistros.checkout[i] != undefined) {
                      var validaDecimal =""+ listaDeRegistros.checkout[i].valor+"";
                        if(validaDecimal.includes(",",0)){     
                            console.log("1");
                            var valor = listaDeRegistros.checkout[i].valor.replace(",",".");

                        }else{
                            console.log("2");
                            var valor = listaDeRegistros.checkout[i].valor;
                        };

                        valorTotal = parseFloat(valorTotal)+parseFloat(listaDeRegistros.checkout[i].valor);
                    var data = new Date(listaDeRegistros.checkin[i].dataHora);

                        const now = new Date(listaDeRegistros.checkout[i].dataHora); // Data de hoje
                        const past = new Date(listaDeRegistros.checkin[i].dataHora); // Outra data no passado
                        const diff = Math.abs(now.getTime() - past.getTime());
                        var diferenca = new Date(diff);								
                    
                    html+="<tr><td>"+ listaDeRegistros.checkin[i].veiculo.placa +"</td>"
                            +"<td>"+ (diferenca.getUTCDate() - 1) + "d " + diferenca.getUTCHours() + "h " + diferenca.getUTCMinutes() + "m</td>"
                            +"<td>"+ listaDeRegistros.checkout[i].valor + "</td></tr>";						
                    };
                };
                
                html+="</tbody></table>";	
                $('#gridRelatorio').html(html);
    };

    gerarPDF = function (){
    	
        //trazer  importe para a o html e referenciar a tabela
        //sem css de prerencia e apontar a tabela para o doc.autotable com o id da mesma
       var rua = estacionamentoRelatorio.checkout[0].estacionamento.endereco;
        var doc = new jsPDF();
        doc.setFontSize(11);
        
        doc.text(15, 10, estacionamentoRelatorio.checkout[0].estacionamento.descricao);
        doc.text(15, 15, rua);     
        doc.text(0, 30, '--------------------------------------------------------------------------------------------------------------------------------------------------------------------');
        doc.setFontSize(22);
        doc.text(65, 45, 'Relatório da Empresa');
        doc.setFontSize(11);        
        doc.text(20, 70, 'Valor Total: '+valorTotal);

        doc.autoTable({ html: "#idtableEdit2", startY: 95 });
        var data = new Date();
        var mes = parseInt(data.getMonth())+parseInt(1);
        var dia = data.getDate()+"_"+ mes+"_"+ data.getFullYear();
        doc.save("Relatorio - "+dia+".pdf");
        
    };

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
    };
    
    setTimeout(function () {
        buscaEstacionamento();
    }, 1500);

});
