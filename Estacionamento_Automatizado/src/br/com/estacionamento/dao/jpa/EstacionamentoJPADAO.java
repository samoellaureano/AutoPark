package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.EstacionamentoDAO;
import br.com.estacionamento.entidade.Estacionamento;

public class EstacionamentoJPADAO extends JPAAbstract<Estacionamento> implements EstacionamentoDAO{

	@Override
	public String getEntityName() {
		return "Estacionamento";
	}

}
