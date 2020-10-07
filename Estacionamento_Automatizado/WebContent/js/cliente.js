$( document ).ready(function() {

var cliente = new Object();
var usuario = new Object();

	$("#cadCliente").click(function(e){
	        cliente.nome    = $("#nome").val();
	        usuario.cpf     = $("#cpf").val();
	        cliente.celular = $("#celular").val();
	        cliente.email   = $("#email").val();
	        usuario.senha 	= $("#senha").val();

			cliente.usuario = usuario;
	   
	        
	        var cfg = {
	            url: "rest/clienteRest/addCliente",
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
	    });// fim da fução

});