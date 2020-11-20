package br.com.estacionamento.dao.jpa;

import java.util.ArrayList;
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
	
	public boolean atualizar (T t) {
		EntityManager em = getEntityManager();
		em.getTransaction().begin();
		em.merge(t);
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
	
	
	@SuppressWarnings("unchecked")
	public T buscarPorCpf(String cpf) {
		String jpql = "select c from " +getEntityName()+ " c where c.cpf = '" + cpf + "'";
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		
		for (Object object: list) {			
			return ((T) object);
		}
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public List<T> buscarPorDescricao(String b) {
		String jpql = "select c from " +getEntityName()+ " c ";
		if(!b.equals("null") && !b.equals("*")) {
			jpql += "where c.descricao LIKE '%" + b + "%' ORDER BY c.descricao ASC";
		}
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		
		List<T> listObjetos = new ArrayList<T>();
		for (Object object: list) {			
			listObjetos.add((T) object);
		}
		return listObjetos;
	}
	
	public List<T> buscarPorIdClienteLista(int id) {		
		String jpql = "select c from "+getEntityName()+" c where c.cliente.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings({ "unchecked" })
		List<T> list = query.getResultList();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public T buscarPorIdUsuario(int id) {

		String jpql = "select c from "+getEntityName()+" c where c.usuario.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((T) object);
		}
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public T buscarPorIdVeiculo(int id) {
		T obj = (T) new Object();
		String jpql = "select c from "+getEntityName()+" c where c.veiculo.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			obj = (T) object;
		}
		return (T) obj;
	}
	
	public abstract String getEntityName();
}
