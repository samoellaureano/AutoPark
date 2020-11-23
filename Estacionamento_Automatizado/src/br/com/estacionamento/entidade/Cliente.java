package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="clientes")

public class Cliente extends Persistivel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false,length = 100)
	private String nome;

	@Column(nullable = false,length = 255)
	private String email;

	@Column(nullable = false,length = 12)
	private String celular;

	@JoinColumn(referencedColumnName = "id")
    @OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	private Usuario usuario;

	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCelular() {
		return celular;
	}
	public void setCelular(String celular) {
		this.celular = celular;
	}	

	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}
