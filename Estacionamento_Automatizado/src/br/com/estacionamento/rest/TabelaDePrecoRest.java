package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.TabelaDePrecoJPADAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.TabelaDePreco;
import br.com.estacionamento.util.UtilRest;

@Path("tabelaDePrecoRest")
public class TabelaDePrecoRest extends UtilRest{
	@POST
	@Path("/addPreco")
	@Consumes("application/*")

	public Response salvar(String addPreco){

		try {

			TabelaDePreco tabelaDePreco = new ObjectMapper().readValue(addPreco,TabelaDePreco.class);
			TabelaDePrecoJPADAO tabelaDePrecoJpadao = new TabelaDePrecoJPADAO();

			boolean	retorno = tabelaDePrecoJpadao.salvar(tabelaDePreco);

			if(retorno){
				// true = Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// false = ja existe
				return this.buildErrorResponse("2");

			}else {
				// null = Erro ao cadastrar
				return this.buildErrorResponse("0");			
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar");
		}

	}	
	
}
