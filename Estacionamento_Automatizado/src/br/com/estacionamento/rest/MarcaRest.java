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

import br.com.estacionamento.dao.jpa.MarcaJPADAO;
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
			MarcaJPADAO marcaJpadao = new MarcaJPADAO();

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
	
	@POST
	@Path("/buscaMarcas/{marca}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarMarcas(@PathParam("marca") String nome){
		try{
			List<Marca> listaMarcas = new ArrayList<Marca>();
			MarcaJPADAO marcaJpadao = new MarcaJPADAO();
			listaMarcas = marcaJpadao.buscarPorDescricao(nome);
			
			return this.buildResponse(listaMarcas);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}