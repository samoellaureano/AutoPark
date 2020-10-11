package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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

}
