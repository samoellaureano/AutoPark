package br.com.estacionamento.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.UsuarioDAO;
import br.com.estacionamento.entidade.Usuario;

public class UsuarioJPADAO extends JPAAbstract<Usuario> implements UsuarioDAO{

	@Override
	public String getEntityName() {
		return "Usuario";
	}

	@Override
	public Usuario buscarPorCpf(String cpf) {
		String jpql = "select c from " +getEntityName()+ " c where c.cpf = " + cpf;
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for (Object object: list) {
			return ((Usuario) object);
		}
		return null;
	}

}
