package br.com.estacionamento.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.EstacionamentoJPADAO;
import br.com.estacionamento.dao.jpa.TabelaDePrecoJPADAO;
import br.com.estacionamento.dao.jpa.TipoVeiculoJPADAO;
import br.com.estacionamento.entidade.Estacionamento;
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
			
			tabelaDePreco.setTipoVeiculo(new TipoVeiculoJPADAO().buscarPorId(tabelaDePreco.getTipoVeiculo().getId()));
			tabelaDePreco.setEstacionamento(new EstacionamentoJPADAO().buscarPorId(tabelaDePreco.getEstacionamento().getId()));
			
			tabelaDePreco.setAtivo(true);

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
	@Path("/buscarPrecos/{idEmpresa}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarPrecos (@PathParam("idEmpresa") int idEmpresa){
		
		try {
			
		
			List<TabelaDePreco> listaPrecos = new ArrayList<TabelaDePreco>();
			
			List<Estacionamento> listaEstacionamentos = new EstacionamentoJPADAO().buscarPorIdEsmpresa(idEmpresa);
			
			for (Estacionamento object: listaEstacionamentos) {
				List<TabelaDePreco> listaTabelaPreco = new TabelaDePrecoJPADAO().listaValorEstacionamento(object.getDescricao());
				for (TabelaDePreco object2: listaTabelaPreco) {
					listaPrecos.add(object2);
				}
			}
				
			return this.buildResponse(listaPrecos);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro na busca");
		}		
	}
	
	@POST
	@Path("/editarPreco")
	@Consumes("application/*")

	public Response editarPreco(String editarPreco){

		try {

			TabelaDePreco tabelaDePreco = new ObjectMapper().readValue(editarPreco,TabelaDePreco.class);
			TabelaDePrecoJPADAO tabelaDePrecoJpadao = new TabelaDePrecoJPADAO();
			
			tabelaDePreco.setTipoVeiculo(new TipoVeiculoJPADAO().buscarPorId(tabelaDePreco.getTipoVeiculo().getId()));
			tabelaDePreco.setEstacionamento(new EstacionamentoJPADAO().buscarPorId(tabelaDePreco.getEstacionamento().getId()));

			boolean	retorno = tabelaDePrecoJpadao.atualizar(tabelaDePreco);

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
