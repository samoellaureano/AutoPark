package br.com.estacionamento.dao;

import br.com.estacionamento.entidade.Usuario;

public interface UsuarioDAO {
	public Usuario buscarPorCpf(String cpf);
}
