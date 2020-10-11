package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.CheckinJPADAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.util.UtilRest;

@Path("checkinRest")
public class CheckinRest extends UtilRest{
	@POST
	@Path("/addCheckin")
	@Consumes("application/*")

	public Response inserir(String addCheckin){

		try {

			Checkin checkin = new ObjectMapper().readValue(addCheckin, Checkin.class);

			CheckinJPADAO checkinJpadao = new CheckinJPADAO();

			boolean retorno = checkinJpadao.salvar(checkin);

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

			return this.buildErrorResponse("Erro ao cadastrar");
		}

	}

}
