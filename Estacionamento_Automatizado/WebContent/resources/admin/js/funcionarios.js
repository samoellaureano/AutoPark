var funcionario = null;
var empresa = null;
var usuario = null;
var funcionarios = [];
$(document).ready(function () {
    $("#menu").load("menu.html");
    $("#cpf").mask('000.000.000-00');

    buscar = function () {
        var valorBusca = $("#buscarFunc").val();
        if (valorBusca == "") {
            valorBusca = null;
        }
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscaFuncionarios/" + valorBusca,
            success: function (listaDeFuncionarios) {
                exibirFuncionarios(listaDeFuncionarios);
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }

    exibirFuncionarios = function (listaDeFuncionarios) {
        var funcionariosHTML = "";
        var ativo = "";
        funcionarios = [];
        if (listaDeFuncionarios != undefined) {
            if (listaDeFuncionarios.length > 0) {
                for (var i = 0; i < listaDeFuncionarios.length; i++) {
                    
                    funcionarios.push(listaDeFuncionarios[i].nome);
                                       
                    funcionariosHTML += "<ul class='itemFuncionario'>";
                    if (listaDeFuncionarios[i].ativo) {
                        ativo = true;
                        listaDeFuncionarios[i].ativo = "checked";
                    } else {
                        ativo = false;
                        listaDeFuncionarios[i].ativo = "";
                    }
                    if (listaDeFuncionarios[i].usuario.perfil == 1) {
                        listaDeFuncionarios[i].usuario.perfil = "<option value='2'>Administrador</option>"
                            + "<option value='1' selected>Funcionario</option>";
                    } else {
                        listaDeFuncionarios[i].usuario.perfil = "<option value='2' selected>Administrador</option>"
                            + "<option value='1'>Funcionario</option>";
                    }
                    funcionariosHTML += "<input type='radio' name='funcionario' id='func" + i + "' hidden>"
                        + "<label for='func" + i + "'>" + listaDeFuncionarios[i].nome + "</label>"
                        + "<li><label for='editar" + i + "'>Editar</label>"
                        + "<input type='checkbox' name='editar' id='editar" + i + "' hidden>"
                        + "<div><form><label for='nome'>Nome:</label><input type='text' id='nome" + i + "'"
                        + "value='" + listaDeFuncionarios[i].nome + "'>"
                        + "<label for='celular'>Celular:</label><input type='text' id='celular" + i + "'"
                        + "value='" + listaDeFuncionarios[i].celular + "'>"
                        + "<label for='email'>Email:</label><input type='text' id='email" + i + "'"
                        + "value='" + listaDeFuncionarios[i].email + "'>"
                        + "<label for='perfil'>Perfil:</label>"
                        + "<select name='perfil' id='perfil" + i + "'>"
                        + listaDeFuncionarios[i].usuario.perfil
                        + "</select><label for='status" + i + "'>Ativo:<input type='checkbox' id='status" + i + "' " + listaDeFuncionarios[i].ativo + " value='" + ativo + "' onclick='alteraStatus(" + i + ")'></label>"
                        + "<div><a href=''>Cancelar</a>"
                        + "<button type='button' onclick='editarFuncionario(" + i + "," + listaDeFuncionarios[i].id + "," + listaDeFuncionarios[i].usuario.id + ")'>Confirmar</button></div></form></div></li></ul>";
                }
            } else {
                funcionariosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaFuncionariosHTML").html(funcionariosHTML);
            $("#buscarFunc").autocomplete({
                source: funcionarios
            }); 
        }
    }

    editarFuncionario = function (i, id, idUsuario) {
        funcionario = new Object();
        usuario = new Object();
        funcionario.nome = $("#nome" + i).val();
        funcionario.celular = $("#celular" + i).val();
        funcionario.email = $("#email" + i).val();
        funcionario.ativo = $("#status" + i).val();
        funcionario.id = id;
        usuario.perfil = $("#perfil" + i).val();
        usuario.id = idUsuario;
        funcionario.usuario = usuario;
        var cfg = {
            url: "../../rest/funcionarioRest/atualizaFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Funcionário editado com sucesso!");
                    exibirMessagem(resp, 1);
                } else {
                    resp = ("Erro ao editar o funcionário!");
                    exibirMessagem(resp, 2);
                }
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao editar o funcionário!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#cadFuncionario').click(function (e) {
        funcionario = new Object();
        empresa = new Object();
        usuario = new Object();

        empresa.id = $("#empresa").val();
        usuario.cpf = $("#cpf").val();
        usuario.cpf = usuario.cpf.replace(/\./g, "");
        usuario.cpf = usuario.cpf.replace(/\-/g, "");
        funcionario.celular = $("#celular").val();
        funcionario.celular = funcionario.celular.replace(/[^0-9]/g, '');
        usuario.senha = btoa(usuario.cpf);
        funcionario.nome = $("#nome").val();
        funcionario.email = $("#email").val();
        funcionario.empresa = empresa;
        funcionario.usuario = usuario;

        var cfg = {
            url: "../../rest/funcionarioRest/addFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Funcionário cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("funcionarios.html");
                } else if (succJson == 2) {
                    resp = ("O Funcionário ja existe!");
                    exibirMessagem(resp, 2);
                } else {
                    resp = ("Erro ao cadastrar um novo funcionário!");
                    exibirMessagem(resp, 2);
                }

                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo funcionário!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
    setTimeout(function () {
        buscar();
    }, 500);

    alteraStatus = function (i) {
        var status = $("#status" + i).val();
        console.log($("#status" + i).val());
        if (status == "true") {
            $("#status" + i).val(false);
        } else {
            $("#status" + i).val(true);
        }
        console.log($("#status" + i).val());
    }

    $('#carrega-listaFuncionario').click(function (e) {
        /*https://tableless.com.br/conteudo-sob-demanda-com-jquery/ */
    });
});

