package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.util.List;

public class Registro implements Serializable{
	private static final long serialVersionUID = 1L;
	
	List<Checkin> checkin;
	List<Checkout> checkout;
	
	public List<Checkin> getCheckin() {
		return checkin;
	}
	public void setCheckin(List<Checkin> checkin) {
		this.checkin = checkin;
	}
	public List<Checkout> getCheckout() {
		return checkout;
	}
	public void setCheckout(List<Checkout> checkout) {
		this.checkout = checkout;
	}	

}
