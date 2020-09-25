package br.com.estacionamento.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Response;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.DELETE;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import br.com.estacionamento.db.Conexao;
import br.com.estacionamento.util.UtilRest;
import br.com.estacionamento.object.Veiculo;

@Path("veiculoRest")
public class VeiculoRest  extends UtilRest{

public VeiculoRest(){}


@POST
@Path("/addveiculo")
@Consumes("application/*")

public Response inserir(String addveiculo){
	
	Boolean retorno = null; // Boolean com B aceita valores null;
	// String retorno = null;
	try {
					
		Veiculo veiculo = new ObjectMapper().readValue(addveiculo,Veiculo.class);	
		Conexao conec = new Conexao();
		
		Connection conexao = conec.abrirConexao();						
		conec.fecharConexao();
		
		if(retorno){
			// Cadastrado com sucesso.
			return this.buildResponse("1");				
		
		}else if(retorno==false){
			// ja existe um veiculo
			return this.buildErrorResponse("2");
			
		}else {
			// Erro ao cadastrar o veiculo
			return this.buildErrorResponse("0");			
		}
		
		
		
	} catch (Exception e){
		e.printStackTrace();
		
		return this.buildErrorResponse("Erro ao cadastrar veiculo");
	}

}// fim do método inserir
	
	
	
	
}
