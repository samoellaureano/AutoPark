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
import br.com.estacionamento.dao.jpa.ModeloJPADAO;
import br.com.estacionamento.entidade.Marca;
import br.com.estacionamento.entidade.Modelo;
import br.com.estacionamento.util.UtilRest;

@Path("modeloRest")
public class ModeloRest extends UtilRest{
	@POST
	@Path("/addModelo")
	@Consumes("application/*")

	public Response salvar(String addModelo){

		try {

			Modelo modelo = new ObjectMapper().readValue(addModelo,Modelo.class);
			
			boolean	retorno = new ModeloJPADAO().salvar(modelo);

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
	@Path("/buscarModelos")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarModelos(){
		try{
			List<Modelo> listaModelos = new ModeloJPADAO().buscarPorDescricao("null");
			
			return this.buildResponse(listaModelos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/buscarModeloPorId/{idModelo}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarModeloPorId(@PathParam("idModelo") int idModelo){
		try{
			Modelo modelo = new ModeloJPADAO().buscarPorId(idModelo);
			
			return this.buildResponse(modelo);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/editModelo")
	@Consumes("application/*")

	public Response editModelo(String editModelo){

		try {

			Modelo modelo = new ObjectMapper().readValue(editModelo,Modelo.class);
			Marca marca = new MarcaJPADAO().buscarPorId(modelo.getMarca().getId());
			modelo.setMarca(marca);

			boolean	retorno = new ModeloJPADAO().atualizar(modelo);

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

			return this.buildErrorResponse(e.toString());
		}

	}
	
	@POST
	@Path("/buscaModelos/{idMarca}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarMarcas(@PathParam("idMarca") int idMarca){
		try{
			List<Modelo> listaModelos = new ArrayList<Modelo>();
			ModeloJPADAO modeloJpadao = new ModeloJPADAO();
			listaModelos = modeloJpadao.buscarPorIdMarca(idMarca);
			
			return this.buildResponse(listaModelos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
