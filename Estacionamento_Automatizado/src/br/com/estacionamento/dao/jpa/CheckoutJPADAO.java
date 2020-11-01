package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.CheckoutDAO;
import br.com.estacionamento.entidade.Checkout;

public class CheckoutJPADAO extends JPAAbstract<Checkout> implements CheckoutDAO{

	@Override
	public String getEntityName() {
		return "Checkout";
	}
	
	@SuppressWarnings("unchecked")
	public Checkout buscarPorIdVeiculo(int id) {
		Checkout checkout = new Checkout();
		String jpql = "select c from "+getEntityName()+" c where c.veiculo.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		List<Checkout> list = query.getResultList();
		for (Checkout objCheckout: list) {
			checkout = objCheckout;
		}
		return checkout;
	}

}
