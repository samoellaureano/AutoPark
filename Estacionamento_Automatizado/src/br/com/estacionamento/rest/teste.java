package br.com.estacionamento.rest;

import br.com.estacionamento.entidade.Cliente;
import controler.controlerCliente;

public class teste {

	public static void main(String[] args) {
		
		Cliente cliente = new Cliente();
		cliente.setCelular(7676878);
		cliente.setCpf("345435");
		cliente.setEmail("samoellaureano@gmail.com");
		cliente.setNome("Samoel");
		cliente.setSenha("763273");
		
		controlerCliente con = new controlerCliente();
		
		boolean retorno = con.salvar(cliente);
		
		System.out.println(retorno);
		

	}

}
