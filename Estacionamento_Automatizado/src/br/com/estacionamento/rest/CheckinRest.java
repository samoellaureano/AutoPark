package br.com.estacionamento.rest;

import java.util.Date;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.estacionamento.dao.jpa.CheckinJPADAO;
import br.com.estacionamento.dao.jpa.CheckoutJPADAO;
import br.com.estacionamento.dao.jpa.ClienteJPADAO;
import br.com.estacionamento.dao.jpa.EstacionamentoJPADAO;
import br.com.estacionamento.dao.jpa.VeiculoJPADAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Checkout;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Estacionamento;
import br.com.estacionamento.entidade.Veiculo;
import br.com.estacionamento.util.UtilRest;

@Path("checkinRest")
public class CheckinRest extends UtilRest{
	@POST
	@Path("/addCheckin/{placa}&{id}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

	public Response addCheckin(@PathParam("placa") String placa, @PathParam("id") int id){

		try {
			Date data = new Date();

			Checkin checkin = new Checkin();
			Veiculo veiculo = new Veiculo();
			Cliente cliente = new Cliente();
			Estacionamento estacionamento = new Estacionamento();

			CheckinJPADAO checkinJpadao = new CheckinJPADAO();
			VeiculoJPADAO veiculoJpadao = new VeiculoJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();
			EstacionamentoJPADAO estacionamentoJpadao = new EstacionamentoJPADAO();

			veiculo = veiculoJpadao.buscarPorPlaca(placa);
			cliente = clienteJpadao.buscarPorId(veiculo.getCliente().getId());
			estacionamento = estacionamentoJpadao.buscarPorId(id);		

			checkin.setCliente(cliente);
			checkin.setEstacionamento(estacionamento);
			checkin.setDataHora(data);
			checkin.setVeiculo(veiculo);

			boolean retorno = checkinJpadao.salvar(checkin);

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

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar");
		}

	}

	@POST
	@Path("/buscaCheckin/{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaCheckin(@PathParam("idUsuario") int idUsuario){		
		try{
			Checkin checkin = new Checkin();
			Checkout checkout = null;

			CheckinJPADAO checkinJpadao = new CheckinJPADAO();
			CheckoutJPADAO checkoutJpadao = new CheckoutJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();

			checkin = checkinJpadao.buscarPorIdCliente(clienteJpadao.buscarPorIdUsuario(idUsuario).getId());

			if(checkin.getId() != 0) {
				checkout = new Checkout();
				checkout = checkoutJpadao.buscarPorIdVeiculo(checkin.getVeiculo().getId());
			}

			if(checkout != null) {
				if(checkin.getDataHora().after(checkout.getDataHora())) {
					return this.buildResponse(checkin);
				}
			}
			checkin = null;
			return this.buildResponse(checkin);


		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
