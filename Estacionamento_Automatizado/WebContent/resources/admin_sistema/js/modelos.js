var dados = [];
var tamanhoPagina = 7;
var pagina = 0;
var html;
$(document).ready(function(){
    $('#proximo').click(function () {
        if (pagina < dados.length / tamanhoPagina - 1) {
            pagina++;
            paginar();
            ajustarBotoes();
        }
    });
    $('#anterior').click(function () {
        if (pagina > 0) {
            pagina--;
            paginar();
            ajustarBotoes();
        }
    });
    $("#btnPaginacao").hide();
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
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/buscarModelosPorDesc/"+busca,
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
        pagina = 0;
        dados = [];
        html = "";
        if (listaModelos != undefined) {
            if (listaModelos.length > 0) {
                for (var i = 0; i < listaModelos.length; i++) {
                    if(listaModelos[i].ativo){
                        listaModelos[i].ativo = "Ativo";
                    }else{
                        listaModelos[i].ativo = "Inativo";
                    }
                    dados.push([listaModelos[i].descricao, listaModelos[i].marca.descricao, listaModelos[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarModeloPorID(" + listaModelos[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirModeloPorID(" + listaModelos[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                }
            } else {
                html += "<td colspan='4' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoModelos").html(html);
        }
        paginar();
        ajustarBotoes();
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
            url: "../../rest/modeloRest/excluirModelo/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("modelos.html");
                }else{
                    exibirMessagem("Este registro não pode ser excluido, pois já esta em uso!", 2);
                }
                
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
            url: "../../rest/marcaRest/buscarMarcasPorDesc/null",
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
    paginar = function () {        
        $('#tabModelos > tbody > tr').remove();
        var tbody = $('#tabModelos > tbody');
        var cont = 0;
        for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++) {
            cont++;
            tbody.append(
                $('<tr>')
                    .append($('<td>').append(dados[i][0]))
                    .append($('<td>').append(dados[i][1]))
                    .append($('<td>').append(dados[i][2]))
                    .append($('<td>').append(dados[i][3]))
            )
        }


        if ((cont < tamanhoPagina) && (html == "")) {
            for (var i = cont; i < tamanhoPagina; i++) {
                tbody.append(
                    $('<tr>')
                        .append($('<td>').append(""))
                        .append($('<td>').append(""))
                        .append($('<td>').append(""))
                        .append($('<td>').append(""))
                )
            }
        }

        if (html == "") {
            $("#btnPaginacao").show();
        }

        $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
    }

    ajustarBotoes = function () {
        $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina >= Math.ceil(dados.length / tamanhoPagina) - 1);
        $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
    }
    buscarModelos();
    buscarMarcas();
});