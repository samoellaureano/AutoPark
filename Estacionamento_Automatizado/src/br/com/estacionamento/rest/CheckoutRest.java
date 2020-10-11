package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.CheckoutJPADAO;
import br.com.estacionamento.entidade.Checkout;
import br.com.estacionamento.util.UtilRest;

@Path("checkoutRest")
public class CheckoutRest extends UtilRest{
	@POST
	@Path("/addCheckout")
	@Consumes("application/*")

	public Response inserir(String addCheckout){

		try {

			Checkout checkout = new ObjectMapper().readValue(addCheckout, Checkout.class);

			CheckoutJPADAO checkoutJpadao = new CheckoutJPADAO();

			boolean retorno = checkoutJpadao.salvar(checkout);

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

	}
}
