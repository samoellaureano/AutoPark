package senai.semjpa.dao.jdbc;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import senai.semjpa.dao.CidadeDAO;
import senai.semjpa.dao.ClienteDAO;
import senai.semjpa.dao.DAOFactory;
import senai.semjpa.model.Cidade;
import senai.semjpa.model.Cliente;

public class ClienteJDBCDAO extends JDBCConnection implements ClienteDAO {

	@Override
	public int incluir(Cliente cliente) throws SQLException {
		
		// verifica se a cidade tem id (ou seja, já existe no banco)
		if ( cliente.getCidade().getId() <= 0 ) {
			
			// busca a implementação de CidadeDAO
			CidadeDAO cidadeDAO = (CidadeDAO) DAOFactory.getInstanceOf(CidadeDAO.class);
			
			// inclui a nova cidade no banco
			int cidadeId = cidadeDAO.incluir(cliente.getCidade());
			
			// atribui na cidade do cliente o id da cidade
			cliente.getCidade().setId(cidadeId);
		}
		
		// inclui o cliente no banco
		String sql = "insert into cliente (nome, cidade) values (?,?);";
		PreparedStatement st = super.prepareStatementGerandoId(sql);
		st.setString(1, cliente.getNome() );
		st.setInt(2, cliente.getCidade().getId() );
		
		st.executeUpdate();
		
		// retorna o id do cliente criado
		return getId(st);
	}

	@Override
	public Cliente buscarPorId(int id) throws SQLException {
		String sql = "select id, nome, cidade from cliente where id = ?";
		PreparedStatement st = super.prepareStatement(sql);
		st.setInt(1, id );
		
		ResultSet rs = st.executeQuery();
		while( rs.next() ) {
			Cliente cliente = new Cliente();
			
			cliente.setId(rs.getInt("id"));
			cliente.setNome(rs.getString("nome"));
			
			// busca a implementação de CidadeDAO
			CidadeDAO cidadeDAO = (CidadeDAO) DAOFactory.getInstanceOf(CidadeDAO.class);
			
			// busca a cidade do cliente com base no id da cidade
			Cidade cidade = cidadeDAO.buscarPorId(rs.getInt("cidade"));
			
			// atribui a cidade encontrada no banco no cliente
			cliente.setCidade(cidade);
			
			st.close();
			
			return cliente;
		}
		return null;
	}
	
	
	
}
