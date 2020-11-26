package br.com.estacionamento.dao.jpa;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import br.com.estacionamento.dao.CheckoutDAO;
import br.com.estacionamento.entidade.Checkout;

public class CheckoutJPADAO extends JPAAbstract<Checkout> implements CheckoutDAO{

	@Override
	public String getEntityName() {
		return "Checkout";
	}
	
	@SuppressWarnings("unchecked")
	public Checkout buscarPorIdVeiculo(int id) {
		Checkout checkout = new Checkout();
		String jpql = "select c from "+getEntityName()+" c where c.veiculo.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);
		
		List<Checkout> list = query.getResultList();
		for (Checkout objCheckout: list) {
			checkout = objCheckout;
		}
		return checkout;
	}
	
	public float buscarReceitaDia(int id){

		float receita = 0;

		String jpql = "select c from "+getEntityName()+" c where c.estacionamento.id =:id ";
		Query query = super.getQuery(jpql);
		query.setParameter("id", id);

		@SuppressWarnings({ "unchecked" })
		List<Checkout> list = query.getResultList();

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd"); 
		Date data = new Date(); 
		String dataAtual = dateFormat.format(data);		

		for (Checkout checkoutObj: list){
			if(checkoutObj.getVeiculo().getAtivo()==true) {	
				// verifica se o veiculo esta ativo
				String dataCheckout = dateFormat.format(checkoutObj.getDataHora());

				if(dataCheckout.equals(dataAtual)){

					receita +=(checkoutObj.getValor());

				}
			}		
		}

		return receita;

	}

}
