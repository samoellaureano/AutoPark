package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.EmpresaJPADAO;
import br.com.estacionamento.dao.jpa.FuncionarioJPADAO;
import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Empresa;
import br.com.estacionamento.entidade.Funcionario;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.UtilRest;

@Path("funcionarioRest")
public class FuncionarioRest extends UtilRest{
	@POST
	@Path("/addFuncionario")
	@Consumes("application/*")

	public Response salvar(String addFuncionario){

		try {

			Funcionario funcionario = new ObjectMapper().readValue(addFuncionario,Funcionario.class);
			Usuario usuario = funcionario.getUsuario();
			Empresa empresa = funcionario.getEmpresa();

			usuario.setAcesso(true);
			usuario.setPerfil(1);
			usuario.setSenhaCriptografada(usuario.getSenha());
			
			funcionario.setUsuario(usuario);
			
			FuncionarioJPADAO funcionarioJpadao = new FuncionarioJPADAO();
			UsuarioJPADAO usuarioJpadao = new UsuarioJPADAO();
			EmpresaJPADAO empresaJpadao = new EmpresaJPADAO();
			
			usuario = usuarioJpadao.buscarPorCpf(usuario.getCpf());
			empresa = empresaJpadao.buscarPorId(empresa.getId());
			
			funcionario.setEmpresa(empresa);			
			boolean	retorno = false;
			if(usuario == null) {
				retorno = funcionarioJpadao.salvar(funcionario);				
			}else if(usuario.getPerfil() == 0){
				usuario.setPerfil(1);
				funcionario.setUsuario(usuario);
				retorno = funcionarioJpadao.salvar(funcionario);				
			}
			
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
	@Path("/buscaDados/{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaDados(@PathParam("idUsuario") int idUsuario){
		try{
			
			Usuario usuario = new UsuarioJPADAO().buscarPorId(idUsuario);
			Funcionario funcionario = new FuncionarioJPADAO().buscarPorIdUsuario(idUsuario);
			
			funcionario.setUsuario(usuario);
			
			return this.buildResponse(funcionario);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/atualizaFuncionario")
	@Consumes("application/*")
	public Response atualizaCliente(String atualizaFuncionario){

		try {
			
			Funcionario funcionario = new ObjectMapper().readValue(atualizaFuncionario,Funcionario.class);			
			funcionario.setUsuario(new UsuarioJPADAO().buscarPorId(funcionario.getUsuario().getId()));
			funcionario.setEmpresa(new FuncionarioJPADAO().buscarPorId(funcionario.getId()).getEmpresa());		
			
			boolean	retorno = false;
			
			retorno = new FuncionarioJPADAO().atualizar(funcionario);
			
			if(retorno){
				
				return this.buildResponse("1");				
			}else{
				
				return this.buildResponse("2");
			}
			

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao atualizar Funcionario");
		}
	}
	

}