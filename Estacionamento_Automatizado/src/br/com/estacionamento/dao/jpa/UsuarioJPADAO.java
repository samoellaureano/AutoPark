package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.UsuarioDAO;
import br.com.estacionamento.entidade.Usuario;

public class UsuarioJPADAO extends JPAAbstract<Usuario> implements UsuarioDAO{

	@Override
	public String getEntityName() {
		return "Usuario";
	}	

}
