package br.com.estacionamento.dao.jpa;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import com.mysql.fabric.xmlrpc.base.Data;

import br.com.estacionamento.dao.CheckinDAO;
import br.com.estacionamento.entidade.Checkin;
import br.com.estacionamento.entidade.Veiculo;
import br.com.estacionamento.entidade.Checkout;

public class CheckinJPADAO extends JPAAbstract<Checkin> implements CheckinDAO{

	@Override
	public String getEntityName() {
		return "Checkin";
	}

	public Checkin buscarPorIdVeiculo(int id) {

		String jpql = "select c from "+getEntityName()+" c where c.veiculo.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((Checkin) object);
		}
		return null;
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
			Checkout checkout = new CheckoutJPADAO().buscarPorIdVeiculo(checkinObj.getVeiculo().getId());

			if(checkout.getId() == 0){					

				listaVeiculos.add(checkinObj);

			}else {

				if(checkinObj.getDataHora().after(checkout.getDataHora())) { 

					listaVeiculos.add(checkinObj);
				}
			}
		}

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
			
			String dataCheckin = dateFormat.format(checkinObj.getDataHora());

			if(dataCheckin.equals(dataAtual)){ 

				listaVeiculos.add(checkinObj);
			}		
		}

		return listaVeiculos;
		
	}	
}
