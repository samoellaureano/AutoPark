package br.com.estacionamento.dao.jpa;


import br.com.estacionamento.entidade.Funcionario;

public class FuncionarioJPADAO extends JPAAbstract<Funcionario>{

	@Override
	public String getEntityName() {
		return "Funcionario";
	}
	

}
