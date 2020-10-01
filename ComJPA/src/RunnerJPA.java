import senai.comjpa.dao.ClienteDAO;
import senai.comjpa.dao.DAOFactory;
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

		ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);
		clienteDAO.incluir(eu);

	}

}
