package senai.semjpa.dao.jdbc;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import senai.semjpa.dao.EstadoDAO;
import senai.semjpa.model.Estado;

public class EstadoJDBCDAO extends JDBCConnection implements EstadoDAO {

	@Override
	public int incluir(Estado estado) throws SQLException {
		// inclui o estado no banco
		String sql = "insert into estado (nome, uf) values (?,?);";
		PreparedStatement st = super.prepareStatementGerandoId(sql);
		st.setString(1, estado.getNome() );
		st.setString(2, estado.getUf() );
		
		st.executeUpdate();
		
		// retorna o id do estado criada
		return getId(st);
	}

	@Override
	public Estado buscarPorId(int id) throws SQLException {
		String sql = "select id, nome, uf from estado where id = ?";
		PreparedStatement st = super.prepareStatement(sql);
		st.setInt(1, id );
		
		ResultSet rs = st.executeQuery();
		while( rs.next() ) {
			Estado estado = new Estado();
			
			estado.setId(rs.getInt("id"));
			estado.setNome(rs.getString("nome"));
			estado.setUf(rs.getString("uf"));
			
			st.close();
			
			return estado;
		}
		return null;
	}
	
	
	
}
