package senai.semjpa.dao;

import java.sql.SQLException;

import senai.semjpa.model.Cliente;

public interface ClienteDAO {
	public int incluir(Cliente cliente) throws SQLException;
	public Cliente buscarPorId(int id) throws SQLException;
	
}
