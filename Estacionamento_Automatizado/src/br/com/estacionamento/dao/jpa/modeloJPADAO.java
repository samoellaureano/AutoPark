package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.ModeloDAO;
import br.com.estacionamento.entidade.Modelo;

public class modeloJPADAO extends JPAAbstract<Modelo> implements ModeloDAO{

	@Override
	public String getEntityName() {
		return "Modelo";
	}

}
