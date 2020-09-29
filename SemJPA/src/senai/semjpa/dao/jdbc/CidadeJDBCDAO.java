package senai.semjpa.dao.jdbc;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import senai.semjpa.dao.CidadeDAO;
import senai.semjpa.dao.DAOFactory;
import senai.semjpa.dao.EstadoDAO;
import senai.semjpa.model.Cidade;
import senai.semjpa.model.Estado;

public class CidadeJDBCDAO extends JDBCConnection implements CidadeDAO {

	@Override
	public int incluir(Cidade cidade) throws SQLException {
		
		// verifica se o estado tem id (ou seja, já existe no banco)
		if ( cidade.getEstado().getId() <= 0 ) {
			
			// busca a implementação de EstadoDAO
			EstadoDAO estadoDAO = (EstadoDAO) DAOFactory.getInstanceOf(EstadoDAO.class);
			
			// inclui o novo estado no banco
			int estadoId = estadoDAO.incluir(cidade.getEstado());
			
			// atribui no estado da cidade id do estado
			cidade.getEstado().setId(estadoId);
		}
		
		// inclui a cidade no banco
		String sql = "insert into cidade (nome, estado) values (?,?);";
		PreparedStatement st = super.prepareStatementGerandoId(sql);
		st.setString(1, cidade.getNome() );
		st.setInt(2, cidade.getEstado().getId() );
		
		st.executeUpdate();
		
		// retorna o id da cidade criada
		return getId(st);
	}

	@Override
	public Cidade buscarPorId(int id) throws SQLException {
		String sql = "select id, nome, estado from cidade where id = ?";
		PreparedStatement st = super.prepareStatement(sql);
		st.setInt(1, id );
		
		ResultSet rs = st.executeQuery();
		while( rs.next() ) {
			Cidade cidade = new Cidade();
			
			cidade.setId(rs.getInt("id"));
			cidade.setNome(rs.getString("nome"));
			
			// busca a implementação de EstadoDAO
			EstadoDAO estadoDAO = (EstadoDAO) DAOFactory.getInstanceOf(EstadoDAO.class);
			
			// busca o estado da cidade com base no id do estado
			Estado estado = estadoDAO.buscarPorId(rs.getInt("estado"));
			
			// atribui o estado encontrada no banco na cidade
			cidade.setEstado(estado);
			
			st.close();
			
			return cidade;
		}
		return null;
	}
	
	
	
}
