$( document ).ready(function() {
	$("#cpf").mask('000.000.000-00');
var cliente = new Object();
var usuario = new Object();

	$("#cadCliente").click(function(e){
	        cliente.nome    = $("#nome").val();
					usuario.cpf     = $("#cpf").val();
					usuario.cpf = usuario.cpf.replace(/\./g, "");
					usuario.cpf = usuario.cpf.replace(/\-/g, "");					
					cliente.celular = $("#celular").val();
					cliente.celular = cliente.celular.replace(/[^0-9]/g, '');
	        cliente.email   = $("#email").val();
					usuario.senha 	= btoa($("#senha").val());

			cliente.usuario = usuario;
	   
	        
	        var cfg = {
	            url: "rest/clienteRest/addCliente",
	            data: JSON.stringify(cliente),
	            success: function (succJson) {
	                if (succJson == 1) {
	                    resp = ("Cliente cadastrado com sucesso!");
						exibirMessagem(resp, 1);
						window.location.href = ("cadastrarVeiculo.html");
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