package br.com.estacionamento.dao.jpa;

import java.util.ArrayList;
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
		Veiculo veiculo = new Veiculo();
		String jpql = "select c from "+getEntityName()+" c where c.placa =:placa ";
		Query query = super.getQuery(jpql);
		query.setParameter("placa", placa);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			veiculo = ((Veiculo) object);
		}
		super.close();
		return veiculo;
	}

	@Override
	public List<Veiculo> buscarPorCliente(int id) {
		List<Veiculo> listaVeiculos = new ArrayList<Veiculo>();
		String jpql = "select c from "+getEntityName()+" c where c.cliente.id =:id AND c.ativo = true";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			listaVeiculos.add((Veiculo) object);
		}
		super.close();
		return listaVeiculos;
	}
	
	
}
