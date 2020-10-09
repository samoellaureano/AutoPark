package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.modeloJPADAO;
import br.com.estacionamento.entidade.Modelo;
import br.com.estacionamento.util.UtilRest;

@Path("modeloRest")
public class ModeloRest extends UtilRest{
	
	@POST
	@Path("/addCliente")
	@Consumes("application/*")

	public Response salvar(String addCliente){

		try {

			Modelo modelo = new ObjectMapper().readValue(addCliente,Modelo.class);
			modeloJPADAO modeloJpadao = new modeloJPADAO();

			boolean	retorno = modeloJpadao.salvar(modelo);

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
