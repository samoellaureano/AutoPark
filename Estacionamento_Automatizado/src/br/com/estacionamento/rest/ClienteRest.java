package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.ClienteJPADAO;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.UtilRest;

@Path("clienteRest")
public class ClienteRest extends UtilRest{

	@POST
	@Path("/addCliente")
	@Consumes("application/*")

	public Response salvar(String addCliente){

		try {

			Cliente cliente = new ObjectMapper().readValue(addCliente,Cliente.class);
			Usuario usuario = cliente.getUsuario();

			usuario.setAcesso(true);
			usuario.setPerfil(0);

			cliente.setUsuario(usuario);

			ClienteJPADAO clienteJpadao = new ClienteJPADAO();

			boolean	retorno = clienteJpadao.salvar(cliente);

			if(retorno){
				// true = Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// false = cliente ja existe
				return this.buildErrorResponse("2");

			}else {
				// null = Erro ao cadastrar o cliente
				return this.buildErrorResponse("0");			
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar cliente");
		}

	}// fim do método inserir





}
