package br.com.estacionamento.dao.jpa;

import java.util.ArrayList;
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
		
		String jpql = "select c from "+getEntityName()+" c where c.tipoVeiculo.id =:idTipoVeiculo AND c.estacionamento.id =:idEstacionamento";
		Query query = super.getQuery(jpql);
		query.setParameter("idTipoVeiculo", veiculo.getTipoVeiculo().getId());
		query.setParameter("idEstacionamento", estacionamento.getId());
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			tabelaDePreco = ((TabelaDePreco) object);
		}
		super.close();
		return tabelaDePreco.getValor();	
		
	}
	
	public List<TabelaDePreco> listaValorEstacionamento(String estacionamento) {
		
		List<TabelaDePreco>listaPreco = new ArrayList<TabelaDePreco>();		
		String jpql = "select c from "+getEntityName()+" c  where c.estacionamento.descricao LIKE '"+ estacionamento +"'";
		Query query = super.getQuery(jpql);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			listaPreco.add((TabelaDePreco) object);
		}	
		super.close();
		return listaPreco;	
		
	}
	
public List<TabelaDePreco> listaTodosValor() {
		
		List<TabelaDePreco>listaPreco = new ArrayList<TabelaDePreco>();		
		String jpql = "select c from "+getEntityName()+ " c ";
		Query query = super.getQuery(jpql);		
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		
		for (Object object: list) {
			listaPreco.add((TabelaDePreco) object);
		}		
		super.close();
		return listaPreco;			
	}
	
	

}
