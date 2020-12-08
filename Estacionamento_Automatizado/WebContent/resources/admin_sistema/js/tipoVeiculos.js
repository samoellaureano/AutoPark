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
    buscarTipoVeiculos = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculos/",
            success: function (listaTiposVeiculos) {
                exibirTipoVeiculos(listaTiposVeiculos);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirTipoVeiculos = function(listaTiposVeiculos){
        var tbody = $('#tabTipoVeiculos');        
        var html ="";
        if (listaTiposVeiculos != undefined) {
            if (listaTiposVeiculos.length > 0) {
                for (var i = 0; i < listaTiposVeiculos.length; i++) {
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaTiposVeiculos[i].descricao))
                            .append($('<td class="btnEdit">').append("<td data-toggle='modal' style='text-align-last: center; border: none;' onclick='buscarTipoVeiculoPorID(" + listaTiposVeiculos[i].id + ")'><button class='btn btn-outline-light btnEdit' type='button'><img src='img/editar.png' alt='Editar'></button></td>"))
                    )
                }
            } else {
                html += "<td colspan='5' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoTiposVeiculos").html(html);
        }
    }
    buscarTipoVeiculoPorID = function(id){
        exibeEditar();
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculoPorId/" + id,
            success: function (tipoVeiculo) {
                $("#descricaoEdit").val(tipoVeiculo.descricao);
                $("#btnSalvarEdit").val(tipoVeiculo.id);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        tipoVeiculo = new Object();
        tipoVeiculo.descricao = $("#descricaoEdit").val();
        tipoVeiculo.id = $("#btnSalvarEdit").val();
        var cfg = {
            url: "../../rest/tipoVeiculoRest/editTipoVeiculo",
            data: JSON.stringify(tipoVeiculo),
            success: function (succJson) {
                window.location.href = ("tipoVeiculos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        tipoVeiculo = new Object();
        tipoVeiculo.descricao = $("#descricao").val();
        var cfg = {
            url: "../../rest/tipoVeiculoRest/addTipoVeiculo",
            data: JSON.stringify(tipoVeiculo),
            success: function (succJson) {
                window.location.href = ("tipoVeiculos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });
    buscarTipoVeiculos();
});