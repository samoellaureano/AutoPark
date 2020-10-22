package br.com.estacionamento.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.estacionamento.dao.jpa.ModeloJPADAO;
import br.com.estacionamento.entidade.Modelo;
import br.com.estacionamento.util.UtilRest;

@Path("modeloRest")
public class ModeloRest extends UtilRest{
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
