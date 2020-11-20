package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.UtilRest;

@Path("usuarioRest")
public class UsuarioRest extends UtilRest{
	
	@POST
	@Path("/alteraSenha")
	@Consumes("application/*")
	public Response alteraSenha(String alteraSenha){

		try {
			Usuario usuario = new ObjectMapper().readValue(alteraSenha,Usuario.class);
			
			
			boolean	retorno = usuario.comparaSenha(usuario);
			
			
			if(retorno){
				return this.buildResponse("1");				
			}else{
				UsuarioJPADAO usuarioJpadao = new UsuarioJPADAO();
				Usuario usuarioAtualizado = usuarioJpadao.buscarPorId(usuario.getId());
				usuarioAtualizado.setSenha(usuario.getSenha());
				
				usuarioJpadao.atualizar(usuarioAtualizado);
				return this.buildResponse("2");
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao atualizar cliente");
		}
	}

}
