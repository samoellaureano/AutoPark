package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.VeiculoDAO;
import br.com.estacionamento.entidade.Veiculo;

public class VeiculoJPADAO extends JPAAbstract<Veiculo> implements VeiculoDAO{

	@Override
	public String getEntityName() {
		return "Veiculo";
	}
	
	@Override
	public Veiculo buscarPorPlaca(String placa) {
		String jpql = "select c from "+getEntityName()+" c where c.placa =:placa ";
		Query query = super.getQuery(jpql);
		query.setParameter("placa", placa);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((Veiculo) object);
		}
		return null;
	}
	
	
}
