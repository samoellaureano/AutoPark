var veiculo, marca, modelo, cliente, usuario;
$(document).ready(function () {
    $("#menu").load("menu.html");

    $('#cadVeiculo').click(function (e) {
        veiculo = new Object();
        marca = new Object();
        modelo = new Object();
        cliente = new Object();
        usuario = new Object();
        tipoVeiculo = new Object();

        marca.id = $("#marca").val();
        modelo.id = $("#modelo").val();
        tipoVeiculo.id = $("#tipoVeiculo").val();
        veiculo.cor = $("#cor").val();
        veiculo.ano = $("#ano").val();
        veiculo.placa = $("#placa").val();
        usuario.id = dadosSessao.id;

        cliente.usuario = usuario;
        modelo.marca = marca;
        veiculo.tipoVeiculo = tipoVeiculo;
        veiculo.modelo = modelo;
        veiculo.cliente = cliente;

        var cfg = {
            url: "../../rest/veiculoRest/addVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculo cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("veiculos.html");
                } else if (succJson == 2) {
                    resp = ("O Veiculo ja esta em uso!");
                    exibirMessagem(resp, 2);
                } else {
                    resp = ("Erro ao cadastrar um novo Veiculo!");
                    exibirMessagem(resp, 2);
                };
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });


    busca = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/veiculoRest/buscaVeiculos/" + dadosSessao.id,
            success: function (listaDeVeiculos) {
                visualizarVeiculos(listaDeVeiculos);
            },
            error: function (errJson) {
                resp = ("Erro ao buscar os dados!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    visualizarVeiculos = function (listaDeVeiculos) {

        var veiculoHtml = "";

        if (listaDeVeiculos != undefined) {
            if (listaDeVeiculos.length > 0) {
                for (var i = 0; i < listaDeVeiculos.length; i++) {
                    veiculoHtml += "<ul class='itemVeiculo'><input type='radio' name='veiculos' id='car" + i + "' hidden>"
                        + "<label for='car" + i + "'> " + listaDeVeiculos[i].placa + "</label><li>"
                        + "<label for='excluir" + i + "' onclick='excluiVeiculo("+listaDeVeiculos[i].id+")'>Excluir</label>"
                        + "<input type='checkbox' name='excluir' id='excluir" + i + "' hidden><div>"
                        + "<form><label for='marca'>Marca:</label>"
                        + "<input type='text' id='marca' value='"+listaDeVeiculos[i].modelo.marca.descricao+"'>"
                        + "<label for='modelo'>Modelo:</label>"
                        + "<input type='text' id='modelo' value='"+listaDeVeiculos[i].modelo.descricao+"'>"
                        + "<label for='cor'>Cor:</label>"
                        + "<input type='text' id='cor' value='"+listaDeVeiculos[i].cor+"'>"
                        + "<label for='ano'>Ano:</label>"
                        + "<input type='text' id='ano' value='"+listaDeVeiculos[i].ano+"' >"
                        + "<label for='placa'>Placa:</label>"
                        + "<input type='text' id='placa' value='" + listaDeVeiculos[i].placa + "'>"
                        + "</div></form></div></li></ul>";
                };
            } else {
                veiculoHtml += "<ul class='itemVeiculo'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
            };

        } else {
            veiculoHtml += "<ul class='itemVeiculo'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
        };
        $('#ListaDeVeiculosHtml').html(veiculoHtml);
    };

    atualizaVeiculo = function (id) {

        veiculo = new Object();
        veiculo.marca = $("#marca" + id).val();
        veiculo.modelo = $("#modelo" + id).val();
        veiculo.ano = $("#ano" + id).val();
        veiculo.placa1 = $("#placa" + id).val();

        var cfg = {
            url: "../rest/veiculoRest/updateVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                resp = ("Veiculo editado com sucesso!");
                exibirMessagem(resp, 1);
            },
            error: function (errJson) {
                resp = ("Erro ao editar o Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    excluiVeiculo = function (idVeiculo) {
        var cfg = {
            type: "POST",
            url: "../../rest/veiculoRest/excluiVeiculo/" + idVeiculo,
            success: function (succJson) {
                resp = ("Veiculo excluido com sucesso!");
                exibirMessagem(resp, 1);
                busca();
            },
            error: function (errJson) {
                resp = ("Erro ao excluir o Veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    buscaMarcas = function () {

        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscaMarcas/*",
            success: function (listaMarcas) {
                exibirMarcas(listaMarcas);
            },
            error: function (err) {
                alert("Erro ao buscar as marcas: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirMarcas = function (listaMarcas) {
        var html = "<option value='0'>Selecione</option>";
        for (var i = 0; i < listaMarcas.length; i++) {
            html += ("<option value='" + listaMarcas[i].id + "'>" + listaMarcas[i].descricao + "</option>");
        }
        $("#marca").html(html);
    }

    buscaModelos = function () {
        var valorBusca = $("#marca").val()
        var cfg = {
            type: "POST",
            url: "../../rest/modeloRest/buscaModelos/" + valorBusca,
            success: function (listaModelos) {
                exibirModelos(listaModelos);
            },
            error: function (err) {
                alert("Erro ao buscar as modelos: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirModelos = function (listaModelos) {
        var html = "<option value='0'>Selecione</option>";
        for (var i = 0; i < listaModelos.length; i++) {
            html += ("<option value='" + listaModelos[i].id + "'>" + listaModelos[i].descricao + "</option>");
        }

        $("#modelo").html(html);
    }

    buscaTipoVeiculos = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscaTipoVeiculos/*",
            success: function (listaTipoVeiculos) {
                exibirTipoVeiculos(listaTipoVeiculos);
            },
            error: function (err) {
                alert("Erro ao buscar as marcas: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    exibirTipoVeiculos = function (listaTipoVeiculos) {
        var html = "";
        for (var i = 0; i < listaTipoVeiculos.length; i++) {
            html += ("<option value='" + listaTipoVeiculos[i].id + "'>" + listaTipoVeiculos[i].descricao + "</option>");
        }
        $("#tipoVeiculo").html(html);
    }
    setTimeout(function () {
        busca();
        buscaMarcas();
        buscaTipoVeiculos();
    }, 500);
});