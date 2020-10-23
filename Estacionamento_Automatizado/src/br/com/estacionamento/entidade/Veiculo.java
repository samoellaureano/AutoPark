package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name="veiculos")

public class Veiculo extends Persistivel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private  String ano;

	@Column(length = 10,nullable = false)
	private  String placa;

	@JoinColumn(referencedColumnName = "id")
	@OneToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private Cliente cliente;

	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private Modelo modelo;

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Modelo getModelo() {
		return modelo;
	}
	
	public void setModelo(Modelo modelo) {
		this.modelo = modelo;
	}
}
