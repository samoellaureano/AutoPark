package br.com.estacionamento.dao.jpa;

import br.com.estacionamento.dao.CheckinDAO;
import br.com.estacionamento.entidade.Checkin;

public class CheckinJPADAO extends JPAAbstract<Checkin> implements CheckinDAO{

	@Override
	public String getEntityName() {
		return "Checkin";
	}

}
