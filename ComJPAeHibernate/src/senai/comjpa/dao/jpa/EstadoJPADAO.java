package senai.comjpa.dao.jpa;

import senai.comjpa.dao.EstadoDAO;
import senai.comjpa.pojo.Estado;

public class EstadoJPADAO extends JPAAbstract<Estado> implements EstadoDAO{

	@Override
	public String getEntityName() { 
		return "Estado";
	}

}
