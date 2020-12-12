package br.com.estacionamento.dao.jpa;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.entidade.Funcionario;

public class FuncionarioJPADAO extends JPAAbstract<Funcionario>{

	@Override
	public String getEntityName() {
		return "Funcionario";
	}
	
	public List<Funcionario> buscarPorDescricaoADM(String b) {
		String jpql = "select c from " +getEntityName()+ " c where c.usuario.perfil = 2 AND c.ativo = 1 ORDER BY c.nome ASC";
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();

		List<Funcionario> listObjetos = new ArrayList<Funcionario>();
		for (Object object: list) {			
			listObjetos.add((Funcionario) object);
		}
		super.close();
		return listObjetos;
	}

}
