package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.TabelaDePrecoDAO;
import br.com.estacionamento.entidade.Estacionamento;
import br.com.estacionamento.entidade.TabelaDePreco;
import br.com.estacionamento.entidade.Veiculo;

public class TabelaDePrecoJPADAO extends JPAAbstract<TabelaDePreco> implements TabelaDePrecoDAO{

	@Override
	public String getEntityName() {
		return "TabelaDePreco";
	}

	@Override
	public double buscaValor(Veiculo veiculo, Estacionamento estacionamento) {
		TabelaDePreco tabelaDePreco = new TabelaDePreco();
		
		String jpql = "select DISTINCT c from "+getEntityName()+" c INNER JOIN estacionamento e INNER JOIN tipoVeiculo t where t.id := idTipoVeiculo AND e.id := idEstacionamento";
		Query query = super.getQuery(jpql);
		query.setParameter("idTipoVeiculo", veiculo.getTipoVeiculo().getId());
		query.setParameter("idEstacionamento", estacionamento.getId());
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			tabelaDePreco = ((TabelaDePreco) object);
		}		
		return tabelaDePreco.getValor();
		
		
	}

}
