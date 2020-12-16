var tabelaPreco = new Object();
var es = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    buscar = function(){
        var cfg = {
            type: "POST",
            url: "../../rest/tabelaDePrecoRest/buscarPrecos/" + dadosSessao.empresa,
            success: function (listaDePrecos) {
                exibirPrecos(listaDePrecos);                
            },
            error: function (err) {
                alert("Erro ao buscar: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirPrecos = function(listaDePrecos){
        var precosHTML = "<ul class='itemEstac'>";
        if (listaDePrecos != undefined) {
            if (listaDePrecos.length > 0) {
                for (var i = 0; i < listaDePrecos.length; i++) {
                    
                    precosHTML += "<input type='radio' name='estac' id='est"+i+"' value='"+listaDePrecos[i].estacionamento.descricao+"' hidden>"
                    +"<label for='est"+i+"'>"+listaDePrecos[i].estacionamento.descricao+"</label>";
                    
                    for (var j = 0; j < listaDePrecos.length; j++) {

                        precosHTML +=" <li><input type='checkbox' name='preco' id='prec"+j+"' hidden>"
                        +"<label for='prec"+j+"'>"+listaDePrecos[i].tipoVeiculo.descricao+"-"+listaDePrecos[j].descricao+"</label><ul>"
                        +"<label for='editar"+j+"'>Editar</label>"
                        +"<input type='checkbox' id='editar"+j+"' hidden>"
                        +"<div><form><label for='valor"+j+"'>Valor:</label>"
                        +"<input min='0' type='number' id='valor"+j+"' value='"+listaDePrecos[j].valor+"'>"
                        +"<label for='tipoVeiculo"+j+"'>Tipo de Veículo:</label>"
                        +"<select name='tipoVeiculo' id='tipoVeiculo"+j+">"+listaOpcoes                          
                        +"</select>"
                        +"<label for='tipoCobranca"+j+"'>Tipo de Cobrança:</label>"
                        +"<select name='estacionamento' id='tipoCobranca"+j+"'>"
                        +"<option value='hora'>Hora</option>"
                        +"<option value='dia'>Dia</option>"
                        +"<option value='semana'>Semana</option>"
                        +"<option value='mes'>Mês</option></select>"
                        +"<label for='status"+j+"'>Status:"
                        +"<input type='checkbox' id='status"+j+"'checked'></label>"
                        +"<div><a href=''>Cancelar</a>"
                        +"<button onClick='editarPreco("+i+","+j+")'>Confirmar</button>"
                        +"</div></form></div></ul></li>"
                    }
                    precosHTML +="</ul>";                   
                }
            } else {
                precosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaPrecosHTML").append(precosHTML);            
        }
    }

    buscaTipoVeiculo=function () {
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculosPorDesc/null",
            success: function (listaTipoVeiculo) { 
                if (listaTipoVeiculo != undefined){
                    if (listaTipoVeiculo.length > 0) {
                        for (var i = 0; i < listaTipoVeiculo.length; i++) {
                            $("#tipoVeiculo").append("<option value='"+listaTipoVeiculo[i].id+"'>"+listaTipoVeiculo[i].descricao+"</option>");
                        };
                    };
                };
            },
            error: function (err) {
                alert("Erro ao buscar tipo de veiculo: " + err.responseText);
                return null;
            }
        };
        autoPark.ajax.post(cfg); 
     };
     buscaEstacionamento=function () {
        var cfg = {
            type: "POST",
            url: "../../rest/estacionamentoRest/buscaEstacionamentosPorDesc/null",
            success: function (listaEstacionamentos) { 
                if (listaEstacionamentos != undefined){
                    if (listaEstacionamentos.length > 0) {
                        for (var i = 0; i < listaEstacionamentos.length; i++) {
                            $("#estacionamento").append("<option value='"+listaEstacionamentos[i].id+"'>"+listaEstacionamentos[i].descricao+"</option>");
                        };
                    };
                };
            },
            error: function (err) {
                alert("Erro ao buscar tipo de veiculo: " + err.responseText);
                return null;
            }
        };
        autoPark.ajax.post(cfg); 
     };      

    editarPreco = function(idI, idJ){
        tabelaPreco.valor = $("#valor"+idJ).val();
        tabelaPreco.tipoVeiculo = $("#tipoVeiculo"+idJ).val();
        tabelaPreco.tipoCobranca = $("#tipoCobranca"+idJ).val();
        tabelaPreco.status = $("#status"+idJ).val();
        tabelaPreco.estacionamento = $("#est"+idI).val();

        var cfg = {
            url: "../rest/tabelaPrecoRest/editarPreco",
            data: JSON.stringify(tabelaPreco),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Preço editado com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
                    resp = ("Erro ao editar o preço!");
                    exibirMessagem(resp, 2);
                }
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao editar o preço!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#cadTabelaPreco').click(function(e){
        var tabelaPreco = new Object();
        tabelaPreco.valor = $("#valor").val();
        tabelaPreco.tipoVeiculo = $("#tipoVeiculo").val();
        tabelaPreco.estacionamento = $("#estacionamento").val();
        tabelaPreco.tipoCobranca = $("#tipoCobranca").val();

        var cfg = {
            url: "../../rest/tabelaDePrecoRest/addPreco",
            data: JSON.stringify(tabelaPreco),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Item cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O item ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo item!");
                    exibirMessagem(resp, 2);
                }
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo item!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
    buscaDados = function(){
        var cfg = {
            type: "POST",
            url: "../../rest/funcionarioRest/buscaDadosPorUsuario/" + dadosSessao.id,
            success: function (funcionario) {
                dadosSessao.empresa = funcionario.empresa.id;
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    setTimeout(function () {
        buscaDados();
        buscaTipoVeiculo();
        buscaEstacionamento();
    }, 1500);
});

