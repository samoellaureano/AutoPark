package br.com.estacionamento.dao.jpa;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Checkout;
import br.com.estacionamento.entidade.Veiculo;

public class CheckinJPADAO extends JPAAbstract<Checkin> {

	@Override
	public String getEntityName() {
		return "Checkin";
	}

	public Checkin buscarPorIdVeiculo(int id) {
		Checkin checkin = new Checkin();
		String jpql = "select c from "+getEntityName()+" c where c.veiculo.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings("unchecked")
		List<Checkin> list = query.getResultList();
		for (Checkin object: list) {
			checkin = object;
		}
		super.close();
		return checkin;
	}

	public Checkin buscarPorIdCliente(int id) {
		Checkin checkin = new Checkin();

		String jpql = "select c from "+getEntityName()+" c where c.cliente.id =:id";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings({ "unchecked" })
		List<Checkin> list = query.getResultList();
		for (Checkin checkinObj: list) {
			checkin = checkinObj;
		}

		if(checkin.getVeiculo() != null) {
			Veiculo veiculo = new VeiculoJPADAO().buscarPorId(checkin.getVeiculo().getId());

			if(veiculo.getAtivo() == false) {
				checkin = null;
			}
		}
		super.close();
		return checkin;

	}

	public List<Checkin> buscarPorIdEstacionamento(int id){

		List<Checkin>listaVeiculos = new ArrayList<Checkin>();

		String jpql = "select c from "+getEntityName()+" c where c.estacionamento.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings({ "unchecked" })
		List<Checkin> list = query.getResultList();

		for (Checkin checkinObj: list){
			
			if(checkinObj.getVeiculo().getAtivo()==true) {
				
				Checkout checkout = new CheckoutJPADAO().buscarPorIdVeiculo(checkinObj.getVeiculo().getId());
				// verifica se o veiculo esta ativo
				if(checkout.getId() == 0){					

					listaVeiculos.add(checkinObj);

				}else {

					if(checkinObj.getDataHora().after(checkout.getDataHora())) { 

						listaVeiculos.add(checkinObj);
					}
				}
			}
		}
		super.close();
		return listaVeiculos;
	}


	public List<Checkin> buscarClienteDia(int id){

		List<Checkin>listaVeiculos = new ArrayList<Checkin>();

		String jpql = "select c from "+getEntityName()+" c where c.estacionamento.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings({ "unchecked" })
		List<Checkin> list = query.getResultList();

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd"); 
		Date data = new Date(); 
		String dataAtual = dateFormat.format(data);		

		for (Checkin checkinObj: list){
			if(checkinObj.getVeiculo().getAtivo()==true) {	
				// verifica se o veiculo esta ativo
				String dataCheckin = dateFormat.format(checkinObj.getDataHora());

				if(dataCheckin.equals(dataAtual)){

					listaVeiculos.add(checkinObj);

				}
			}		
		}
		super.close();
		return listaVeiculos;

	}
	
	public List<Checkin> ListaCheckin(int id){

		List<Checkin>listaCheckins = new ArrayList<Checkin>();

		String jpql = "select c from "+getEntityName()+" c where c.estacionamento.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings({ "unchecked" })
		List<Checkin> list = query.getResultList();
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd"); 
		Date data = new Date(); 
		String dataAtual = dateFormat.format(data);		
		
		for (Checkin checkinObj: list){
			
			if(checkinObj.getVeiculo().getAtivo()==true) {				
				Checkout checkout = new CheckoutJPADAO().buscarPorIdVeiculo(checkinObj.getVeiculo().getId());
				
				if(checkout.getId() != 0){					
					String dataCheckin = dateFormat.format(checkinObj.getDataHora());
					
					if(dataCheckin.equals(dataAtual)){
						
						listaCheckins.add(checkinObj);
					}
				}
			}
		}
		super.close();
		return listaCheckins;
	}
	
	

	
	
	
}
