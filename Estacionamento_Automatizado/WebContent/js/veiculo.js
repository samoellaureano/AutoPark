var veiculo = new Object();
var marca = new Object();
var modelo = new Object();
var cliente = new Object();
$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "buscaDadosSessao",
        dataType: "JSON",
        success: function (sessao) {
          dadosSessao = sessao;
        },
        error: function () {
        }
    });
    
    $("#menu").load("menu.html");

    $('#cadVeiculo').click(function (e) {
        veiculo = new Object();
        marca = new Object();
        modelo = new Object();
        cliente = new Object();

        marca.id = $("#marca").val();
        modelo.id = $("#modelo").val();
        veiculo.ano = $("#ano").val();
        veiculo.placa = $("#placa").val();
        cliente.id = dadosSessao.id;

        modelo.marca = marca;
        veiculo.modelo = modelo;
        veiculo.cliente = cliente;

        var cfg = {
            url: "rest/veiculoRest/addVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculo cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("index.html");
                } else if (succJson == 2) {
                    resp = ("O Veiculo ja existe!");
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

    buscaMarcas = function () {

        var cfg = {
            type: "POST",
            url: "rest/marcaRest/buscaMarcas/*",
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
        var html="<option value='0'>Selecione</option>";
        for (var i = 0; i < listaMarcas.length; i++) {
            html += ("<option value='" + listaMarcas[i].id + "'>" + listaMarcas[i].descricao + "</option>");
        }    
        $("#marca").html(html);
    }

    buscaModelos = function () {
        var valorBusca = $("#marca").val()
        var cfg = {
            type: "POST",
            url: "rest/modeloRest/buscaModelos/" + valorBusca,
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
        var html="<option value='0'>Selecione</option>";
        for (var i = 0; i < listaModelos.length; i++) {
            html += ("<option value='" + listaModelos[i].id + "'>" + listaModelos[i].descricao + "</option>");
        }
    
        $("#modelo").html(html);
    }

    buscaMarcas();    
});