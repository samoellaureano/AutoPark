package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="estacionamentos")
public class Estacionamento extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(length = 45,nullable = false)
	private  String descricao;

	@Column(length = 45,nullable = false)
	private  String endereco;

	@Column(nullable = false)
	private  int vagas;

	@Column(length = 14,nullable = false)
	private  String cnpj;

	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private Empresa empresa;
	
	@Column
	private boolean ativo;

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public int getVagas() {
		return vagas;
	}

	public void setVagas(int vagas) {
		this.vagas = vagas;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	
	

}
