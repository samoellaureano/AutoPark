
$(document).ready(function () {

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
    mascaraCnpj = function(){
        $("#cnpj").mask("99.999.999/9999-99");
    };
    mascaraCnpjEdit = function(){    

        $("#cnpjEdit").mask("99.999.999/9999-99"); 
    };
    buscarEmpresas = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresas/",
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
        var tbody = $('#tabEmpresas');
        var html = "";
        if (listaEmpresas != undefined) {
            if (listaEmpresas.length > 0) {
                for (var i = 0; i < listaEmpresas.length; i++) {
                    if(listaEmpresas[i].ativo){
                        listaEmpresas[i].ativo = "Ativo";
                    }else{
                        listaEmpresas[i].ativo = "Inativo";
                    }
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaEmpresas[i].descricao))
                            .append($("<td class='maskcnpj'>").append(listaEmpresas[i].cnpj))
                            .append($("<td>").append(listaEmpresas[i].ativo))
                            .append($('<td>').append("<div class='acoes'><a class='btnEdit' onclick='buscarEmpresaPorID(" + listaEmpresas[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirEmpresaPorID(" + listaEmpresas[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"))
                    );
                };
            } else {
                html += "<td colspan='3' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            };
            $("#resultadoEmpresas").html(html);
            $(".maskcnpj").mask("99.999.999/9999-99");
        };
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
    excluirEmpresaPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/inativaEmpresa/" + id,
            success: function (succJson) {
                window.location.href = ("empresas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    };
    $('#btnSalvarEdit').click(function (e) {
        empresa = new Object();
        empresa.id = $("#btnSalvarEdit").val();
        empresa.cnpj = $("#cnpjEdit").val();
        empresa.descricao = $("#razaoSocialEdit").val();
        empresa.cnpj = empresa.cnpj.replace(/\./g, "");
        empresa.cnpj = empresa.cnpj.replace(/\//g, "");
        empresa.cnpj = empresa.cnpj.replace(/\-/g, "");
        empresa.ativo = $("#ativoEdit").is(':checked');
        var cfg = {
            url: "../../rest/empresaRest/editEmpresa",
            data: JSON.stringify(empresa),
            success: function (succJson) {
                window.location.href = ("empresas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        empresa = new Object();
        empresa.id = $("#btnSalvar").val();
        empresa.cnpj = $("#cnpj").val();
        empresa.descricao = $("#razaoSocial").val();
        empresa.cnpj = empresa.cnpj.replace(/\./g, "");
        empresa.cnpj = empresa.cnpj.replace(/\//g, "");
        empresa.cnpj = empresa.cnpj.replace(/\-/g, "");
        var cfg = {
            url: "../../rest/empresaRest/addEmpresa",
            data: JSON.stringify(empresa),
            success: function (succJson) {
                window.location.href = ("empresas.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscarEmpresas();
});