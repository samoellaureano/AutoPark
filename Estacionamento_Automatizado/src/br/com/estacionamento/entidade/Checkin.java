package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="checkins")
public class Checkin extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private  Date dataHora;

	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private Cliente cliente;

	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
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
