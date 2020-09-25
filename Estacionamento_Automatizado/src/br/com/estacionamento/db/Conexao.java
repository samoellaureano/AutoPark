package br.com.estacionamento.db;

import java.sql.Connection;

public class Conexao {

	private Connection conexao;
	
	public Connection abrirConexao() {
	// tem que ver certinho o caminho no banco de dados...
		
		try {
			 Class.forName("org.gjt.mm.mysql.Driver");
			// Class.forName("com.mysql.cj.jdbc.Driver");
			conexao = java.sql.DriverManager.getConnection("jdbc:mysql://localhost:3306/logos","root","123");
		}catch(Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}
	
	public void fecharConexao(){
		try {
			conexao.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}