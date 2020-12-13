var dados = [];
var tamanhoPagina = 7;
var pagina = 0;
var html;
$(document).ready(function () {
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
            };
        } else {
            if ($("#novo").val()) {
                $("#editar").hide();
                $("#novo").show();
                $("#novo").val(false);
            };
        };
    };
    mascaraCnpj = function () {
        $("#cnpj").mask("99.999.999/9999-99");
    };
    mascaraCnpjEdit = function () {

        $("#cnpjEdit").mask("99.999.999/9999-99");
    };
    buscarEmpresas = function () {
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresasPorDesc/"+busca,
            success: function (listaEmpresas) {
                exibirEmpresas(listaEmpresas);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirEmpresas = function (listaEmpresas) {
        pagina = 0;
        dados = [];
        html = "";
        if (listaEmpresas != undefined) {
            if (listaEmpresas.length > 0) {
                for (var i = 0; i < listaEmpresas.length; i++) {
                    if (listaEmpresas[i].ativo) {
                        listaEmpresas[i].ativo = "Ativo";
                    } else {
                        listaEmpresas[i].ativo = "Inativo";
                    }
                    dados.push([listaEmpresas[i].descricao, listaEmpresas[i].cnpj, listaEmpresas[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarEmpresaPorID(" + listaEmpresas[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirEmpresaPorID(" + listaEmpresas[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                };
            } else {
                html += "<td colspan='4' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            };
            $("#resultadoEmpresas").html(html);
           
        };
        paginar();
        ajustarBotoes();
        $(".maskcnpj").mask("99.999.999/9999-99");
    };
    buscarEmpresaPorID = function (id) {
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscarEmpresaPorId/" + id,
            success: function (empresa) {
                
                $("#razaoSocialEdit").val(empresa.descricao);             
                $("#cnpjEdit").val(cnpjMask(empresa.cnpj));                               
                $("#btnSalvarEdit").val(empresa.id);
                $("#ativoEdit").prop( "checked",empresa.ativo);
                
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    excluirEmpresaPorID = function (id) {
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/excluirEmpresa/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("empresas.html");
                }else{
                    alert("Este registro não pode ser excluido, pois já esta em uso!")
                }
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    };
    $('#btnSalvarEdit').click(function (e) { // separa em duas funções captura dos campos e requizição
        
        empresa = new Object();
        empresa.id = $("#btnSalvarEdit").val();
        empresa.cnpj = $("#cnpjEdit").val();
        empresa.descricao = $("#razaoSocialEdit").val();

        empresa.cnpj = empresa.cnpj.replace(/\./g, "");
        empresa.cnpj = empresa.cnpj.replace(/\//g, "");
        empresa.cnpj = empresa.cnpj.replace(/\-/g, "");
        empresa.ativo = $("#ativoEdit").is(':checked');    
        
        if(empresa.descricao=="" || empresa.descricao ==null || empresa.descricao == undefined || empresa.descricao =="null"){
            msg+="Campo Razão social não preenchido.<br/>";
        };

        if(empresa.cnpj=="" || empresa.cnpj ==null || empresa.cnpj == undefined || empresa.descricao =="null"){
            msg+="Campo CNPJ não preenchido."+"\n";
        };

        if(msg==""){
            atualizaEmpresa(empresa);
        }else{
            exibirMessagem(msg, 2);
        };        
    });
      
    atualizaEmpresa = function(empresa){
      
        var cfg = {
            url: "../../rest/empresaRest/editEmpresa",
            data: JSON.stringify(empresa),
            success: function (succJson) {
                window.location.href = ("empresas.html");                
            },
            error: function (errJson) {
                resp = ("Erro ao alterar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#btnSalvar').click(function (e) {  // separa em duas funções captura dos campos e requizição
        var msg = "";
        empresa = new Object();

        empresa.id = $("#btnSalvar").val();
        empresa.cnpj = $("#cnpj").val();
        empresa.descricao = $("#razaoSocial").val();
        empresa.cnpj = empresa.cnpj.replace(/\./g, "");
        empresa.cnpj = empresa.cnpj.replace(/\//g, "");
        empresa.cnpj = empresa.cnpj.replace(/\-/g, "");

        if(empresa.descricao=="" || empresa.descricao ==null || empresa.descricao == undefined || empresa.descricao =="null"){
            msg+="Campo Razão social não preenchido.<br/>";
        };

        if(empresa.cnpj=="" || empresa.cnpj ==null || empresa.cnpj == undefined || empresa.descricao =="null"){
            msg+="Campo CNPJ não preenchido.";
        };

        if(msg==""){
            salvarEmpresa(empresa);
        }else{            
            exibirMessagem(msg, 2);
        };
        
    });

    salvarEmpresa=function(empresa){
        var cfg = {
            url: "../../rest/empresaRest/addEmpresa",
            data: JSON.stringify(empresa),
            success: function (succJson){ 
                window.location.href = ("empresas.html");                                
            },
            error: function (errJson) {
                resp = ("Erro ao realizar o cadastro!");
                exibirMessagem(resp, 2); 
            }
        };
        autoPark.ajax.post(cfg);
    };

    paginar = function () {        
        $('#tabEmpresas > tbody > tr').remove();
        var tbody = $('#tabEmpresas > tbody');
        var cont = 0;
        for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++) {
            cont++;
            tbody.append(
                $('<tr>')
                    .append($('<td>').append(dados[i][0]))
                    .append($("<td class='maskcnpj'>").append(dados[i][1]))
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
                        .append($('<td>').append("&nbsp;"))
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

    buscarEmpresas();
});