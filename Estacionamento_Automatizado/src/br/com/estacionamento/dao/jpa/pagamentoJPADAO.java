package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.PagamentoDAO;
import br.com.estacionamento.entidade.Pagamento;

public class pagamentoJPADAO extends JPAAbstract<Pagamento> implements PagamentoDAO{

	@Override
	public String getEntityName() {
		return "Pagamento";
	}

}
