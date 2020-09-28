package br.com.estacionamento.entidade;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import br.com.estacionamento.object.Cliente;
import br.com.estacionamento.object.Veiculo;

public class EntiCliente {

	EntityManagerFactory emf;
	EntityManager em;	
	
	public  EntiCliente() {
		emf= Persistence.createEntityManagerFactory("autoPark");
		em = emf.createEntityManager();
	}
	
	public Boolean Salvar (Cliente cliente) {
		
		try {
			
			em.getTransaction().begin();
			em.merge(cliente);		
			em.getTransaction().commit();
			
			return true;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}finally{
			emf.close();
		}		
		
	}// fim do método;
	
	
	
}
