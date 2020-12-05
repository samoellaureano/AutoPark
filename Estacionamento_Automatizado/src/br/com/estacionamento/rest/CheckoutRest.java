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
import br.com.estacionamento.dao.jpa.TabelaDePrecoJPADAO;
import br.com.estacionamento.dao.jpa.VeiculoJPADAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Checkout;
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Estacionamento;
import br.com.estacionamento.entidade.Veiculo;
import br.com.estacionamento.util.Util;
import br.com.estacionamento.util.UtilRest;

@Path("checkoutRest")
public class CheckoutRest extends UtilRest{
	@POST
	@Path("/addCheckout/{placa}&{id}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})

	public Response inserir(@PathParam("placa") String placa, @PathParam("id") int id){

		try {
			Date data = new Date();
			float totalDeHoras;
			
			Checkout checkout = new Checkout();
			Checkin checkin = new Checkin();
			Veiculo veiculo = new Veiculo();
			Cliente cliente = new Cliente();
			Estacionamento estacionamento = new Estacionamento();
			
			CheckoutJPADAO checkoutJpadao = new CheckoutJPADAO();
			CheckinJPADAO checkinJpadao = new CheckinJPADAO();
			VeiculoJPADAO veiculoJpadao = new VeiculoJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();
			EstacionamentoJPADAO estacionamentoJpadao = new EstacionamentoJPADAO();
			TabelaDePrecoJPADAO tabelaDePrecoJpadao = new TabelaDePrecoJPADAO();
			
			veiculo = veiculoJpadao.buscarPorPlaca(placa);
			cliente = clienteJpadao.buscarPorId(veiculo.getCliente().getId());
			estacionamento = estacionamentoJpadao.buscarPorId(id);
			checkin = checkinJpadao.buscarPorIdVeiculo(veiculo.getId());
			
			checkout.setCliente(cliente);
			checkout.setEstacionamento(estacionamento);
			checkout.setDataHora(data);
			checkout.setVeiculo(veiculo);

			boolean retorno = checkoutJpadao.salvar(checkout);
			
			checkout = checkoutJpadao.buscarPorIdVeiculo(id);
			totalDeHoras = Util.calcularDiferencaHoras(checkin.getDataHora(),checkout.getDataHora());
			double valorEst = tabelaDePrecoJpadao.buscaValor(veiculo, estacionamento);
			checkout.setValor(totalDeHoras*valorEst);
			
			retorno = checkoutJpadao.atualizar(checkout);
			

			if(retorno){
				// Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// ja existe
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
	@Path("/buscaReceitaDoDia/{idestaconamento}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscarReceitaDoDia(@PathParam("idestaconamento") int idEstaconamento){		
		
		try{
			
			float receita = new CheckoutJPADAO().buscarReceitaDia(idEstaconamento);			
			return this.buildResponse(receita);

		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
		
}
