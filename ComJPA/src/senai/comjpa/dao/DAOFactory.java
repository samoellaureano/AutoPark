package senai.comjpa.dao;

import senai.comjpa.dao.jpa.CidadeJPADAO;
import senai.comjpa.dao.jpa.ClienteJPADAO;
import senai.comjpa.dao.jpa.EstadoJPADAO;

public class DAOFactory {
	
	/*
	 * Factory, do DaoFactory, � um �facilitador�, quando voc� precisa de uma
	 * inst�ncia de algum objeto como por exemplo uma conex�o de banco, usa-se um
	 * Factory, pois atrav�s de um m�todo apenas, voc� j� recebe essa inst�ncia j�
	 * aberta e devidamente configurada� Isso tudo se faz dentro do Factory, ou
	 * seja, voc� poupa ficar escrevendo c�digo toda vez que precisa abrir uma
	 * conex�o�
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
