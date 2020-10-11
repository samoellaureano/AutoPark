package br.com.estacionamento.entidade;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="pagamentos")
public class Pagamento extends Persistivel implements Serializable{
	private static final long serialVersionUID = 1L;

	@Column(nullable = false)
	private int numCartao;

	@Column(nullable = false)
	private String titular;

	@Column(nullable = false)
	private Date validade;

	@Column(nullable = false)
	private int codVerificacao;

	@OneToOne(cascade=CascadeType.MERGE)
	private Cliente cliente;

	public int getNumCartao() {
		return numCartao;
	}

	public void setNumCartao(int numCartao) {
		this.numCartao = numCartao;
	}

	public String getTitular() {
		return titular;
	}

	public void setTitular(String titular) {
		this.titular = titular;
	}

	public Date getValidade() {
		return validade;
	}

	public void setValidade(Date validade) {
		this.validade = validade;
	}

	public int getCodVerificacao() {
		return codVerificacao;
	}

	public void setCodVerificacao(int codVerificacao) {
		this.codVerificacao = codVerificacao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}




}
