package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.CheckoutDAO;
import br.com.estacionamento.entidade.Checkout;

public class CheckoutJPADAO extends JPAAbstract<Checkout> implements CheckoutDAO{

	@Override
	public String getEntityName() {
		return "Checkout";
	}

}
