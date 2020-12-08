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
    exibirEmpresas = function(listaEmpresas){
        var tbody = $('#tabEmpresas');        
        var html ="";
        if (listaEmpresas != undefined) {
            if (listaEmpresas.length > 0) {
                for (var i = 0; i < listaEmpresas.length; i++) {
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaEmpresas[i].descricao))
                            .append($('<td>').append(listaEmpresas[i].cnpj))
                            .append($('<td class="btnEdit">').append("<td data-toggle='modal' style='text-align-last: center; border: none;' onclick='buscarEmpresaPorID(" + listaEmpresas[i].id + ")'><button class='btn btn-outline-light btnEdit' type='button'><img src='img/editar.png' alt='Editar'></button></td>"))
                    )
                }
            } else {
                html += "<td colspan='5' style='text-align: center; padding-left: 14rem;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoEmpresas").html(html);
        }
    }
    buscarEmpresaPorID = function(id){
        exibeEditar();
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscarEmpresaPorId/" + id,
            success: function (empresa) {
                $("#razaoSocialEdit").val(empresa.descricao);
                $("#cnpjEdit").val(empresa.cnpj);
                $("#btnSalvarEdit").val(empresa.id);
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        empresa = new Object();
        empresa.id = $("#btnSalvarEdit").val();
        empresa.cnpj = $("#cnpjEdit").val();
        empresa.descricao = $("#razaoSocialEdit").val();
        empresa.descricao = empresa.descricao.replace(/\./g, "");
        empresa.descricao = empresa.descricao.replace(/\//g, "");
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
        empresa.descricao = empresa.descricao.replace(/\./g, "");
        empresa.descricao = empresa.descricao.replace(/\//g, "");
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