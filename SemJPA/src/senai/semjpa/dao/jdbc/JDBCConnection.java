package senai.semjpa.dao.jdbc;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCConnection {
	private Connection conexao = null;
	
	public static void criaEstrutura() throws SQLException {
		JDBCConnection connection = new JDBCConnection();
		Statement st = connection.createdStatement();
		st.executeUpdate("create table if not exists estado (id int primary key auto_increment, nome varchar(100) not null, uf char(2) not null);");
		
		st = new JDBCConnection().createdStatement();
		st.executeUpdate("create table if not exists cidade (id int primary key auto_increment, nome varchar(100) not null, estado int not null, foreign key(estado) references estado(id));");
		
		st = new JDBCConnection().createdStatement();
		st.executeUpdate("create table if not exists cliente (id int primary key auto_increment, nome varchar(100) not null, cidade int not null, foreign key(cidade) references cidade(id));");
		
		st.close();
		connection.close();
	}
	
	
	private Connection conectar() throws SQLException {
		try { 
			if ( conexao != null && !conexao.isClosed() ) {
				return conexao;
			}
		} catch (Exception e) {}
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		// Setup the connection with the DB
		conexao = DriverManager.getConnection(
				String.format("jdbc:mysql://%s:%d/%s?user=%s&password=%s", 
						Configuracao.URL, Configuracao.PORTA, Configuracao.DATABASE, Configuracao.USUARIO, Configuracao.SENHA));

		return conexao;
	}
	
	public Statement createdStatement() throws SQLException {
		return this.conectar().createStatement();

	}
	public PreparedStatement prepareStatement(String sql) throws SQLException {
		return this.conectar().prepareStatement(sql);
	}
	
	public PreparedStatement prepareStatementGerandoId(String sql) throws SQLException {
		return this.conectar().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	}
	
	public int getId(Statement statement) throws SQLException {
		try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
			if (generatedKeys.next()) {
				return (int) generatedKeys.getLong(1);
			}
			else {
				throw new SQLException("Criação falhou, nenhum id obtido");
			}
		}
	}
	
	public void close() throws SQLException {
		conexao.close();
	}
}
