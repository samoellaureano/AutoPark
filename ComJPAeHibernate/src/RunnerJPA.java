import senai.comjpa.dao.jpa.ClienteJPADAO;
import senai.comjpa.pojo.Cidade;
import senai.comjpa.pojo.Cliente;
import senai.comjpa.pojo.Estado;

public class RunnerJPA {

	public static void main(String[] args) {

		// Cria um objeto do tipo Estado
		Estado sc = new Estado();
		sc.setNome("Santa Catarina");
		sc.setUf("SC");

		// Cria um objeto do tipo Cidade
		Cidade joi = new Cidade();
		joi.setEstado(sc);
		joi.setNome("Joinville");

		// Cria um objeto do tipo Cliente
		Cliente eu = new Cliente();
		eu.setCidade(joi);
		eu.setNome("Thiago");
		
		ClienteJPADAO clienteJPA = new ClienteJPADAO();
		clienteJPA.incluir(eu);
		
		System.out.println(clienteJPA.buscarPorId(1));

	}

}
