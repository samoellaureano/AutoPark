package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.EmpresaDAO;
import br.com.estacionamento.entidade.Empresa;

public class EmpresaJPADAO extends JPAAbstract<Empresa> implements EmpresaDAO{

	@Override
	public String getEntityName() {
		return "Empresa";
	}

}
