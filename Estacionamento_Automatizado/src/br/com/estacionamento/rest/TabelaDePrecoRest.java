package br.com.estacionamento.rest;

import java.util.ArrayList;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.TabelaDePrecoJPADAO;
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


	@POST
	@Path("/buscarPrecos/{nomeEstacionamento}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarPrecos (@PathParam("nomeEstacionamento") String nomeEstacionamento){
		
		try {

			List<TabelaDePreco> listaPrecos = new ArrayList<TabelaDePreco>();
			
			if(nomeEstacionamento.equals("")||nomeEstacionamento.equals("null")) {
				
				listaPrecos = new TabelaDePrecoJPADAO().listaTodosValor();
				
			}else {
				
				listaPrecos = new TabelaDePrecoJPADAO().listaValorEstacionamento(nomeEstacionamento);
			}
			
			if(listaPrecos.size()>0 && listaPrecos!=null){
				
				return this.buildResponse(listaPrecos);

			}else {
				
				return this.buildErrorResponse("Erro na busca");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro na busca");
		}		
	}
}
