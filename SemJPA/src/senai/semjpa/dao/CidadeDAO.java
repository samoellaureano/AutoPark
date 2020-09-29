package senai.semjpa.dao;

import java.sql.SQLException;

import senai.semjpa.model.Cidade;

public interface CidadeDAO {
	public int incluir(Cidade cidade) throws SQLException;
	public Cidade buscarPorId(int id) throws SQLException;
	
}
