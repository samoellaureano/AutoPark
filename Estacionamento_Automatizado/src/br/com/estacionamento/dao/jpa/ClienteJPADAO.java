package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.ClienteDAO;
import br.com.estacionamento.entidade.Cliente;

public class ClienteJPADAO extends JPAAbstract<Cliente> implements ClienteDAO{

	@Override
	public String getEntityName() {
		return "Cliente";
	}

	@Override
	public Cliente buscarPorIdCliente(int id) {

		String jpql = "select c from "+getEntityName()+" c where c.usuario.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((Cliente) object);
		}
		return null;
	}
	
}
