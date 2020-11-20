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
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Checkout;
import br.com.estacionamento.util.UtilRest;

@Path("registroRest")
public class RegistroRest extends UtilRest{
	
	@POST
	@Path("/buscaRegistro/{dataInicial}&{dataFinal}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaRegistro(@PathParam("dataInicial") Date dataInicial, @PathParam("dataFinal") Date dataFinal){		
		try{
			Checkin checkin = new Checkin();
			Checkout checkout = new Checkout();

			CheckinJPADAO checkinJpadao = new CheckinJPADAO();
			CheckoutJPADAO checkoutJpadao = new CheckoutJPADAO();
			ClienteJPADAO clienteJpadao = new ClienteJPADAO();

			//checkin = checkinJpadao.buscarPorIdCliente(clienteJpadao.buscarPorIdUsuario(idUsuario).getId());
						
			if(checkin.getId() != 0) {
				
				checkout = checkoutJpadao.buscarPorIdVeiculo(checkin.getVeiculo().getId());
			}

			if(checkout.getDataHora() != null){
				if(checkin.getDataHora().after(checkout.getDataHora())) {
					return this.buildResponse(checkin);
				}else {
					checkin = null;
				}
			}
			
			return this.buildResponse(checkin);


		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
