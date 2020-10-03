package senai.comjpa.rest;

import javax.ws.rs.POST;//A solicitação POST serve para atualizar um recurso existente ou para criar um novo recurso
import javax.ws.rs.Path;//Identifica o caminho do URI para o qual uma classe de recurso ou método de classe atenderá solicitações.
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import senai.comjpa.dao.jpa.ClienteJPADAO;
import senai.comjpa.pojo.Cliente;

@Path("clienteRest")
public class buscarCliente extends UtilRest{
	
	@POST
	@Path("buscarClientePeloId/{id}")
	@Produces({MediaType.APPLICATION_ATOM_XML,MediaType.APPLICATION_JSON})

	public Cliente buscarClientePeloId(@PathParam("id") int id){
		
		ClienteJPADAO clienteJPA = new ClienteJPADAO();
		Cliente cliente = clienteJPA.buscarPorId(id);
		return cliente;
		
	}

}
