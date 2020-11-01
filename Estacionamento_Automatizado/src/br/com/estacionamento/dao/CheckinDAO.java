package br.com.estacionamento.dao;

import br.com.estacionamento.entidade.Checkin;

public interface CheckinDAO {
	public Checkin buscarPorIdVeiculo(int id);
	public Checkin buscarPorIdCliente(int id);

}
