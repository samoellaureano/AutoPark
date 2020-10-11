package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.TipoVeiculoDAO;
import br.com.estacionamento.entidade.TipoVeiculo;

public class TipoVeiculoJPADAO extends JPAAbstract<TipoVeiculo> implements TipoVeiculoDAO{

	@Override
	public String getEntityName() {
		return "TipoVeiculo";
	}

}
