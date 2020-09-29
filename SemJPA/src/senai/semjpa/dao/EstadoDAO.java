package senai.semjpa.dao;

import java.sql.SQLException;

import senai.semjpa.model.Estado;

public interface EstadoDAO {
	public int incluir(Estado estado) throws SQLException;
	public Estado buscarPorId(int id) throws SQLException;
	
}
