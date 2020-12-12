$(document).ready(function(){
    $("#editar").hide();
    exibeEditar = function (val) {
        if (val) {
            if (!$("#novo").val()) {
                $("#editar").show();
                $("#novo").hide();
                $("#novo").val(true);
            }
        } else {
            if ($("#novo").val()) {
                $("#editar").hide();
                $("#novo").show();
                $("#novo").val(false);
            }
        };
    };
    buscarMarcas = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscarMarcas/",
            success: function (listaMarcas) {
                exibirMarcas(listaMarcas);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirMarcas = function(listaMarcas){
        var tbody = $('#tabMarcas');        
        var html ="";
        if (listaMarcas != undefined) {
            if (listaMarcas.length > 0) {
                for (var i = 0; i < listaMarcas.length; i++) {
                    if(listaMarcas[i].ativo){
                        listaMarcas[i].ativo = "Ativo";
                    }else{
                        listaMarcas[i].ativo = "Inativo";
                    }
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaMarcas[i].descricao))
                            .append($('<td>').append(listaMarcas[i].ativo))
                            .append($('<td>').append("<div class='acoes'><a class='btnEdit' onclick='buscarMarcaPorID(" + listaMarcas[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirMarcaPorID(" + listaMarcas[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"))
                    )
                }
            } else {
                html += "<td colspan='2' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoMarcas").html(html);
        }
    }
    buscarMarcaPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscarMarcaPorId/" + id,
            success: function (marca) {
                $("#descricaoEdit").val(marca.descricao);
                $("#btnSalvarEdit").val(marca.id);
                $("#ativoEdit").prop( "checked",marca.ativo);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    excluirMarcaPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/inativaMarca/" + id,
            success: function (succJson) {
                window.location.href = ("marcas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        marca = new Object();
        marca.descricao = $("#descricaoEdit").val();
        marca.id = $("#btnSalvarEdit").val();
        marca.ativo = $("#ativoEdit").is(':checked');
        var cfg = {
            url: "../../rest/marcaRest/editMarca",
            data: JSON.stringify(marca),
            success: function (succJson) {
                window.location.href = ("marcas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        marca = new Object();
        marca.descricao = $("#descricao").val();
        var cfg = {
            url: "../../rest/marcaRest/addMarca",
            data: JSON.stringify(marca),
            success: function (succJson) {
                window.location.href = ("marcas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });
    buscarMarcas();
});