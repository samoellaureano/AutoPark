package br.com.estacionamento.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.estacionamento.dao.jpa.EmpresaJPADAO;
import br.com.estacionamento.entidade.Empresa;
import br.com.estacionamento.util.UtilRest;

@Path("empresaRest")
public class EmpresaRest extends UtilRest{
	
	@POST
	@Path("/addCliente")
	@Consumes("application/*")

	public Response salvar(String addCliente){

		try {

			Empresa empresa = new ObjectMapper().readValue(addCliente,Empresa.class);
			EmpresaJPADAO empresaJpadao = new EmpresaJPADAO();

			boolean	retorno = empresaJpadao.salvar(empresa);

			if(retorno){
				// true = Cadastrado com sucesso.
				return this.buildResponse("1");				

			}else if(retorno==false){
				// false = ja existe
				return this.buildErrorResponse("2");

			}else {
				// null = Erro ao cadastrar
				return this.buildErrorResponse("0");			
			}

		} catch (Exception e){
			e.printStackTrace();

			return this.buildErrorResponse("Erro ao cadastrar");
		}

	}

}
