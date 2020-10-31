package br.com.estacionamento.dao;

import java.util.List;

import br.com.estacionamento.entidade.Estacionamento;

public interface EstacionamentoDAO {
	
	public List<Estacionamento> buscarPorIdEsmpresa (int id);

}
