package br.com.estacionamento.rest;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.ws.rs.POST;
import javax.ws.rs.Path;      //Identifica o caminho do URI para o qual uma classe de recurso ou método de classe atenderá solicitações.
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.estacionamento.dao.jpa.ClienteJPADAO;
import br.com.estacionamento.dao.jpa.FuncionarioJPADAO;
import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.SendMail;
import br.com.estacionamento.util.UtilRest;

@Path("recuperacaoSenha")      //Caminho URI da classe Rest utilizada.
public class RestSenha extends UtilRest{
	@POST
	@Path("/esqueciSenha/{cpf}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response esqueciSenha(@PathParam("cpf") String cpf){
		try {
			Map<String, String> msg = new HashMap<String, String>();
			String email;
			Usuario usuario = new UsuarioJPADAO().buscarPorCpf(cpf);

			String novaSenha = "";

			//Determia as letras que poderão estar presente nas chaves
			String letras = "ABCDEFGHIJKLMNOPQRSTUVYWXZ";

			Random random = new Random();				 

			int index = -1;
			for( int i = 0; i < 9; i++ ) {
				index = random.nextInt( letras.length() );
				novaSenha += letras.substring( index, index + 1 );
			}

			if(usuario.getPerfil()==0) {
				// Cliente 
				email = new ClienteJPADAO().buscarPorIdUsuario(usuario.getId()).getEmail();
			}else{			
				// Funcionario
				email = new FuncionarioJPADAO().buscarPorIdUsuario(usuario.getId()).getEmail();
			}


			if(!email.equals("null")){
				System.out.println(novaSenha);
				SendMail.enviarEmail(email, novaSenha);
			}
			String[] splitEmail = email.split("@");
			String[] splitEmailInicio = splitEmail[0].split("");
			email = splitEmailInicio[0]+splitEmailInicio[1]+splitEmailInicio[2]+"*******@" + splitEmail[1];	

			String novaSenhaCodificada = Base64.getEncoder().encodeToString(novaSenha.getBytes());
			usuario.setSenhaCriptografada(novaSenhaCodificada);

			boolean retorno =  new UsuarioJPADAO().atualizar(usuario);

			//Criando a mensagem para o usuário
			msg.put("retorno", ""+retorno+"");
			msg.put("email", email);

			return this.buildResponse(msg);
		}catch(Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

}//Finalizar a classe
