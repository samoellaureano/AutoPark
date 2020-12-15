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
    buscarUsuarios = function () {
        var busca = $("#busca").val();
        if(busca == ""){
            busca = ("null");
        }
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscarFuncionariosPorDesc/"+busca,
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
        pagina = 0;
        dados = [];
        html = "";
        if (listaUsuarios != undefined) {
            if (listaUsuarios.length > 0) {
                for (var i = 0; i < listaUsuarios.length; i++) {
                    if(listaUsuarios[i].ativo){
                        listaUsuarios[i].ativo = "Ativo";
                    }else{
                        listaUsuarios[i].ativo = "Inativo";
                    }
                    dados.push([listaUsuarios[i].nome, listaUsuarios[i].usuario.cpf, listaUsuarios[i].celular, listaUsuarios[i].email, listaUsuarios[i].empresa.descricao, listaUsuarios[i].ativo, "<div class='acoes'><a class='btnEdit' onclick='buscarUsuarioPorID(" + listaUsuarios[i].id + ")'><img src='img/editar.png' alt='Editar'></a><a class='btnEdit' onclick='excluirUsuarioPorID(" + listaUsuarios[i].id + ")'><img src='img/apagar.png' alt='Apagar'></a><div>"]);
                }
            } else {
                html += "<td colspan='7' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
            }
            $("#resultadoUsuarios").html(html);            
        };
        paginar();
        ajustarBotoes();
        $(".maskcpf").mask("999.999.999-99");
        $(".maskTell").mask("(00) 0000-00009");
    };

    mascaraCpf=function(){
        $("#cpf").mask("999.999.999-99");
    };

    maskTellEdit=function(){
        $("#celularEdit").mask("(00) 0000-00009");
    };
    maskTell=function(){
        $("#celular").mask("(00) 0000-00009");
    };

    buscarUsuarioPorID = function(id){
        exibeEditar(true);
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscaDados/" + id,
            success: function (funcionario) {
                $("#nomeEdit").val(funcionario.nome);
                $("#cpfEdit").val(mCPF(funcionario.usuario.cpf));                
                $("#celularEdit").val(mtel(funcionario.celular));
                $("#emailEdit").val(funcionario.email);
                $("#empEdit").val(funcionario.empresa.id);
                $("#btnSalvarEdit").val(funcionario.id);                
                $("#ativoEdit").prop( "checked",funcionario.ativo);
                $("#cpfEdit").mask("999.999.999-99");
            },
            error: function (err) {
                resp = ("Erro ao realizar a busca!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    excluirUsuarioPorID = function(id){
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/excluirFuncionario/" + id,
            success: function (succJson) {
                if(succJson){
                    window.location.href = ("usuarios.html");
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
        funcionario = new Object();
        empresa = new Object();
        usuario = new Object();
        funcionario.id = $("#btnSalvarEdit").val();//
        usuario.cpf = $("#cpfEdit").val();
        usuario.cpf = usuario.cpf.replace(/\./g, "");
        usuario.cpf = usuario.cpf.replace(/\-/g, "");
        usuario.perfil = 2;
        funcionario.usuario = usuario;
        funcionario.nome = $("#nomeEdit").val();
        funcionario.celular = $("#celularEdit").val();
        funcionario.celular = funcionario.celular.replace(/[^0-9]/g, '');
        empresa.id = $("#empEdit").val();
        funcionario.empresa = empresa;
        funcionario.email = $("#emailEdit").val();
        funcionario.ativo = $("#ativoEdit").is(':checked');

        var msg="";

        if(usuario.cpf.length!=11||usuario.cpf=="" || usuario.cpf ==null || usuario.cpf == undefined || usuario.cpf =="null" || usuario.cpf.length<11 ){
            msg+="Campo CPF não preenchido.<br/>";
        };

        if( funcionario.nome=="" ||  funcionario.nome ==null ||  funcionario.nome == undefined ||  funcionario.nome =="null"){
            msg+="Campo nome não preenchido.<br/>";
        };

        if( funcionario.celular.length!=11||funcionario.celular=="" ||  funcionario.celular ==null ||   funcionario.celular == undefined ||   funcionario.celular =="null" ||  funcionario.celular.length <0 ){
            msg+="Campo Telefone não preenchido.<br/>";
        };

        if( empresa.id=="selecione"){
            msg+="Campo Empresa não seleconado.<br/>";
        };

        if( funcionario.email.indexOf("@") == -1 ||  funcionario.email.indexOf(".") == -1 ||   funcionario.email == ""){
            msg+="Campo E-mail não preenchido.<br/>";
        };

        if(msg==""){
            atualizarFuncionario(funcionario);
        }else{           
            exibirMessagem(msg, 2);
        };

    
    });

    atualizarFuncionario=function(funcionario){

        var cfg = {
            url: "../../rest/funcionarioRest/editFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                window.location.href = ("usuarios.html");
            },
            error: function (errJson) {
                resp = ("Erro ao Editar os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#btnSalvar').click(function (e) {
        funcionario = new Object();
        empresa = new Object();
        usuario = new Object();
        
        funcionario.id = $("#btnSalvarEdit").val();
        usuario.cpf = $("#cpf").val();
        usuario.cpf = usuario.cpf.replace(/\./g, "");
        usuario.cpf = usuario.cpf.replace(/\-/g, "");
        
        if($("#admSistema").is(':checked')){
            usuario.perfil = 3; 
        }else{
            usuario.perfil = 2;
        };

        funcionario.usuario = usuario;
        funcionario.nome = $("#nome").val();
        funcionario.celular = $("#celular").val();
        funcionario.celular = funcionario.celular.replace(/[^0-9]/g, '');
        empresa.id = $("#emp").val();
        funcionario.empresa = empresa;
        funcionario.email = $("#email").val(); 

        var msg="";

        if(usuario.cpf.length!=11||usuario.cpf=="" || usuario.cpf ==null || usuario.cpf == undefined || usuario.cpf =="null" || usuario.cpf.length<11 ){
            msg+="Campo CPF não preenchido.<br/>";
        };

        if( funcionario.nome=="" ||  funcionario.nome ==null ||  funcionario.nome == undefined ||  funcionario.nome =="null"){
            msg+="Campo nome não preenchido.<br/>";
        };

        if( funcionario.celular.length!=11||funcionario.celular=="" ||  funcionario.celular ==null ||   funcionario.celular == undefined ||   funcionario.celular =="null" ||  funcionario.celular.length <0 ){
            msg+="Campo Telefone não preenchido.<br/>";
        };

        if( empresa.id=="selecione"){
            msg+="Campo Empresa não seleconado.<br/>";
        };

        if( funcionario.email.indexOf("@") == -1 ||  funcionario.email.indexOf(".") == -1 ||   funcionario.email == ""){
            msg+="Campo E-mail não preenchido.<br/>";
        };

        if(msg==""){
            salvarFuncionario(funcionario);
        }else{           
            exibirMessagem(msg, 2);
        };

    });

    salvarFuncionario=function(funcionario) {
        
          
        var cfg = {
            url: "../../rest/funcionarioRest/addFuncionario",
            data: JSON.stringify(funcionario),
            success: function (succJson) {
                window.location.href = ("usuarios.html");
            },
            error: function (errJson) {
                resp = ("Erro ao salvar os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    buscarEmpresas = function () {
        $('#empEdit option').remove();
        $('#emp option').remove();
        $('#emp').append("<option value='selecione'>Selecione</option>");
        $('#empEdit').append("<option value='selecione'>Selecione</option>");
        var cfg = {
            type: "POST",
            url: "../../rest/empresaRest/buscaEmpresasPorDesc/null",
            success: function (listaEmpresas) {
                if (listaEmpresas != undefined) {
                    if (listaEmpresas.length > 0) {
                        for (var i = 0; i < listaEmpresas.length; i++) {
                            $('#emp').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                            $('#empEdit').append("<option value='"+ listaEmpresas[i].id +"'>" + listaEmpresas[i].descricao + "</option>");
                        };
                    };
                };
            },
            error: function (err) {
                resp = ("Erro ao Bscar os dados");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    paginar = function () {        
        $('#tabUsuarios > tbody > tr').remove();
        var tbody = $('#tabUsuarios > tbody');
        var cont = 0;
        for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++) {
            cont++;
            tbody.append(
                $('<tr>')
                    .append($('<td>').append(dados[i][0]))
                    .append($("<td class='maskcpf'>").append(dados[i][1]))
                    .append($("<td class='maskTell'>").append(dados[i][2]))
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

    buscarUsuarios();
    buscarEmpresas();
});