package br.com.estacionamento.entidade;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tabelaDePrecos")
public class TabelaDePreco extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private  double valor;

	@Column(length = 45,nullable = false)
	private  String descricao;
	
	@Column(length = 45)
	private  String tipoCobranca;

	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private TipoVeiculo tipoVeiculo;
	
	@JoinColumn(referencedColumnName = "id")
	@ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private Estacionamento estacionamento;
	
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public TipoVeiculo getTipoVeiculo() {
		return tipoVeiculo;
	}
	public void setTipoVeiculo(TipoVeiculo tipoVeiculo) {
		this.tipoVeiculo = tipoVeiculo;
	}
	public Estacionamento getEstacionamento() {
		return estacionamento;
	}
	public void setEstacionamento(Estacionamento estacionamento) {
		this.estacionamento = estacionamento;
	}    

}
