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
    buscarModelos = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/buscarModelos/",
            success: function (listaModelos) {
                exibirModelos(listaModelos);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirModelos = function(listaModelos){
        var tbody = $('#tabModelos');        
        var html ="";
        if (listaModelos != undefined) {
            if (listaModelos.length > 0) {
                for (var i = 0; i < listaModelos.length; i++) {
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaModelos[i].descricao))
                            .append($('<td>').append(listaModelos[i].marca.descricao))
                            .append($('<td class="btnEdit">').append("<td data-toggle='modal' style='text-align-last: center; border: none;' onclick='buscarModeloPorID(" + listaModelos[i].id + ")'><button class='btn btn-outline-light btnEdit' type='button'><img src='img/editar.png' alt='Editar'></button></td>"))
                    )
                }
            } else {
                html += "<td colspan='5' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoModelos").html(html);
        }
    }
    buscarModeloPorID = function(id){
        exibeEditar();
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/buscarModeloPorId/" + id,
            success: function (modelo) {
                $("#descricaoEdit").val(modelo.descricao);
                $("#marcaEdit").append("<option value='"+modelo.marca.id+"' selected>" + modelo.marca.descricao + "</option>");
                $("#btnSalvarEdit").val(modelo.id);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        modelo = new Object();
        marca = new Object();
        modelo.id = $("#btnSalvarEdit").val();
        modelo.descricao = $("#descricaoEdit").val();
        marca.id = $("#marcaEdit").val();
        modelo.marca = marca;
        var cfg = {
            url: "../../rest/modeloRest/editModelo",
            data: JSON.stringify(modelo),
            success: function (succJson) {
                window.location.href = ("modelos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        modelo = new Object();
        marca = new Object();
        modelo.descricao = $("#descricao").val();
        marca.id = $("#marca").val();
        modelo.marca = marca;
        var cfg = {
            url: "../../rest/modeloRest/addModelo",
            data: JSON.stringify(modelo),
            success: function (succJson) {
                window.location.href = ("modelos.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscarMarcas = function () {
        $('#marcaEdit option').remove();
        $('#marca option').remove();
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscarMarcas/",
            success: function (listaMarcas) {
                if (listaMarcas != undefined) {
                    if (listaMarcas.length > 0) {
                        for (var i = 0; i < listaMarcas.length; i++) {
                            $('#marca').append("<option value='"+ listaMarcas[i].id +"'>" + listaMarcas[i].descricao + "</option>");
                            $('#marcaEdit').append("<option value='"+ listaMarcas[i].id +"'>" + listaMarcas[i].descricao + "</option>");
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

    buscarModelos();
    buscarMarcas();
});