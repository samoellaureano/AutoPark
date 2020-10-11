package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="modelos")
public class Modelo extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false,length = 45)
	private String descricao;

	@ManyToOne(cascade=CascadeType.PERSIST)
	private Marca marca;

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Marca getMarca() {
		return marca;
	}

	public void setMarca(Marca marca) {
		this.marca = marca;
	}



}
