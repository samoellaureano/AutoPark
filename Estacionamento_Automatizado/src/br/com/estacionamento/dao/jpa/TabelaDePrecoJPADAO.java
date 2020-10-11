package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.TabelaDePrecoDAO;
import br.com.estacionamento.entidade.TabelaDePreco;

public class TabelaDePrecoJPADAO extends JPAAbstract<TabelaDePreco> implements TabelaDePrecoDAO{

	@Override
	public String getEntityName() {
		return "TabelaDePreco";
	}

}
