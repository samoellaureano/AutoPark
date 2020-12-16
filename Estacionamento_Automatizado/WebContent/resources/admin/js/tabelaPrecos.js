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
                var nomeCampo = [];
                var valorCampo = [];
                for (var i = 0; i < listaDePrecos.length; i++) {
                    
                    precosHTML += "<input type='radio' name='estac' id='est"+i+"' value='"+listaDePrecos[i].estacionamento.id+"' hidden>"
                    +"<label for='est"+i+"'>"+listaDePrecos[i].estacionamento.descricao+"</label>";
                    
                    for (var j = 0; j < listaDePrecos.length; j++) {

                        precosHTML +=" <li><input type='checkbox' name='preco' id='prec"+j+"' hidden>"
                        +"<label for='prec"+j+"'>"+listaDePrecos[i].tipoVeiculo.descricao+"-"+listaDePrecos[j].descricao+"</label><ul>"
                        +"<label for='editar"+j+"'>Editar</label>"
                        +"<input type='checkbox' id='editar"+j+"' hidden>"
                        +"<div><form><label for='valor"+j+"'>Valor:</label>"
                        +"<input min='0' type='text' id='valor"+j+"' value='"+listaDePrecos[j].valor+"'>"
                        +"<label for='tipoVeiculo"+j+"' >Tipo de Veículo:</label>"
                        +"<select name='tipoVeiculo' id='tipoVeiculo"+j+"'></select>"
                        +"<label for='tipoCobrancaEdit"+j+"' hidden>Tipo de Cobrança:</label>"
                        +"<select name='tipoCobrancaEdit' id='tipoCobrancaEdit"+j+"' hidden>"
                        +"<option value='hora'>Hora</option>"
                        +"<option value='dia'>Dia</option>"
                        +"<option value='semana'>Semana</option>"
                        +"<option value='mes'>Mês</option></select>"
                        +"<label for='statusEdit"+j+"'>Status:"
                        +"<input type='checkbox' id='statusEdit"+j+"'></label>"
                        +"<div><a href='tabelaPrecos.html'>Cancelar</a>"
                        +"<button onClick='editarPreco("+i+","+j+","+listaDePrecos[j].id+")'>Confirmar</button>"
                        +"</div></form></div></ul></li>";
                        
                        buscaTipoVeiculo(j);
                        setCampos(j,listaDePrecos);
                    }
                    precosHTML +="</ul>";                                        
                }
            } else {
                precosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaPrecosHTML").append(precosHTML);           
        }
    }

    setCampos=function(j,listaDePrecos){
      
        setTimeout(function () {

          $("#statusEdit"+j).prop("checked",listaDePrecos[j].ativo);
          $("#tipoCobrancaEdit"+j).val(listaDePrecos[j].descricao);
          $("#tipoVeiculo"+j).val(listaDePrecos[j].tipoVeiculo.id);

        },500);
    };

    buscaTipoVeiculo=function (num) {
        $("#tipoVeiculo"+num+" option").remove();
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscarTipoVeiculosPorDesc/null",
            success: function (listaTipoVeiculo) { 
                if (listaTipoVeiculo != undefined){
                    if (listaTipoVeiculo.length > 0) {
                        for (var i = 0; i < listaTipoVeiculo.length; i++) {
                            $("#tipoVeiculo"+num).append("<option value='"+listaTipoVeiculo[i].id+"'>"+listaTipoVeiculo[i].descricao+"</option>");
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

    editarPreco = function(idI, idJ, idPreco){
        var tabelaPreco = new Object();
        var estacionamento = new Object();
        var tipoVeiculo = new Object();
        var tabelaPreco = new Object();

        tabelaPreco.id = idPreco;
        tabelaPreco.descricao = "hora";
        estacionamento.id = $("#est"+idI).val();
        tipoVeiculo.id = $("#tipoVeiculo"+idJ).val();
        tabelaPreco.valor = $("#valor"+idJ).val();
        tabelaPreco.ativo = $("#statusEdit"+idJ).is(':checked');

        tabelaPreco.estacionamento = estacionamento;
        tabelaPreco.tipoVeiculo = tipoVeiculo;        

        var cfg = {
            url: "../../rest/tabelaDePrecoRest/editarPreco",
            data: JSON.stringify(tabelaPreco),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Preço editado com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("tabelaPrecos.html");
                }else{
                    resp = ("Erro ao editar o preço!");
                    exibirMessagem(resp, 2);
                }
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
        var estacionamento = new Object();
        var tipoVeiculo = new Object();
        var tabelaPreco = new Object();
        tabelaPreco.valor = parseFloat($("#valor").val());
        tipoVeiculo.id = $("#tipoVeiculo").val();
        estacionamento.id = $("#estacionamento").val();
        tabelaPreco.descricao = "hora";
        tabelaPreco.estacionamento = estacionamento;
        tabelaPreco.tipoVeiculo = tipoVeiculo;

        var cfg = {
            url: "../../rest/tabelaDePrecoRest/addPreco",
            data: JSON.stringify(tabelaPreco),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Item cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                    window.location.href = ("tabelaPrecos.html");
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
                buscar();
            },
            error: function (err) {
                alert("Erro ao buscar Funcionarios: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    }
    
    setTimeout(function () {
        buscaDados();     
        buscaTipoVeiculo("");
        buscaEstacionamento();
    }, 1500);
});

