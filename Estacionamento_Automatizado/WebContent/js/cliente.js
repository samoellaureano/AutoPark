var cliente = new Object();

$(document).ready(function(){
	
	$('#cadCliente').click(function(e){
	        cliente.nome    = $("#nome").val();
	        cliente.cpf     = $("#cpf").val();
	        cliente.celular = $("#celular").val();
	        cliente.email   = $("#email").val();
	        cliente.senha 	= $("#senha").val();
	     // cliente.empresa = $("#empresa").val();
	        
	        var cfg = {
	            url: "../rest/clienteRest/addCliente",
	            data: JSON.stringify(cliente),
	            success: function (succJson) {
	                if (succJson == 1) {
	                    resp = ("Cliente cadastrado com sucesso!");
	                    exibirMessagem(resp, 1);
	                } else if(succJson == 2){
	                    resp = ("O cliente ja existe!");
	                    exibirMessagem(resp, 2);
	                }else{
	                    resp = ("Erro ao cadastrar um novo cliente!");
	                    exibirMessagem(resp, 2);
	                }             
	               
	            },
	            error: function (errJson) {
	                resp = ("Erro ao cadastrar um novo cliente!");
	                exibirMessagem(resp, 2);
	            }
	        };
	        autoPark.ajax.post(cfg);
	    });
});