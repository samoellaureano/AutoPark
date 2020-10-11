package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name="usuarios")
public class Usuario extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false,length = 35)
	private String senha;

	@Column(nullable = false)
	private int perfil;

	@Column(nullable = false)
	private boolean acesso;

	@Column(nullable = false, length = 11)
	private String cpf;

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public int getPerfil() {
		return perfil;
	}

	public void setPerfil(int perfil) {
		this.perfil = perfil;
	}

	public boolean isAcesso() {
		return acesso;
	}

	public void setAcesso(boolean acesso) {
		this.acesso = acesso;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}





}
