package senai.semjpa.dao;

import senai.semjpa.dao.jdbc.CidadeJDBCDAO;
import senai.semjpa.dao.jdbc.ClienteJDBCDAO;
import senai.semjpa.dao.jdbc.EstadoJDBCDAO;

public class DAOFactory {
	
	@SuppressWarnings("rawtypes")
	public static Object getInstanceOf(Class c) {
		if ( c.equals(ClienteDAO.class) ) {
			return new ClienteJDBCDAO();
		} else if ( c.equals(CidadeDAO.class) ) {
			return new CidadeJDBCDAO();
		} else if ( c.equals(EstadoDAO.class) ) {
			return new EstadoJDBCDAO();
		}
		return null;
	}
}
