$(document).ready(function(){
    $("#menu").load("menu.html");

    $('#buscarRelatorio').click(function(e){
        var valorBusca = $("#buscarReg").val();
        var dataI = $("#buscarDataInicial").val();
        var dataF = $("#buscarDataFinal").val();
        var cfg = {
            type: "POST",
            url: "../rest/registrosRest/buscarRegistros/valorBusca=" + valorBusca +"&dataInicial=" + dataI + "&dataFinal=" + dataF,
            success: function (listaDeFuncionarios) {
                exibirFuncionarios(listaDeFuncionarios);
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });
});