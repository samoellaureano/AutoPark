package br.com.estacionamento.util;

import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Usuario;

public class Login {
	
	private UsuarioJPADAO jpaUsuario;
	private Usuario usuarioBanco;
	public Login(UsuarioJPADAO jpaUsuario) {
		this.jpaUsuario = jpaUsuario;
	}
	
	public boolean autenticaUsuario(Usuario loginFront) {
		this.usuarioBanco = jpaUsuario.buscarPorCpf(loginFront.getCpf());
		//System.out.println("Senha do banco - " +this.usuarioBanco.getSenha());
		if(usuarioBanco != null) {
			return loginFront.getSenha().equals(this.usuarioBanco.getSenha());
		}
		return false;
	}
	
	public Usuario usuarioAutenticado() {
		return usuarioBanco;
	}
	
	
}
