package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.CreditoJPADAO;
import br.com.estacionamento.entidade.Credito;
import br.com.estacionamento.util.UtilRest;

@Path("creditoRest")
public class CreditoRest extends UtilRest{
	@POST
	@Path("/addCredito")
	@Consumes("application/*")

	public Response salvar(String addCredito){

		try {

			Credito credito = new ObjectMapper().readValue(addCredito,Credito.class);	
			CreditoJPADAO creditoJpadao = new CreditoJPADAO();

			boolean	retorno = creditoJpadao.salvar(credito);

			if(retorno){
				// true = Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// false =  ja existe
				return this.buildErrorResponse("2");

			}else {
				// null = Erro ao cadastrar o 
				return this.buildErrorResponse("0");			
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar");
		}

	}
}
