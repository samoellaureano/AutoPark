package br.com.estacionamento.entidade;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="veiculos")

public class Veiculo implements Serializable {
    private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 90,nullable = false) // max de 100 caracteres e nao pode ser null estes campos da tabela.
	private  String marca;
	
	@Column(length = 90,nullable = false)
	private  String modelo;
	
	@Column(length = 5,nullable = false)
	private  String ano;
	
	@Column(length = 10,nullable = false)
	private  String placa;

	/* O lado "Many" é o da classe que envolve isso tudo, no caso "Veiculo". O lado One é o da entidade relacionada, no caso "Cliente". */
	
	@ManyToOne
	/* @JoinColumns({
        @JoinColumn(name="ADDR_ID", referencedColumnName="ID"),
        @JoinColumn(name="ADDR_ZIP", referencedColumnName="ZIP")
    }) */
	@JoinColumn(name = "cliente_id", referencedColumnName="Cliente") //Coluna de junção
	private Cliente cliente;
	
	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}
}
