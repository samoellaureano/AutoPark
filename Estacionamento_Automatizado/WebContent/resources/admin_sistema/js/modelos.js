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
                    if(listaModelos[i].ativo){
                        listaModelos[i].ativo = "Ativo";
                    }else{
                        listaModelos[i].ativo = "Inativo";
                    }
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaModelos[i].descricao))
                            .append($('<td>').append(listaModelos[i].marca.descricao))
                            .append($('<td>').append(listaModelos[i].ativo))
                            .append($('<td>').append("<div class='acoes'><a class='btnEdit' onclick='buscarModeloPorID(" + listaModelos[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirModeloPorID(" + listaModelos[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"))
                    )
                }
            } else {
                html += "<td colspan='3' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoModelos").html(html);
        }
    }
    buscarModeloPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/buscarModeloPorId/" + id,
            success: function (modelo) {
                $("#descricaoEdit").val(modelo.descricao);
                $("#marcaEdit").val(modelo.marca.id);
                $("#btnSalvarEdit").val(modelo.id);
                $("#ativoEdit").prop( "checked",modelo.ativo);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    excluirModeloPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/inativaModelo/" + id,
            success: function (succJson) {
                window.location.href = ("modelos.html");
            },
            error: function (errJson) {
                alert(errJson);
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
        modelo.ativo = $("#ativoEdit").is(':checked');
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