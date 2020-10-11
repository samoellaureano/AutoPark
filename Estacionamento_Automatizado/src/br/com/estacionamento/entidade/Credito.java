package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="Creditos")
public class Credito extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private  double saldo;

	public double getSaldo() {
		return saldo;
	}

	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}



}
