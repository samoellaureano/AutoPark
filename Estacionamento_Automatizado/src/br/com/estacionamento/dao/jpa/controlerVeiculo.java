package br.com.estacionamento.dao.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.estacionamento.dao.VeiculoInterface;
import br.com.estacionamento.entidade.Veiculo;

public class controlerVeiculo implements VeiculoInterface{

	EntityManagerFactory emf;
	EntityManager em;	
	
	public  controlerVeiculo() {
		emf= Persistence.createEntityManagerFactory("autopark");
		em = emf.createEntityManager();
	}
	
	public boolean salvar (Veiculo veiculo) {
	
		try {
			
			em.getTransaction().begin();
			em.merge(veiculo);		
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
	public boolean atualizar(Veiculo veiculo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Veiculo buscar(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
}
