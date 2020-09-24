$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#buscarRelatorio').click(function(e){
        var valorBusca = $("#buscarReg").val();
        var dataI = $("#buscarDataInicial").val();
        var dataF = $("#buscarDataFinal").val();
        var cfg = {
            type: "POST",
            url: "../rest/registrosRest/buscarRegistros/valorBusca=" + valorBusca +"&dataInicial=" + dataI + "&dataFinal=" + dataF,
            success: function (listaDeRegistros) {
                exibirRegistros(listaDeRegistros);
            },
            error: function (err) {
                alert("Erro ao buscar Registros: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });

    exibirRegistros = function(listaDeRegistros){
        var registrosHTML = "<ul class='itemRegistro'>";
        if (listaDeRegistros != undefined) {
            if (listaDeRegistros.length > 0) {
                for (var i = 0; i < listaDeRegistros.length; i++) {
                    registrosHTML += "<input type='radio' name='registro' id='reg"+i+"' hidden>"
                    +"<label for='reg"+i+"'>"+listaDeRegistros.cliente.nome+"</label>"
                    +"<li><div><form action=''><label for='nome'>Veiculo:<span>"+listaDeRegistros.veiculo.placa+"</span></label>"
                    +"<label for='nome'>Check-in:<span>"+listaDeRegistros.checkin.data+"</span></label>"
                    +"<label for='nome'>Check-out:<span>"+listaDeRegistros.checkout.data+"</span></label></form></div></li>"
                }
                registrosHTML+="</ul>";
            } else {
                registrosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaRegistrosHTML").append(registrosHTML);
        }
    }
});