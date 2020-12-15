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
    $("#cnpjEdit").mask("99.999.999/9999-99");
    $("#editar").hide();
    exibeEditar = function (val) {
        if (val) {
            if (!$("#novo").val()) {
                $("#editar").show();
                $("#novo").hide();
                $("#novo").val(true);               
            };
        } else {
            if ($("#novo").val()) {
                $("#editar").hide();
                $("#novo").show();
                $("#novo").val(false);                 
            };
        };
    };
    buscarEstacionamentos = function () {
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/buscaEstacionamentosPorDesc/"+busca,
            success: function (listaEstacionamentos) {
                exibirEstacionamentos(listaEstacionamentos);
            },
            error: function (err) {
                resp = ("Erro ao realizar a busca!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirEstacionamentos = function(listaEstacionamentos){
        pagina = 0;
        dados = [];
        html = "";
        if (listaEstacionamentos != undefined) {
            if (listaEstacionamentos.length > 0) {
                for (var i = 0; i < listaEstacionamentos.length; i++) {
                    if(listaEstacionamentos[i].ativo){
                        listaEstacionamentos[i].ativo = "Ativo";
                    }else{
                        listaEstacionamentos[i].ativo = "Inativo";
                    }
                    dados.push([listaEstacionamentos[i].descricao, listaEstacionamentos[i].cnpj, listaEstacionamentos[i].endereco, listaEstacionamentos[i].vagas, listaEstacionamentos[i].empresa.descricao, listaEstacionamentos[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarEstacionamentoPorID(" + listaEstacionamentos[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirEstacionamentoPorID(" + listaEstacionamentos[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                };
            } else {
                html += "<td colspan='7' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            };
            $("#resultadoEstacionamentos").html(html);
            $(".maskcnpj").mask("99.999.999/9999-99");
        };
        paginar();
        ajustarBotoes();
        $(".maskcnpj").mask("99.999.999/9999-99");
    };
    mascaraCnpj=function(){
        $("#cnpj").mask("99.999.999/9999-99");        
    };
    mascaraCnpjEdit = function(){
        $("#cnpjEdit").mask("99.999.999/9999-99"); 
    };

    buscarEstacionamentoPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/buscarEstacionamentoPorId/" + id,
            success: function (estacionamento) {
                $("#descricaoEdit").val(estacionamento.descricao);
                $("#cnpjEdit").val(cnpjMask(estacionamento.cnpj));
                $("#enderecoEdit").val(estacionamento.endereco);
                $("#enderecoEdit").val(estacionamento.endereco);
                $("#vagasEdit").val(estacionamento.vagas);
                $("#empEdit").val(estacionamento.empresa.id);
                $("#btnSalvarEdit").val(estacionamento.id);
                $("#ativoEdit").prop( "checked",estacionamento.ativo);
               
            },
            error: function (err) {
                resp = ("Erro ao buscar dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    excluirEstacionamentoPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/excluirEstacionamento/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("estacionamentos.html");
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
    };
    $('#btnSalvarEdit').click(function (e) {
       
        estacionamento = new Object();
        empresa = new Object();
        estacionamento.id = $("#btnSalvarEdit").val();
        estacionamento.cnpj = $("#cnpjEdit").val();
        estacionamento.descricao = $("#descricaoEdit").val();
        estacionamento.endereco = $("#enderecoEdit").val();
        empresa.id = $("#empEdit").val();
        estacionamento.empresa = empresa;
        estacionamento.vagas = $("#vagasEdit").val();
        estacionamento.vagas = estacionamento.vagas.replace(/[^0-9]/g,'');
        estacionamento.cnpj = estacionamento.cnpj.replace(/\./g, "");
        estacionamento.cnpj = estacionamento.cnpj.replace(/\//g, "");
        estacionamento.cnpj = estacionamento.cnpj.replace(/\-/g, "");
        estacionamento.ativo = $("#ativoEdit").is(':checked');
        var msg="";

        if(estacionamento.descricao=="" || estacionamento.descricao ==null || estacionamento.descricao == undefined || estacionamento.descricao =="null"){
            msg="Campo Razão social não preenchido.<br/>";
        };

        if(estacionamento.cnpj.length != 14 || estacionamento.cnpj=="" || estacionamento.cnpj ==null || estacionamento.cnpj == undefined || estacionamento.cnpj =="null"){
            msg+="Campo CNPJ não preenchido.<br/>";
        };

        if( estacionamento.endereco=="" ||  estacionamento.endereco ==null ||  estacionamento.endereco == undefined ||  estacionamento.endereco =="null"){
            msg+="Campo Endereço não preenchido.<br/>";
        };
        
        if( estacionamento.vagas<1 || estacionamento.vagas=="" ||  estacionamento.vagas ==null ||   estacionamento.vagas == undefined ||   estacionamento.vagas =="null"){
            msg+="Campo Vagas não preenchido.<br/>";
        };

        if(msg==""){
            atualizaEstacionamento(estacionamento);
        }else{           
            exibirMessagem(msg, 2);
        };        
    });

    atualizaEstacionamento=function(estacionamento){
    
        var cfg = {
            url: "../../rest/estacionamentoRest/editEstacionamento",
            data: JSON.stringify(estacionamento),
            success: function (succJson) {
                window.location.href = ("estacionamentos.html");
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
        estacionamento = new Object();
        empresa = new Object();
        estacionamento.cnpj = $("#cnpj").val();
        estacionamento.descricao = $("#descricao").val();
        estacionamento.endereco = $("#endereco").val();
        empresa.id = $("#emp").val();
        estacionamento.empresa = empresa;
        estacionamento.vagas = $("#vagas").val();
        estacionamento.vagas = estacionamento.vagas.replace(/[^0-9]/g,'');
        estacionamento.cnpj = estacionamento.cnpj.replace(/\./g, "");
        estacionamento.cnpj = estacionamento.cnpj.replace(/\//g, "");
        estacionamento.cnpj = estacionamento.cnpj.replace(/\-/g, "");

        if(estacionamento.descricao=="" || estacionamento.descricao ==null || estacionamento.descricao == undefined || estacionamento.descricao =="null"){
            msg="Campo Razão social não preenchido.<br/>";
        };

        if(estacionamento.cnpj.length != 14 || estacionamento.cnpj=="" || estacionamento.cnpj ==null || estacionamento.cnpj == undefined || estacionamento.cnpj =="null"){
            msg+="Campo CNPJ não preenchido.<br/>";
        };

        if( estacionamento.endereco=="" ||  estacionamento.endereco ==null ||  estacionamento.endereco == undefined ||  estacionamento.endereco =="null"){
            msg+="Campo Endereço não preenchido.<br/>";
        };

        if( estacionamento.vagas<1 || estacionamento.vagas=="" ||  estacionamento.vagas ==null ||   estacionamento.vagas == undefined){
            msg+="Campo Vagas não preenchido.<br/>";
        };

        if(msg==""){
            salvarEstacionamento(estacionamento);
        }else{            
            exibirMessagem(msg, 2);
        };
    });    
        
    salvarEstacionamento=function(estacionamento){
        var cfg = {
            url: "../../rest/estacionamentoRest/addEstacionamento",
            data: JSON.stringify(estacionamento),
            success: function (succJson) {
                window.location.href = ("estacionamentos.html");
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    buscarEmpresas = function () {
        $('#empEdit option').remove();
        $('#emp option').remove();
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresasPorDesc/null",
            success: function (listaEmpresas) {
                if (listaEmpresas != undefined) {
                    if (listaEmpresas.length > 0) {
                        for (var i = 0; i < listaEmpresas.length; i++) {
                            $('#emp').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                            $('#empEdit').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                        }
                    }
                }
            },
            error: function (err) {                
                resp = ("Erro ao buscar dados");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    paginar = function () {        
        $('#tabEstacionamentos > tbody > tr').remove();
        var tbody = $('#tabEstacionamentos > tbody');
        var cont = 0;
        for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++) {
            cont++;
            tbody.append(
                $('<tr>')
                    .append($('<td>').append(dados[i][0]))
                    .append($("<td class='maskcnpj'>").append(dados[i][1]))
                    .append($('<td>').append(dados[i][2]))
                    .append($('<td>').append(dados[i][3]))
                    .append($('<td>').append(dados[i][4]))
                    .append($('<td>').append(dados[i][5]))
                    .append($('<td>').append(dados[i][6]))
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

    buscarEstacionamentos();
    buscarEmpresas();
});