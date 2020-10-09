package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.marcaJPADAO;
import br.com.estacionamento.entidade.Marca;
import br.com.estacionamento.util.UtilRest;

@Path("marcaRest")
public class MarcaRest extends UtilRest{

	@POST
	@Path("/addMarca")
	@Consumes("application/*")

	public Response salvar(String addMarca){

		try {

			Marca marca = new ObjectMapper().readValue(addMarca,Marca.class);	
			marcaJPADAO marcaJpadao = new marcaJPADAO();

			boolean	retorno = marcaJpadao.salvar(marca);

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