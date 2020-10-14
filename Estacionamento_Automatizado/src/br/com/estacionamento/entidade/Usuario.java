package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import br.com.estacionamento.util.HashUtil;


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
	
	public void setSenhaCriptografada(String senha) {
		HashUtil hash = new HashUtil();
		try {
			//System.out.println("Senha do login - "+senha);
			senha = (senha + "321#cAsA");
			//System.out.println("Senha do login concatenada - "+senha);
			
			//System.out.println("Senha do login criptografada - "+hash.stringToMD5(senha));
			
			this.senha = hash.stringToMD5(senha);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
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
