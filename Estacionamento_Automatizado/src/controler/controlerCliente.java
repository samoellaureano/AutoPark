package controler;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.estacionamento.controlerInterface.ClienteInterface;
import br.com.estacionamento.entidade.Cliente;

public class controlerCliente implements ClienteInterface{

	EntityManagerFactory emf;
	EntityManager em;	
	
	public  controlerCliente() {
		emf= Persistence.createEntityManagerFactory("autopark");
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
		return false;
		// TODO Auto-generated method stub
		
	}

	@Override
	public Cliente buscar(int id) {
		// TODO Auto-generated method stub
		return null;
	}	
	
}
