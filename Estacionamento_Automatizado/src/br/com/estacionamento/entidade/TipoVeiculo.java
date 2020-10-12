package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tiposVeiculos")
public class TipoVeiculo extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(length = 45,nullable = false)
	private String descricao;
	
	
	@OneToMany(mappedBy="tipoVeiculo",  cascade = CascadeType.ALL)
    private Set<TabelaDePreco> tabelaDePreco = new HashSet<TabelaDePreco>();

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public Set<TabelaDePreco> getTabelaDePreco() {
		return tabelaDePreco;
	}

	public void setTabelaDePreco(Set<TabelaDePreco> tabelaDePreco) {
		this.tabelaDePreco = tabelaDePreco;
	}

	

}
