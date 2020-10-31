package br.com.estacionamento.dao;

import br.com.estacionamento.entidade.Estacionamento;
import br.com.estacionamento.entidade.Veiculo;

public interface TabelaDePrecoDAO {
	
	public double buscaValor(Veiculo veiculo, Estacionamento estacionamento);
}
