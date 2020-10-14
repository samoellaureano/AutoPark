package br.com.estacionamento.util;

import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Usuario;

public class Login {
	
	private UsuarioJPADAO jpaUsuario;
	private Usuario usuarioAutenticado;
	public Login(UsuarioJPADAO jpaUsuario) {
		this.jpaUsuario = jpaUsuario;
	}
	
	public boolean autenticaUsuario(Usuario login) {
		this.usuarioAutenticado = jpaUsuario.buscarPorCpf(login.getCpf());
		//System.out.println("Senha do banco - " +this.usuarioAutenticado.getSenha());
		return login.equals(this.usuarioAutenticado);
	}
	
	public Usuario usuarioAutenticado() {
		return usuarioAutenticado;
	}
	
	
}
