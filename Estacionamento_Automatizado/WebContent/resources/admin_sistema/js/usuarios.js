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
    buscarUsuarios = function () {
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscarFuncionarios/",
            success: function (listaUsuarios) {
                exibirUsuarios(listaUsuarios);
            },
            error: function (err) {
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };
    exibirUsuarios = function(listaUsuarios){
        var tbody = $('#tabUsuarios');        
        var html ="";
        if (listaUsuarios != undefined) {
            if (listaUsuarios.length > 0) {
                for (var i = 0; i < listaUsuarios.length; i++) {
                    tbody.append(
                        $('<tr>')
                            .append($('<td>').append(listaUsuarios[i].nome))
                            .append($("<td class='maskcpf'>").append(listaUsuarios[i].usuario.cpf))
                            .append($("<td class='maskTel'>").append(listaUsuarios[i].celular))
                            .append($('<td>').append(listaUsuarios[i].email))
                            .append($('<td>').append(listaUsuarios[i].empresa.descricao))
                            .append($('<td>').append("<div class='acoes'><a class='btnEdit' onclick='buscarUsuarioPorID(" + listaUsuarios[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirUsuarioPorID(" + listaUsuarios[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"))
                    )
                }
            } else {
                html += "<td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoUsuarios").html(html);
            $(".maskcpf").mask("999.999.999-99");
            $(".maskTel").mask("(00) 0000-00009");
        };
    };
    mascaraCpf=function(){
        $("#cpf").mask("999.999.999-99");

    };
    buscarUsuarioPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscaDados/" + id,
            success: function (funcionario) {
                $("#nomeEdit").val(funcionario.nome);
                $("#cpfEdit").val(funcionario.usuario.cpf);                
                $("#celularEdit").val(mtel(funcionario.celular));
                $("#emailEdit").val(funcionario.email);
                $("#empEdit").val(funcionario.empresa.id);
                $("#btnSalvarEdit").val(funcionario.id);
                $("#cpfEdit").mask("999.999.999-99");
            },
            error: function (err) {
                alert("Erro ao editar o servico!" + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    excluirUsuarioPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/inativaFuncionario/" + id,
            success: function (succJson) {
                window.location.href = ("usuarios.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    }
    $('#btnSalvarEdit').click(function (e) {
        funcionario = new Object();
        empresa = new Object();
        usuario = new Object();
        funcionario.id = $("#btnSalvarEdit").val();
        usuario.cpf = $("#cpfEdit").val();
        usuario.cpf = usuario.cpf.replace(/\./g, "");
        usuario.cpf = usuario.cpf.replace(/\-/g, "");
        funcionario.usuario = usuario;
        funcionario.nome = $("#nomeEdit").val();
        funcionario.celular = $("#celularEdit").val();
        empresa.id = $("#empEdit").val();
        funcionario.empresa = empresa;
        funcionario.email = $("#emailEdit").val();
        var cfg = {
            url: "../../rest/funcionarioRest/editFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                window.location.href = ("usuarios.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    $('#btnSalvar').click(function (e) {
        funcionario = new Object();
        empresa = new Object();
        usuario = new Object();
        funcionario.id = $("#btnSalvarEdit").val();
        usuario.cpf = $("#cpf").val();
        usuario.cpf = usuario.cpf.replace(/\./g, "");
        usuario.cpf = usuario.cpf.replace(/\-/g, "");
        usuario.perfil = 2; 
        funcionario.usuario = usuario;
        funcionario.nome = $("#nome").val();
        funcionario.celular = $("#celular").val();
        empresa.id = $("#emp").val();
        funcionario.empresa = empresa;
        funcionario.email = $("#email").val();
        var cfg = {
            url: "../../rest/funcionarioRest/addFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                window.location.href = ("usuarios.html");
            },
            error: function (errJson) {
                alert(errJson);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscarEmpresas = function () {
        $('#empEdit option').remove();
        $('#emp option').remove();
        $('#emp').append("<option value=''>Selecione</option>");
        $('#empEdit').append("<option value=''>Selecione</option>");
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresas/",
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
                alert("Erro ao buscar dados: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    };

    buscarUsuarios();
    buscarEmpresas();
});