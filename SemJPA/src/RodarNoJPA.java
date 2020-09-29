import java.sql.SQLException;

import senai.semjpa.dao.ClienteDAO;
import senai.semjpa.dao.DAOFactory;
import senai.semjpa.dao.jdbc.JDBCConnection;
import senai.semjpa.model.Cidade;
import senai.semjpa.model.Cliente;
import senai.semjpa.model.Estado;


public class RodarNoJPA {
	public static void main(String[] args) throws SQLException {
		
		// cria a estrutura da base de dados
		JDBCConnection.criaEstrutura();
		
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
		
		// Busca a implementação de ClienteDAO
		ClienteDAO clienteDAO = (ClienteDAO) DAOFactory.getInstanceOf(ClienteDAO.class);
		int id = 0;
		try {
			// Inclui o registro cliente e automaticamente já cadastra cliente e estado
			id = clienteDAO.incluir(eu);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		// busca o cliente que foi gravado agora
		Cliente clienteGravado = clienteDAO.buscarPorId(id);
		
		// imprime os dados do cliente 
		System.out.println( clienteGravado );
	}
}
