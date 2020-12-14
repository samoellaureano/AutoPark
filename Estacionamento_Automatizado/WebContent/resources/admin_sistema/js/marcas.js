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
    buscarMarcas = function () {
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/marcaRest/buscarMarcasPorDesc/"+busca,
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
        pagina = 0;
        dados = [];
        html = "";
        if (listaMarcas != undefined) {
            if (listaMarcas.length > 0) {
                for (var i = 0; i < listaMarcas.length; i++) {
                    if(listaMarcas[i].ativo){
                        listaMarcas[i].ativo = "Ativo";
                    }else{
                        listaMarcas[i].ativo = "Inativo";
                    }
                    dados.push([listaMarcas[i].descricao, listaMarcas[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarMarcaPorID(" + listaMarcas[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirMarcaPorID(" + listaMarcas[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                }
            } else {
                html += "<td colspan='3' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoMarcas").html(html);
        }
        paginar();
        ajustarBotoes();
    };
    
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
            url: "../../rest/marcaRest/excluirMarca/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("marcas.html");
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
        var msg = "";
        marca = new Object();
        marca.descricao = $("#descricaoEdit").val();
        marca.id = $("#btnSalvarEdit").val();
        marca.ativo = $("#ativoEdit").is(':checked');
        
        if(marca.descricao=="" || marca.descricao ==null || marca.descricao == undefined || marca.descricao =="null"){
            msg+="Campo descrição não preenchido."+"\n";
        };

        if(msg==""){
            alterarMarca(marca);
        }else{
          
            exibirMessagem(msg, 2);
        };
    });

    alterarMarca=function(marca){
        var cfg = {
            url: "../../rest/marcaRest/editMarca",
            data: JSON.stringify(marca),
            success: function (succJson) {
                window.location.href = ("marcas.html");
            },
            error: function (errJson) {
                resp = ("Erro ao alterar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#btnSalvar').click(function (e) {
        var msg="";
        marca = new Object();
        marca.descricao = $("#descricao").val();   

        if(marca.descricao=="" || marca.descricao ==null || marca.descricao == undefined || marca.descricao =="null"){
            msg+="Campo descrição não preenchido."+"\n";
        };

        if(msg==""){
            salvarMarca(marca);
        }else{            
            exibirMessagem(msg, 2);
        };        
    });

    salvarMarca=function(marca){     
           var cfg = {
            url: "../../rest/marcaRest/addMarca",
            data: JSON.stringify(marca),
            success: function (succJson) {
                window.location.href = ("marcas.html");
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    paginar = function () {        
        $('#tabMarcas > tbody > tr').remove();
        var tbody = $('#tabMarcas > tbody');
        var cont = 0;
        for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++) {
            cont++;
            tbody.append(
                $('<tr>')
                    .append($('<td>').append(dados[i][0]))
                    .append($('<td>').append(dados[i][1]))
                    .append($('<td>').append(dados[i][2]))
            )
        }

        if ((cont < tamanhoPagina) && (html == "")) {
            for (var i = cont; i < tamanhoPagina; i++) {
                tbody.append(
                    $('<tr>')
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
    buscarMarcas();
});