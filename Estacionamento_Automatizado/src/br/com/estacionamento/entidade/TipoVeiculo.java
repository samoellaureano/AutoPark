package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="tiposVeiculos")
public class TipoVeiculo extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(length = 45,nullable = false)
	private String descricao;
	
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
