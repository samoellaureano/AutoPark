package senai.comjpa.dao.jpa;

import java.util.List;

import javax.persistence.Query;

import senai.comjpa.dao.EstadoDAO;
import senai.comjpa.pojo.Estado;

public class EstadoJPADAO extends JPAConnection implements EstadoDAO{

	@Override
	public int incluir(Estado estado) {
		super.incluir(estado);
		return estado.getId();
	}

	@Override
	public Estado buscarPorId(int id) {
		String jpql = "select e from Estado e where id = " + id;
		Query query = super.getQuery(jpql);
		@SuppressWarnings("rawtypes")
		List list = query.getResultList();
		for(Object object : list) {
			return ((Estado) object);
		}
		return null;
	}

}
