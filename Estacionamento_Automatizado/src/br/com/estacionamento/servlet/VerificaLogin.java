package br.com.estacionamento.servlet;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import com.google.gson.Gson;

import br.com.estacionamento.dao.jpa.UsuarioJPADAO;
import br.com.estacionamento.entidade.Usuario;
import br.com.estacionamento.util.Login;

@WebServlet("/verificaLogin")
public class VerificaLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, NoSuchAlgorithmException {

		Usuario loginFront = new ObjectMapper().readValue(request.getReader(), Usuario.class);
		

		String context = request.getServletContext().getContextPath(); //recebe a urlda request
		loginFront.setSenhaCriptografada(loginFront.getSenha());

		Login login = new Login(new UsuarioJPADAO());

		boolean retorno = false;
		HttpSession sessao = request.getSession();

		if (login.autenticaUsuario(loginFront)) {
			sessao.setAttribute("login", login.usuarioAutenticado().getCpf());				
			sessao.setAttribute("perfil", login.usuarioAutenticado().getPerfil());
			sessao.setAttribute("idUsuario", login.usuarioAutenticado().getId());

			retorno = true;
			
			sessao.setMaxInactiveInterval(30*60);
		} else{			
			retorno = false;
		}


		//Criando a mensagem para o usuário
		Map<String, String> msg = new HashMap<String, String>();
		if(retorno){
			msg.put("url", context + "/resources/principal.html");
		}else{
			msg.put("msg", "Usuario ou senha incorretos!");
		}

		//Retorna a resposta para o usuário a partir do Json
		String json = new Gson().toJson(msg);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	protected void doGet (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		try {
			process(request, response);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected void doPost (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		try {
			process(request, response);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
