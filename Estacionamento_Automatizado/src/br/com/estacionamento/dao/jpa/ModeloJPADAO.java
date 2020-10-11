package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.ModeloDAO;
import br.com.estacionamento.entidade.Modelo;

public class ModeloJPADAO extends JPAAbstract<Modelo> implements ModeloDAO{

	@Override
	public String getEntityName() {
		return "Modelo";
	}

}
