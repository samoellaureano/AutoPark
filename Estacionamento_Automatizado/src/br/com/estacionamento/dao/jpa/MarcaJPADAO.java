package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.MarcaDAO;
import br.com.estacionamento.entidade.Marca;

public class MarcaJPADAO extends JPAAbstract<Marca> implements MarcaDAO{

	@Override
	public String getEntityName() {
		return "Marca";
	}

}
