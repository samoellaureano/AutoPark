package br.com.estacionamento.dao.jpa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.EstacionamentoDAO;
import br.com.estacionamento.entidade.Estacionamento;

public class EstacionamentoJPADAO extends JPAAbstract<Estacionamento> implements EstacionamentoDAO{

	@Override
	public String getEntityName() {
		return "Estacionamento";
	}

	@Override
	public List<Estacionamento> buscarPorIdEsmpresa(int id) {
		List <Estacionamento> listaEstacionamentos = new ArrayList<Estacionamento>();
		String jpql = "select c from "+getEntityName()+" c where c.empresa.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			listaEstacionamentos.add((Estacionamento) object);
		}
		return listaEstacionamentos;
	}


}
