package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="empresas")
public class Empresa extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false,length = 14)
	private String cnpj;

	@Column(nullable = false,length = 45)
	private String descricao;

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


}
