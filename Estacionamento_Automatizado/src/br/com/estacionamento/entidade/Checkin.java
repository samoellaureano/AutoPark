package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="checkins")
public class Checkin extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private  Date dataHora;

	@ManyToOne(cascade=CascadeType.ALL)
	private Cliente cliente;

	@ManyToOne(cascade=CascadeType.ALL)
	private Estacionamento estacionamento;

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Estacionamento getEstacionamento() {
		return estacionamento;
	}

	public void setEstacionamento(Estacionamento estacionamento) {
		this.estacionamento = estacionamento;
	}


}
