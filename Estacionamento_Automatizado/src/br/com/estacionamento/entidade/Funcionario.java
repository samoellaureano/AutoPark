package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="funcionarios")
public class Funcionario extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(length = 45,nullable = false)
	private  String nome;

	@Column(length = 11,nullable = false)
	private  int celular;

	@Column(length = 45,nullable = false)
	private  String email;

	@ManyToOne(cascade=CascadeType.PERSIST)
	private Empresa empresa;

	@OneToOne(cascade=CascadeType.MERGE)
	private Usuario usuario;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getCelular() {
		return celular;
	}

	public void setCelular(int celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}
