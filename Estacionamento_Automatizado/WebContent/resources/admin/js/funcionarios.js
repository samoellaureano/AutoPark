var funcionario = null;
var empresa = null;
var usuario = null;
$(document).ready(function(){
    $("#menu").load("menu.html");
    $("#cpf").mask('000.000.000-00');

    buscar = function(){
        var valorBusca = $("#buscarFunc").val();
        var cfg = {
            type: "POST",
            url: "../rest/funcionarioRest/buscarFuncionarios/" + valorBusca,
            success: function (listaDeFuncionarios) {
                exibirFuncionarios(listaDeFuncionarios);
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirFuncionarios = function(listaDeFuncionarios){
        var funcionariosHTML = "<ul class='itemFuncionario'>";
        if (listaDeFuncionarios != undefined) {
            if (listaDeFuncionarios.length > 0) {
                for (var i = 0; i < listaDeFuncionarios.length; i++) {
                    if(listaDeFuncionarios.status[i]){
                        listaDeFuncionarios.status[i] = "checked";
                    }else{
                        listaDeFuncionarios.status[i] = "";
                    }
                    if(listaDeFuncionarios.perfil[i] == 0){
                        listaDeFuncionarios.perfil[i] = "<option value='0' selected>Administrador</option>"
                            +"<option value='1'>Funcionario</option>"
                            +"<option value='2'>Cliente</option></select>";
                    }else if(listaDeFuncionarios.perfil[i] == 1){
                        listaDeFuncionarios.perfil[i] = "<option value='0'>Administrador</option>"
                            +"<option value='1' selected>Funcionario</option>"
                            +"<option value='2'>Cliente</option></select>";
                    }else{
                        listaDeFuncionarios.perfil[i] = "<option value='0'>Administrador</option>"
                            +"<option value='1'>Funcionario</option>"
                            +"<option value='2' selected>Cliente</option></select>";
                    }
                    funcionariosHTML += "<input type='radio' name='funcionario' id='func"+i+"' hidden>"
                    +"<label for='func"+i+"'>"+listaDeFuncionarios.nome[i]+"</label>"
                    +"<li><label for='editar"+i+"'>Editar</label>"
                    +"<input type='checkbox' name='editar' id='editar"+i+"' hidden>"
                    +"<div><form><label for='nome'>Nome:</label><input type='text' id='nome"+i+"'"
                    +"value='"+listaDeFuncionarios.nome[i]+"'>"
                    +"<label for='celular'>Celular:</label><input type='text' id='celular"+i+"'"
                    +"value='"+listaDeFuncionarios.celular[i]+"'>"
                    +"<label for='email'>Email:</label><input type='text' id='email"+i+"'"
                    +"value='"+listaDeFuncionarios.email[i]+"'>"
                    +"<label for='perfil'>Perfil:</label>"
                    +"<select name='perfil' id='perfil"+i+"'>"
                    + listaDeFuncionarios.perfil[i]
                    +"<label for='status'>Status:<input type='checkbox' id='status"+i+"' "+ listaDeFuncionarios.status[i] +"></label>"
                    +"<div><a href=''>Cancelar</a>"
                    +"<button onclick='editarFuncionario("+i+")'>Confirmar</button></div></form></div></li>"
                }
                funcionariosHTML+="</ul>";
            } else {
                funcionariosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaFuncionariosHTML").append(funcionariosHTML);
        }
    }

    editarFuncionario = function(id){
        funcionario.nome = $("#nome"+id).val();
        funcionario.celular = $("#celular"+id).val();
        funcionario.email = $("#email"+id).val();
        funcionario.perfil = $("#perfil"+id).val();
        funcionario.status = $("#status"+id).val();

        var cfg = {
            url: "../rest/funcionarioRest/editarFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Funcionário editado com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
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

    $('#cadFuncionario').click(function(e){
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
                } else if(succJson == 2){
                    resp = ("O Funcionário ja existe!");
                    exibirMessagem(resp, 2);
                }else{
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

    buscar();

    $('#carrega-listaFuncionario').click(function(e){
        /*https://tableless.com.br/conteudo-sob-demanda-com-jquery/ */
    });
});

