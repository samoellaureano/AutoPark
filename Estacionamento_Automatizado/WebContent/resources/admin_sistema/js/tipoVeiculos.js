var dados = [];
var tamanhoPagina = 7;
var pagina = 0;
var html;
$(document).ready(function(){
    $("#editar").hide();
    exibeEditar = function (val) {
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
    buscarTipoVeiculos = function () {
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculosPorDesc/" + busca,
            success: function (listaTiposVeiculos) {
                exibirTipoVeiculos(listaTiposVeiculos);
            },
            error: function (err) {
                resp = ("Erro ao buscar os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirTipoVeiculos = function(listaTiposVeiculos){
        pagina = 0;
        dados = [];
        html = "";
        if (listaTiposVeiculos != undefined) {
            if (listaTiposVeiculos.length > 0) {
                for (var i = 0; i < listaTiposVeiculos.length; i++) {
                    if(listaTiposVeiculos[i].ativo){
                        listaTiposVeiculos[i].ativo = "Ativo";
                    }else{
                        listaTiposVeiculos[i].ativo = "Inativo";
                    }
                    dados.push([listaTiposVeiculos[i].descricao, listaTiposVeiculos[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarTipoVeiculoPorID(" + listaTiposVeiculos[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirTiposVeiculoPorID(" + listaTiposVeiculos[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                }
            } else {
                html += "<td colspan='3' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoTiposVeiculos").html(html);
        }
        paginar();
        ajustarBotoes();
    }
    buscarTipoVeiculoPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculoPorId/" + id,
            success: function (tipoVeiculo) {
                $("#descricaoEdit").val(tipoVeiculo.descricao);
                $("#btnSalvarEdit").val(tipoVeiculo.id);
                $("#ativoEdit").prop( "checked",tipoVeiculo.ativo);
            },
            error: function (err) {
                resp = ("Erro ao Buscar os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }
    excluirTiposVeiculoPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/excluirTipoVeiculo/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("tipoVeiculos.html");
                }else{
                    exibirMessagem("Este registro não pode ser excluido, pois já esta em uso!", 2);
                }                
            },
            error: function (errJson) {
                resp = ("Erro ao Excluir os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        var msg="";
        tipoVeiculo = new Object();
        tipoVeiculo.descricao = $("#descricaoEdit").val();
        tipoVeiculo.id = $("#btnSalvarEdit").val();
        tipoVeiculo.ativo = $("#ativoEdit").is(':checked');

        if(tipoVeiculo.id=="" || tipoVeiculo.id ==null || tipoVeiculo.id == undefined || tipoVeiculo.id =="null"||tipoVeiculo.id == 'marca'){
            msg+="Tipo veiculo não cadastrado.<br/>";
        };
       
        if(tipoVeiculo.descricao=="" || tipoVeiculo.descricao ==null || tipoVeiculo.descricao == undefined || tipoVeiculo.descricao =="null"){
            msg+="Campo descrição não preenchido.";
        };

        if(msg==""){
            atualizarTipoVeiculo(tipoVeiculo);
        }else{            
            exibirMessagem(msg, 2);
        };        
    });

    atualizarTipoVeiculo=function(tipoVeiculo){
        var cfg = {
            url: "../../rest/tipoVeiculoRest/editTipoVeiculo",
            data: JSON.stringify(tipoVeiculo),
            success: function (succJson) {
                window.location.href = ("tipoVeiculos.html");
            },
            error: function (errJson) {
                resp = ("Erro ao alterar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#btnSalvar').click(function (e) {
        tipoVeiculo = new Object();
        tipoVeiculo.descricao = $("#descricao").val();
        var msg = "";
        if(tipoVeiculo.descricao=="" || tipoVeiculo.descricao ==null || tipoVeiculo.descricao == undefined || tipoVeiculo.descricao =="null"){
            msg+="Campo descrição não preenchido.";
        };
        if(msg==""){
            salvarTipoVeiculo(tipoVeiculo);
        }else{            
            exibirMessagem(msg, 2);
        };
    });
        salvarTipoVeiculo=function(tipoVeiculo){
                var cfg = {
                    url: "../../rest/tipoVeiculoRest/addTipoVeiculo",
                    data: JSON.stringify(tipoVeiculo),
                    success: function (succJson) {
                        window.location.href = ("tipoVeiculos.html");
                    },
                    error: function (errJson) {
                        resp = ("Erro ao salvar o cadastro!");
                        exibirMessagem(resp, 2); 
                    }
                };
                autoPark.ajax.post(cfg);            
        };

    paginar = function () {        
        $('#tabTipoVeiculos > tbody > tr').remove();
        var tbody = $('#tabTipoVeiculos > tbody');
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

    buscarTipoVeiculos();
});