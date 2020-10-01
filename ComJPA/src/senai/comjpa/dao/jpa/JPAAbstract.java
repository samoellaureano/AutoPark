package senai.comjpa.dao.jpa;

import javax.persistence.EntityManager;

public abstract class JPAAbstract <T> extends JPAConnection{
	
	public JPAAbstract( T t ) {
		EntityManager em = getEntityManager();
		em.getTransaction().begin();
		em.persist(t);
		em.getTransaction().commit();
		em.close();
	}

}
