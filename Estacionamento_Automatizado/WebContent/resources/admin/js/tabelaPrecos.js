var tabelaPreco = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    buscar = function(){
        var valorBusca = $("#buscarEst").val();
        if(valorBusca==""||valorBusca==null||valorBusca==undefined){
            valorBusca=null;
        };
        console.log(valorBusca+":lol");
        var cfg = {
            type: "POST",
            url: "../../rest/tabelaDePrecoRest/buscarPrecos/" + valorBusca,
            success: function (listaDePrecos) {
                console.log(listaDePrecos);
                buscaTipoVeiculo(listaDePrecos);                
            },
            error: function (err) {
                alert("Erro ao buscar estacionamento: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirPrecos = function(listaDePrecos,listaOpcoes){
        var precosHTML = "<ul class='itemEstac'>";
        if (listaDePrecos != undefined && listaOpcoes != undefined) {
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
                        +"<input type='text' id='valor"+j+"' value='"+listaDePrecos[j].valor+"'>"
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

    buscaTipoVeiculo=function (listaDePrecos) {
       var tipoVeicloHTML = "";            
       var valorBusca = null;       
        var cfg = {
            type: "POST",
            url: "../../rest/tipoVeiculoRest/buscaTipoVeiculos/" + valorBusca,
            success: function (listaTipoVeiculo) {               
                
                if (listaTipoVeiculo != undefined){
                    if (listaTipoVeiculo.length > 0) {
                        for (var i = 0; i < listaTipoVeiculo.length; i++) {
                            
                            tipoVeicloHTML+="<option value='"+listaTipoVeiculo[i].id+"'>"+listaTipoVeiculo[i].descricao+"</option>";
        
                        };
                        exibirPrecos(listaDePrecos,tipoVeicloHTML);
                    };
                };        

                return tipoVeicloHTML;
            },
            error: function (err) {
                alert("Erro ao buscar tipo de veiculo: " + err.responseText);
                return null;
            }
        };
        autoPark.ajax.post(cfg);  
        
    }

       

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
        tabelaPreco.valor = $("#valor").val();
        tabelaPreco.tipoVeiculo = $("#tipoVeiculo").val();
        tabelaPreco.estacionamento = $("#estacionamento").val();
        tabelaPreco.tipoCobranca = $("#tipoCobranca").val();

        var cfg = {
            url: "../rest/tabelaPrecoRest/addTabelaPreco",
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
    buscar();
});

