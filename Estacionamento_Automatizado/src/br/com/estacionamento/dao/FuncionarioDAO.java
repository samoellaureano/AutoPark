package br.com.estacionamento.dao;

import java.util.List;

import br.com.estacionamento.entidade.Funcionario;

public interface FuncionarioDAO {
	public List<Funcionario> buscarPorDescricaoADM(String b);

}
