package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.MarcaDAO;
import br.com.estacionamento.entidade.Marca;

public class marcaJPADAO extends JPAAbstract<Marca> implements MarcaDAO{

	@Override
	public String getEntityName() {
		return "Marca";
	}

}
