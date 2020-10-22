package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name="veiculos")

public class Veiculo extends Persistivel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(length = 5,nullable = false)
	private  String ano;

	@Column(length = 10,nullable = false)
	private  String placa;

	@OneToOne(cascade=CascadeType.ALL)
	private Cliente cliente;

	@ManyToOne(cascade=CascadeType.ALL)
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
