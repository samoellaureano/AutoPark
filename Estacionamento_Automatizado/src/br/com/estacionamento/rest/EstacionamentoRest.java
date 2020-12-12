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

import br.com.estacionamento.dao.jpa.EmpresaJPADAO;
import br.com.estacionamento.dao.jpa.EstacionamentoJPADAO;
import br.com.estacionamento.dao.jpa.FuncionarioJPADAO;
import br.com.estacionamento.entidade.Empresa;
import br.com.estacionamento.entidade.Estacionamento;
import br.com.estacionamento.entidade.Funcionario;
import br.com.estacionamento.util.UtilRest;

@Path("estacionamentoRest")
public class EstacionamentoRest extends UtilRest{

	@POST
	@Path("/addEstacionamento")
	@Consumes("application/*")

	public Response salvar(String addEstacionamento){

		try {

			Estacionamento estacionamento = new ObjectMapper().readValue(addEstacionamento,Estacionamento.class);
			estacionamento.setAtivo(true);
			boolean	retorno = new EstacionamentoJPADAO().salvar(estacionamento);

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
	@Path("/buscaEstacionamentos")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaEstacionamentos(){
		try{
			List<Estacionamento> listaEstacionamentos = new EstacionamentoJPADAO().buscarPorDescricao("null");
			
			return this.buildResponse(listaEstacionamentos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/buscarEstacionamentoPorId/{idEstacionamento}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarEstacionamentoPorId(@PathParam("idEstacionamento") int idEstacionamento){
		try{
			Estacionamento estacionamento = new EstacionamentoJPADAO().buscarPorId(idEstacionamento);
			
			return this.buildResponse(estacionamento);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/editEstacionamento")
	@Consumes("application/*")

	public Response editEstacionamento(String editEstacionamento){

		try {

			Estacionamento estacionamento = new ObjectMapper().readValue(editEstacionamento,Estacionamento.class);
			Empresa empresa = new EmpresaJPADAO().buscarPorId(estacionamento.getEmpresa().getId());
			estacionamento.setAtivo(true);
			estacionamento.setEmpresa(empresa);
			
			boolean	retorno = new EstacionamentoJPADAO().atualizar(estacionamento);

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
	@Path("/buscaEstacionamentosPorUsuario/{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarMarcas(@PathParam("idUsuario") int idUsuario){
		try{
			List<Estacionamento> listaEstacionamentos = new ArrayList<Estacionamento>();
			
			Funcionario funcionario = new Funcionario();
			
			FuncionarioJPADAO funcionarioJpadao = new FuncionarioJPADAO();
			EstacionamentoJPADAO estacionamentoJpadao = new EstacionamentoJPADAO();
			
			funcionario = funcionarioJpadao.buscarPorIdUsuario(idUsuario);
			
			listaEstacionamentos = estacionamentoJpadao.buscarPorIdEsmpresa(funcionario.getEmpresa().getId());
			
			return this.buildResponse(listaEstacionamentos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	

}
