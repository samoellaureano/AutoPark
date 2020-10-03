package senai.comjpa.dao.jpa;

import senai.comjpa.dao.ClienteDAO;
import senai.comjpa.pojo.Cliente;

public class ClienteJPADAO extends JPAAbstract<Cliente> implements ClienteDAO {
	
	@Override
	public String getEntityName() { 
		return "Cliente";
	}
}
