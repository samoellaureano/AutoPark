$( document ).ready(function() {
	
	
	
	var cliente = new Object();
	var usuario = new Object();

	$("#cadCliente").click(function(e){
		
	        cliente.nome    = $("#nome").val();
			usuario.cpf     = $("#cpf").val();
			usuario.cpf     = usuario.cpf.replace(/\./g, "");
			usuario.cpf     = usuario.cpf.replace(/\-/g, "");					
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

	validaCpfCnpj = function(val) {			   
		
		if( val.length > 0 ) {
			if (val.length == 14) {
		        var cpf = val.trim();
		     
		        cpf = cpf.replace(/\./g, '');
		        cpf = cpf.replace('-', '');
		        cpf = cpf.split('');
		        
		        var v1 = 0;
		        var v2 = 0;
		        var aux = false;
		        
		        for (var i = 1; cpf.length > i; i++) {
		            if (cpf[i - 1] != cpf[i]) {
		                aux = true;   
		            }
		        } 
		        
		        if (aux == false) {
					alert('CPF INVALIDO!');
					$("#cpf").focus();
		            return false; 
		        } 
		        
		        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
		            v1 += cpf[i] * p; 
		        } 
		        
		        v1 = ((v1 * 10) % 11);
		        
		        if (v1 == 10) {
		            v1 = 0; 
		        }
		        
		        if (v1 != cpf[9]) {
					alert('CPF INVALIDO!');
					$("#cpf").focus();
		            return false; 
		        } 
		        
		        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
		            v2 += cpf[i] * p; 
		        } 
		        
		        v2 = ((v2 * 10) % 11);
		        
		        if (v2 == 10) {
		            v2 = 0; 
		        }
		        
		        if (v2 != cpf[10]) {
					alert('CPF INVALIDO!');
					$("#cpf").focus();
		            return false; 
		        } else {   
		            return true; 
		        }
		    } else if (val.length == 18) {
		        var cnpj = val.trim();
		        
		        cnpj = cnpj.replace(/\./g, '');
		        cnpj = cnpj.replace('-', '');
		        cnpj = cnpj.replace('/', ''); 
		        cnpj = cnpj.split(''); 
		        
		        var v1 = 0;
		        var v2 = 0;
		        var aux = false;
		        
		        for (var i = 1; cnpj.length > i; i++) { 
		            if (cnpj[i - 1] != cnpj[i]) {  
		                aux = true;   
		            } 
		        } 
		        
		        if (aux == false) {
					$("#cpf").focus();  
		            return false; 
		        }
		        
		        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
		            if (p1 >= 2) {  
		                v1 += cnpj[i] * p1;  
		            } else {  
		                v1 += cnpj[i] * p2;  
		            } 
		        } 
		        
		        v1 = (v1 % 11);
		        
		        if (v1 < 2) { 
		            v1 = 0; 
		        } else { 
		            v1 = (11 - v1); 
		        } 
		        
		        if (v1 != cnpj[12]) { 
					alert('CNPJ INVALIDO!');
					$("#cpf").focus();
		            return false; 
		        } 
		        
		        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) { 
		            if (p1 >= 2) {  
		                v2 += cnpj[i] * p1;  
		            } else {   
		                v2 += cnpj[i] * p2; 
		            } 
		        }
		        
		        v2 = (v2 % 11); 
		        
		        if (v2 < 2) {  
		            v2 = 0;
		        } else { 
		            v2 = (11 - v2); 
		        } 
		        
		        if (v2 != cnpj[13]) {
					alert('CNPJ INVALIDO!');
					$("#cpf").focus();
		            return false; 
		        } else {
		            return true; 
		        }
		    } else {
				alert('CPF/CNPJ INVALIDO!');
				$("#cpf").focus();
		        return false;
		    }
		
		}
	 };

});
