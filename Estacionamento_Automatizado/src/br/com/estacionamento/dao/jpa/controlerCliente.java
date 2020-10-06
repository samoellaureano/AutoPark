package br.com.estacionamento.dao.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.estacionamento.dao.ClienteInterface;
import br.com.estacionamento.entidade.Cliente;

public class controlerCliente implements ClienteInterface{

	EntityManagerFactory emf;
	EntityManager em;	
	
	public  controlerCliente() {
		emf= Persistence.createEntityManagerFactory("autopark");//Unidade de Persistencia
		System.out.println("criou ");
		em = emf.createEntityManager();
	}
	
	public boolean salvar (Cliente cliente) {
		
		try {
			
			em.getTransaction().begin();
			em.merge(cliente);	
			em.getTransaction().commit();
			
			return true;
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
			
		}finally{
			emf.close();
		}		
		
	}// fim do método;

	@Override
	public boolean atualizar(Cliente cliente) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Cliente buscar(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
