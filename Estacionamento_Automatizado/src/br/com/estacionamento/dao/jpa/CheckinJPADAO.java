package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.CheckinDAO;
import br.com.estacionamento.entidade.Checkin;

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

}
