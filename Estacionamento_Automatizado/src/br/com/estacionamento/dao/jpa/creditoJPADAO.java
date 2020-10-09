package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.CreditoDAO;
import br.com.estacionamento.entidade.Credito;

public class creditoJPADAO extends JPAAbstract<Credito> implements CreditoDAO{

	@Override
	public String getEntityName() {
		return "Credito";
	}

}
