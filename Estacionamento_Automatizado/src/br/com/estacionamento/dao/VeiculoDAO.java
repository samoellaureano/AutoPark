package br.com.estacionamento.dao;

import java.util.List;

import br.com.estacionamento.entidade.Veiculo;

public interface VeiculoDAO {
	public Veiculo buscarPorPlaca (String placa);
	public List<Veiculo> buscarPorCliente (int id);

}
