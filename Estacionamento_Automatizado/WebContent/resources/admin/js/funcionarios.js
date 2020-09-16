var funcionario = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

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
                    if(listaDeFuncionarios.status){
                        listaDeFuncionarios.status = "checked";
                    }else{
                        listaDeFuncionarios.status = "";
                    }

                    if(listaDeFuncionarios.perfil == 0){
                        listaDeFuncionarios.perfil = "<option value='0' selected>Administrador</option>"
                            +"<option value='1'>Funcionario</option>"
                            +"<option value='2'>Cliente</option></select>";
                    }else if(listaDeFuncionarios.perfil == 1){
                        listaDeFuncionarios.perfil = "<option value='0'>Administrador</option>"
                            +"<option value='1' selected>Funcionario</option>"
                            +"<option value='2'>Cliente</option></select>";
                    }else{
                        listaDeFuncionarios.perfil = "<option value='0'>Administrador</option>"
                            +"<option value='1'>Funcionario</option>"
                            +"<option value='2' selected>Cliente</option></select>";
                    }
                    funcionariosHTML += "<input type='radio' name='funcionario' id='func"+i+"' hidden>"
                    +"<label for='func"+i+"'>"+listaDeFuncionarios.nome+"</label>"
                    +"<li><label for='editar"+i+"'>Editar</label>"
                    +"<input type='checkbox' name='editar' id='editar"+i+"' hidden>"
                    +"<div><form><label for='nome'>Nome:</label><input type='text' id='nome"+i+"'"
                    +"value='"+listaDeFuncionarios.nome+"'>"
                    +"<label for='celular'>Celular:</label><input type='text' id='celular"+i+"'"
                    +"value='"+listaDeFuncionarios.celular+"'>"
                    +"<label for='email'>Email:</label><input type='text' id='email"+i+"'"
                    +"value='"+listaDeFuncionarios.email+"'>"
                    +"<label for='perfil'>Perfil:</label>"
                    +"<select name='perfil' id='perfil"+i+"'>"
                    + listaDeFuncionarios.perfil
                    +"<label for='status'>Status:<input type='checkbox' id='status"+i+"' "+ listaDeFuncionarios.status +"></label>"
                    +"<div><a href=''>Cancelar</a>"
                    +"<button onclick='editarFuncionario("+i+")'>Confirmar</button></div></form></div></li>"
                }
                funcionariosHTML+="</ul><a href='' id='carrega-listaFuncionario'>Ver Mais</a>";
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
        funcionario.nome = $("#nome").val();
        funcionario.celular = $("#celular").val();
        funcionario.email = $("#email").val();
        funcionario.empresa = $("#empresa").val();

        var cfg = {
            url: "../rest/funcionarioRest/addFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Funcionário cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
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

