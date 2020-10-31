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

import br.com.estacionamento.dao.jpa.TipoVeiculoJPADAO;
import br.com.estacionamento.entidade.TipoVeiculo;
import br.com.estacionamento.util.UtilRest;

@Path("tipoVeiculoRest")
public class TipoVeiculoRest extends UtilRest{

	@POST
	@Path("/addTipoVeiculo")
	@Consumes("application/*")

	public Response salvar(String addTipoVeiculo){

		try {

			TipoVeiculo tipoVeiculo = new ObjectMapper().readValue(addTipoVeiculo,TipoVeiculo.class);	
			TipoVeiculoJPADAO tipoVeiculoJpadao = new TipoVeiculoJPADAO();

			boolean	retorno = tipoVeiculoJpadao.salvar(tipoVeiculo);

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
	
	@POST
	@Path("/buscaTipoVeiculos/{tipo}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarMarcas(@PathParam("tipo") String tipo){
		try{
			List<TipoVeiculo> listaTipoVeiculos = new ArrayList<TipoVeiculo>();
			TipoVeiculoJPADAO tipoVeiculoJpadao = new TipoVeiculoJPADAO();
			listaTipoVeiculos = tipoVeiculoJpadao.buscarPorDescricao(tipo);
			
			return this.buildResponse(listaTipoVeiculos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
