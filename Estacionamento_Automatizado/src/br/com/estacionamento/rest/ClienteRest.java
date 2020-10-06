package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.controlerCliente;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.util.UtilRest;

@Path("clienteRest")
public class ClienteRest extends UtilRest{

public ClienteRest(){} 

@POST
@Path("/addCliente")
@Consumes("application/*")

public Response salvar(String addcliente){
		
	try {
					
		Cliente cliente = new ObjectMapper().readValue(addcliente,Cliente.class);
		
		System.out.println(cliente.getNome()+"\n"
				+cliente.getCpf()+"\n"
				+cliente.getCelular()+"\n"
				+cliente.getEmail()+"\n"
				+cliente.getSenha());
		
		controlerCliente con = new controlerCliente();
		
		
		
		
		boolean	retorno = con.salvar(cliente); 
		
		if(retorno){
			// true = Cadastrado com sucesso.
			return this.buildResponse("1");				
		
		}else if(retorno==false){
			// false = cliente ja existe
			return this.buildErrorResponse("2");
			
		}else {
			// null = Erro ao cadastrar o cliente
			return this.buildErrorResponse("0");			
		}
		
	} catch (Exception e){
		e.printStackTrace();
		
		return this.buildErrorResponse("Erro ao cadastrar cliente");
	}

}// fim do método inserir
	
	
	
	
	
}
