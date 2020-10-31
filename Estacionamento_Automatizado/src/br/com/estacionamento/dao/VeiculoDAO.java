package br.com.estacionamento.dao;

import br.com.estacionamento.entidade.Veiculo;

public interface VeiculoDAO {
	public Veiculo buscarPorPlaca (String placa);

}
