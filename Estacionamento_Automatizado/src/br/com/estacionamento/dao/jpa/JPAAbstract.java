package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public abstract class JPAAbstract <T> extends JPAConnection{
	
	public boolean salvar (T t) {
			EntityManager em = getEntityManager();
			em.getTransaction().begin();
			em.persist(t);
			em.getTransaction().commit();
			em.close();
			return true;
	}
	
	@SuppressWarnings("unchecked")
	public T buscarPorId(int id) {
		String jpql = "select c from "+getEntityName()+" c where c.id = " + id;
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((T) object);
		}
		return null;
	}
	
	public abstract String getEntityName();
}
