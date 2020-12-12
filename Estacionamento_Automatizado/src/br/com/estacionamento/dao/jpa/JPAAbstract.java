package br.com.estacionamento.dao.jpa;

import java.util.ArrayList;
import java.util.Date;
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
		for (Object object: list){
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
		super.close();
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<T> buscarPorDescricao(String b) {
		String jpql = "select c from " +getEntityName()+ " c ";
		if(!b.equals("null") && !b.equals("*")) {
			jpql += " WHERE c.descricao LIKE '%" + b + "%' ORDER BY c.descricao ASC";
		}
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();

		List<T> listObjetos = new ArrayList<T>();
		for (Object object: list) {			
			listObjetos.add((T) object);
		}
		super.close();
		return listObjetos;
	}

	@SuppressWarnings("unchecked")
	public List<T> buscarPorNome(String b) {
		String jpql = "select c from " +getEntityName()+ " c ";
		if(!b.equals("null") && !b.equals("*")) {
			jpql += "where c.nome LIKE '%"+b+"%' ORDER BY c.nome ASC";
		}
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();

		List<T> listObjetos = new ArrayList<T>();
		for (Object object: list) {			
			listObjetos.add((T) object);
		}
		super.close();
		return listObjetos;
	}

	public List<T> buscarPorIdClienteLista(int id) {
		String jpql = "";
		if(id == 0) {
			jpql = "select c from "+getEntityName()+" c";
		}else {
			jpql = "select c from "+getEntityName()+" c where c.cliente.id ="+id;
		}
		Query query = super.getQuery(jpql);
		@SuppressWarnings({ "unchecked" })
		List<T> list = query.getResultList();
		super.close();
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
		super.close();
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
		super.close();
		return (T) obj;
	}

	@SuppressWarnings("unchecked")
	public List<T> buscarPorIdClienteDataIF(int id, Date dataInicial, Date dataFinal) {
		String jpql = "";
		if(id == 0) {
			jpql = "select c from "+getEntityName()+" c where c.dataHora BETWEEN :DI AND :DF";
		}else {
			jpql = "select c from "+getEntityName()+" c where c.cliente.id ="+id+" AND c.dataHora BETWEEN :DI AND :DF";
		}
		Query query = super.getQuery(jpql);
		query.setParameter("DI", dataInicial);
		query.setParameter("DF", dataFinal);

		List<T> list = query.getResultList();
		super.close();
		return list;
	}

	public abstract String getEntityName();
}
