package br.com.estacionamento.dao;

import java.util.List;

import br.com.estacionamento.entidade.Modelo;

public interface ModeloDAO {
	
	public List<Modelo> buscarPorIdMarca(int IdMarca);

}
