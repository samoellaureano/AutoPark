package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.FuncionarioDAO;
import br.com.estacionamento.entidade.Funcionario;

public class FuncionarioJPADAO extends JPAAbstract<Funcionario> implements FuncionarioDAO{

	@Override
	public String getEntityName() {
		return "Funcionario";
	}
	

}
