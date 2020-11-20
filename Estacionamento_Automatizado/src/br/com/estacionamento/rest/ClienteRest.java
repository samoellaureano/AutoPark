package br.com.estacionamento.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.ClienteJPADAO;
import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Credito;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.UtilRest;

@Path("clienteRest")
public class ClienteRest extends UtilRest{
	
	@Context
	private HttpServletRequest request;

	@POST
	@Path("/addCliente")
	@Consumes("application/*")
	public Response salvar(String addCliente){

		try {
			HttpSession sessao = request.getSession();
			Cliente cliente = new ObjectMapper().readValue(addCliente,Cliente.class);
			Usuario usuario = cliente.getUsuario();
			Credito credito = new Credito();
			
			sessao.setAttribute("login", usuario.getCpf());			
			sessao.setAttribute("perfil", usuario.getPerfil());

			usuario.setAcesso(true);
			usuario.setPerfil(0);
			usuario.setSenhaCriptografada(usuario.getSenha());
			credito.setSaldo(0);
			String cpf = usuario.getCpf();

			ClienteJPADAO clienteJpadao = new ClienteJPADAO();
			UsuarioJPADAO usuarioJpadao = new UsuarioJPADAO();
			
			cliente.setUsuario(usuario);
			cliente.setCredito(credito);
			
			usuario = usuarioJpadao.buscarPorCpf(cpf);
			
			
			
			boolean	retorno = false;
			if(usuario == null) {			
				retorno = clienteJpadao.salvar(cliente);
			}
			
			usuario = usuarioJpadao.buscarPorCpf(cpf);			
			cliente = clienteJpadao.buscarPorIdUsuario(usuario.getId());
			sessao.setAttribute("id", cliente.getId());

			if(retorno){
				// true = Cadastrado com sucesso.
				return this.buildResponse("1");				
			}else if(retorno == false){
				return this.buildResponse("2");
			}else{
				// null = Erro ao cadastrar o cliente
				return this.buildErrorResponse("0");			
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar cliente");
		}

	}
	
	@POST
	@Path("/buscaDados/{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaDados(@PathParam("idUsuario") int idUsuario){
		try{
			Usuario usuario = new UsuarioJPADAO().buscarPorId(idUsuario);
			Cliente cliente = new ClienteJPADAO().buscarPorIdUsuario(idUsuario);
			
			cliente.setUsuario(usuario);
			
			return this.buildResponse(cliente);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}


	@POST
	@Path("/atualizaCliente")
	@Consumes("application/*")
	public Response atualizaCliente(String atualizaCliente){

		try {
			Cliente cliente = new ObjectMapper().readValue(atualizaCliente,Cliente.class);
			
			cliente.setCredito(new ClienteJPADAO().buscarPorId(cliente.getId()).getCredito());
			cliente.setUsuario(new UsuarioJPADAO().buscarPorId(cliente.getUsuario().getId()));
			
			boolean	retorno = false;		
			retorno = new ClienteJPADAO().atualizar(cliente);
			
			if(retorno){
				return this.buildResponse("1");				
			}else{
				return this.buildResponse("2");
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao atualizar cliente");
		}
	}

}
