$(document).ready(function(){
    $("#editar").hide();
    exibeEditar = function(){
        if($("#novo").val()){
            $("#editar").hide();
            $("#novo").show();
            $("#novo").val(false);
        }else{
            $("#editar").show();
            $("#novo").hide();
            $("#novo").val(true);
        }        
    }
    buscarEstacionamentos = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/buscaEstacionamentos/",
            success: function (listaEstacionamentos) {
                exibirEstacionamentos(listaEstacionamentos);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirEstacionamentos = function(listaEstacionamentos){
        var tbody = $('#tabEstacionamentos');        
        var html ="";
        if (listaEstacionamentos != undefined) {
            if (listaEstacionamentos.length > 0) {
                for (var i = 0; i < listaEstacionamentos.length; i++) {
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaEstacionamentos[i].descricao))
                            .append($('<td>').append(listaEstacionamentos[i].cnpj))
                            .append($('<td>').append(listaEstacionamentos[i].endereco))
                            .append($('<td>').append(listaEstacionamentos[i].vagas))
                            .append($('<td>').append(listaEstacionamentos[i].empresa.descricao))
                            .append($('<td class="btnEdit">').append("<td data-toggle='modal' style='text-align-last: center; border: none;' onclick='buscarEstacionamentoPorID(" + listaEstacionamentos[i].id + ")'><button class='btn btn-outline-light btnEdit' type='button'><img src='img/editar.png' alt='Editar'></button></td>"))
                    )
                }
            } else {
                html += "<td colspan='5' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoEstacionamentos").html(html);
        }
    }
    buscarEstacionamentoPorID = function(id){
        exibeEditar();
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/buscarEstacionamentoPorId/" + id,
            success: function (estacionamento) {
                $("#descricaoEdit").val(estacionamento.descricao);
                $("#cnpjEdit").val(estacionamento.cnpj);
                $("#enderecoEdit").val(estacionamento.endereco);
                $("#enderecoEdit").val(estacionamento.endereco);
                $("#vagasEdit").val(estacionamento.vagas);
                $("#empEdit").append("<option value='"+estacionamento.empresa.id+"' selected>" + estacionamento.empresa.descricao + "</option>");
                $("#btnSalvarEdit").val(estacionamento.id);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        estacionamento = new Object();
        empresa = new Object();
        estacionamento.id = $("#btnSalvarEdit").val();
        estacionamento.cnpj = $("#cnpjEdit").val();
        estacionamento.descricao = $("#descricaoEdit").val();
        estacionamento.endereco = $("#enderecoEdit").val();
        empresa.id = $("#empEdit").val();
        estacionamento.empresa = empresa;
        estacionamento.vagas = $("#vagasEdit").val();
        estacionamento.descricao = estacionamento.descricao.replace(/\./g, "");
        estacionamento.descricao = estacionamento.descricao.replace(/\//g, "");
        var cfg = {
            url: "../../rest/estacionamentoRest/editEstacionamento",
            data: JSON.stringify(estacionamento),
            success: function (succJson) {
                window.location.href = ("estacionamentos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        estacionamento = new Object();
        empresa = new Object();
        estacionamento.cnpj = $("#cnpj").val();
        estacionamento.descricao = $("#descricao").val();
        estacionamento.endereco = $("#endereco").val();
        empresa.id = $("#emp").val();
        estacionamento.empresa = empresa;
        estacionamento.vagas = $("#vagas").val();
        estacionamento.descricao = estacionamento.descricao.replace(/\./g, "");
        estacionamento.descricao = estacionamento.descricao.replace(/\//g, "");
        var cfg = {
            url: "../../rest/estacionamentoRest/addEstacionamento",
            data: JSON.stringify(estacionamento),
            success: function (succJson) {
                window.location.href = ("estacionamentos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscarEmpresas = function () {
        $('#empEdit option').remove();
        $('#emp option').remove();
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresas/",
            success: function (listaEmpresas) {
                if (listaEmpresas != undefined) {
                    if (listaEmpresas.length > 0) {
                        for (var i = 0; i < listaEmpresas.length; i++) {
                            $('#emp').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                            $('#empEdit').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                        }
                    }
                }
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    buscarEstacionamentos();
    buscarEmpresas();
});