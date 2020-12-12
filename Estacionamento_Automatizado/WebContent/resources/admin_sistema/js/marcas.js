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
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaMarcas[i].descricao))
                            .append($('<td class="btnEdit">').append("<td data-toggle='modal' style='text-align-last: center; border: none;' onclick='buscarMarcaPorID(" + listaMarcas[i].id + ")'><button class='btn btn-outline-light btnEdit' type='button'><img src='img/editar.png' alt='Editar'></button></td>"))
                    )
                }
            } else {
                html += "<td colspan='5' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoMarcas").html(html);
        }
    }
    buscarMarcaPorID = function(id){
        exibeEditar();
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscarMarcaPorId/" + id,
            success: function (marca) {
                $("#descricaoEdit").val(marca.descricao);
                $("#btnSalvarEdit").val(marca.id);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        marca = new Object();
        marca.descricao = $("#descricaoEdit").val();
        marca.id = $("#btnSalvarEdit").val();
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