package br.com.estacionamento.rest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import br.com.estacionamento.entidade.Cliente;
import br.com.estacionamento.entidade.Registro;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.UtilRest;

@Path("registroRest")
public class RegistroRest extends UtilRest{
	
	@POST
	@Path("/buscaRegistro/{dataInicial}&{dataFinal}&{idUsuario}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response buscaRegistro(@PathParam("dataInicial") String dataInicial, @PathParam("dataFinal") String dataFinal, @PathParam("idUsuario") int idUsuario){
		Registro registro = new Registro();
		try{
			Cliente cliente = new Cliente();
			if(idUsuario == 0) {
				Usuario usuario = new Usuario();
				usuario.setId(idUsuario);
				cliente.setUsuario(usuario);
			}else {
				cliente = new ClienteJPADAO().buscarPorIdUsuario(idUsuario);
			}
			 
			List<Checkin> listaCheckin = new ArrayList<Checkin>();
			List<Checkout> listaCheckout = new ArrayList<Checkout>();
			Date DI = null;
			Date DF = null;
						
			SimpleDateFormat formato = new SimpleDateFormat("dd-MM-yyyy");
			
			if(!dataInicial.equals("undefined-undefined-") && !dataFinal.equals("undefined-undefined-")) {
					DI = formato.parse(dataInicial);
					DF = formato.parse(dataFinal);
					listaCheckin = new CheckinJPADAO().buscarPorIdClienteDataIF(cliente.getId(), DI, DF);					
					listaCheckout = new CheckoutJPADAO().buscarPorIdClienteDataIF(cliente.getId(), DI, DF);
					registro.setCheckin(listaCheckin);
					registro.setCheckout(listaCheckout);			
			}else {
				listaCheckin = new CheckinJPADAO().buscarPorIdClienteLista(cliente.getId());
				registro.setCheckin(listaCheckin);
				listaCheckout = new CheckoutJPADAO().buscarPorIdClienteLista(cliente.getId());
				registro.setCheckout(listaCheckout);
			}

		}catch (Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		return this.buildResponse(registro);
	}

}
