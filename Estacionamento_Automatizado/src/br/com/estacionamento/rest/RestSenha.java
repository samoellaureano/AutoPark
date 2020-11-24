package br.com.estacionamento.rest;

import javax.ws.rs.Path;      //Identifica o caminho do URI para o qual uma classe de recurso ou método de classe atenderá solicitações.

import br.com.estacionamento.util.UtilRest;

@Path("recuperacaoSenha")      //Caminho URI da classe Rest utilizada.
public class RestSenha extends UtilRest{

	public RestSenha(){
	}
//	
//	@POST
//	@Path("/esqueciSenha")
//	@Consumes("application/*")
//	public Response esqueciSenha(String numero){
//		Conexao conec = new Conexao();
//		CPF cpf = new CPF(numero.replace("\"", "")); //remover as aspas
//		Usuario usuario = new Usuario();
//		String email;
//		Map<String, String> msg = new HashMap<String, String>();
//		
//		usuario.setCpf(cpf);		
//		try{
//			Connection conexao = conec.abrirConexao();
//			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
//			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);
//			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);
//			
//			Validador.VUsuario validadorUsuario = new Validador.VUsuario(jdbcUsuario);			
//			boolean valUsuario = validadorUsuario.verificaExistenciaBanco(usuario);
//			
//			
//			if(valUsuario) {
//				String novaSenha = "";
//				
//				// Determia as letras que poderão estar presente nas chaves
//				String letras = "ABCDEFGHIJKLMNOPQRSTUVYWXZ";
//				 
//				Random random = new Random();				 
//				
//				int index = -1;
//				for( int i = 0; i < 9; i++ ) {
//				   index = random.nextInt( letras.length() );
//				   novaSenha += letras.substring( index, index + 1 );
//				}
//				
//				String novaSenhaCodificada = Base64.getEncoder().encodeToString(novaSenha.getBytes());
//				usuario.setSenhaCriptografada(novaSenhaCodificada);
//				jdbcUsuario.salvaNovaSenha(usuario);
//				
//				email = jdbcCliente.buscarPorCpf(cpf.getNumero()).getEmail();
//				if(email == null){
//					email = jdbcFuncionario.buscarPorCpf(cpf.getNumero()).getEmail();
//				}
//				
//				if(!email.equals("null")){
//					System.out.println(novaSenha);
//					SendMail.enviarEmail(email, novaSenha);
//				}
//				
//				String[] splitEmail = email.split("@");
//				String[] splitEmailInicio = splitEmail[0].split("");
//				email = splitEmailInicio[0]+splitEmailInicio[1]+splitEmailInicio[2]+"*******@" + splitEmail[1];				
//				
//				//Criando a mensagem para o usuário
//				msg.put("valUsuario", "true");
//				msg.put("email", email);
//			}
//			return this.buildResponse(msg);
//		}catch(Exception e){
//			e.printStackTrace();
//			return this.buildErrorResponse(e.getMessage());
//		}
//	}
	
}//Finalizar a classe
