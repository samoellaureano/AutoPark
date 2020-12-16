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

import br.com.estacionamento.dao.jpa.CheckinJPADAO;
import br.com.estacionamento.dao.jpa.ClienteJPADAO;
import br.com.estacionamento.dao.jpa.TipoVeiculoJPADAO;
import br.com.estacionamento.dao.jpa.VeiculoJPADAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Veiculo;
import br.com.estacionamento.util.UtilRest;

@Path("veiculoRest")
public class VeiculoRest extends UtilRest{

	@POST
	@Path("/addVeiculo")
	@Consumes("application/*")

	public Response inserir(String addVeiculo){

		try {

			Veiculo veiculo = new ObjectMapper().readValue(addVeiculo, Veiculo.class);
			VeiculoJPADAO veiculoJpadao = new VeiculoJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();
			TipoVeiculoJPADAO tipoVeiculoJpadao = new TipoVeiculoJPADAO();

			Veiculo veiculoExitente = veiculoJpadao.buscarPorPlaca(veiculo.getPlaca());
			boolean retorno = false;

			if(veiculoExitente.getCliente() == null || veiculoExitente.getAtivo() == false) {
				Cliente cliente = veiculo.getCliente();

				if(cliente.getUsuario() != null) {
					cliente = clienteJpadao.buscarPorIdUsuario(cliente.getUsuario().getId());

					veiculo.setCliente(cliente);
				}
				veiculo.setTipoVeiculo(tipoVeiculoJpadao.buscarPorId(veiculo.getTipoVeiculo().getId()));
				veiculo.setAtivo(true);

				retorno = veiculoJpadao.salvar(veiculo);
			}

			if(retorno){
				// Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(!retorno){
				// ja existe um veiculo
				return this.buildResponse("2");

			}else {
				// Erro ao cadastrar o veiculo
				return this.buildErrorResponse("0");			
			}		

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar veiculo");
		}

	}

	@POST
	@Path("/buscaVeiculos/{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaVeiculos(@PathParam("idUsuario") int idUsuario){
		try{
			List<Veiculo> listaVeiculos = new ArrayList<Veiculo>();
			VeiculoJPADAO veiculoJpadao = new VeiculoJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();

			listaVeiculos = veiculoJpadao.buscarPorCliente(clienteJpadao.buscarPorIdUsuario(idUsuario).getId());

			return this.buildResponse(listaVeiculos);
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@POST
	@Path("/excluiVeiculo/{idVeiculo}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response excluiVeiculos(@PathParam("idVeiculo") int idVeiculo){
		try{		
			VeiculoJPADAO veiculoJpadao = new VeiculoJPADAO();
			Veiculo veiculo = veiculoJpadao.buscarPorId(idVeiculo);

			veiculo.setAtivo(false);
			veiculo.setId(idVeiculo);
			
			Checkin checkin = new CheckinJPADAO().buscarPorIdVeiculo(idVeiculo);
			boolean retorno = false;
			if(checkin.getValidado() == true) {
				retorno = veiculoJpadao.atualizar(veiculo);
			}

			 

			if(retorno){
				// Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// ja existe um veiculo
				return this.buildErrorResponse("2");

			}else {
				// Erro ao cadastrar o veiculo
				return this.buildErrorResponse("0");			
			}
		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
