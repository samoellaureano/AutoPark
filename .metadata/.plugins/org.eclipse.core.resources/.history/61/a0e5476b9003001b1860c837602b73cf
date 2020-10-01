package senai.comjpa.dao;

import senai.comjpa.dao.jpa.CidadeJPADAO;
import senai.comjpa.dao.jpa.ClienteJPADAO;
import senai.comjpa.dao.jpa.EstadoJPADAO;

public class DAOFactory {
	
	/*
	 * Factory, do DaoFactory, é um “facilitador”, quando você precisa de uma
	 * instância de algum objeto como por exemplo uma conexão de banco, usa-se um
	 * Factory, pois através de um método apenas, você já recebe essa instância já
	 * aberta e devidamente configurada… Isso tudo se faz dentro do Factory, ou
	 * seja, você poupa ficar escrevendo código toda vez que precisa abrir uma
	 * conexão…
	 */
	
	@SuppressWarnings("rawtypes")
	public static Object getInstanceOf(Class c) {
		if ( c.equals(ClienteDAO.class) ) {
			return new ClienteJPADAO();
		} else if ( c.equals(CidadeDAO.class) ) {
			return new CidadeJPADAO();
		} else if ( c.equals(EstadoDAO.class) ) {
			return new EstadoJPADAO();
		}
		return null;
	}
}
