var cliente = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    buscar = function(){
        var valorBusca = $("#buscarCli").val();
        var cfg = {
            type: "POST",
            url: "../rest/clienteRest/buscarClientes/" + valorBusca,
            success: function (listaDeClientes) {
                exibirClientes(listaDeClientes);
            },
            error: function (err) {
                alert("Erro ao buscar cliente: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirClientes = function(listaDeClientes){
        var clientesHTML = "<ul class='itemCliente'>";
        if (listaDeClientes != undefined) {
            if (listaDeClientes.length > 0) {
                for (var i = 0; i < 0; i++) {
                    + '<ul class="itemCliente' + i + '">'
                    +     '<input type="radio" name="cliente" id="cliente' + i + '" hidden>'
                    +     '<label for="cliente' + i + '">' + listaDeClientes.nome[ i ] + '</label>'
                    +     '<li>'
                    +         '<label for="editar' + i + '">Editar</label>'
                    +         '<input type="checkbox" name="editar" id="editar' + i + '" hidden>'
                    +         '<div>'
                    +             '<form action="">'
                    +                 '<label for="nome' + i + '">Nome:</label>'
                    +                 '<input type="text" id="nome' + i + '" value="' + listaDeClientes.nome[ i ] + '">'
                    +                 '<label for="cpf' + i + '">Cpf:</label>'
                    +                 '<input type="text" id="cpf' + i + '" value="' + listaDeClientes.cpf[ i ] + '"></input>'
                    +                 '<label for="celular' + i + '">Celular:</label>'
                    +                 '<input type="text" id="celular' + i + '" value="' + listaDeClientes.telefone[ i ] + '">'
                    +                 '<label for="email' + i + '">Email:</label>'
                    +                 '<input type="text" id="email' + i + '" value="' + listaDeClientes.email[ i ] + '">'
                    +                 '<select name="empresa" id="empresa' + i + '">'
                    +                   '<option value="001">Empresa 001</option>'
                    +                   '<option value="002" select>Empresa 002</option>'
                    +                   '<option value="003">Empresa 003</option>'
                    +                 '</select>'    
                    +                 '<label for="status">Status: <input type="checkbox" id="status' + i + '"></label>'
                    +                 '<div>'
                    +                     '<a href="">Cancelar</a>'
                    +                     '<button onclick="editarCliente(' + i + ')">Confirmar</button>'
                    +                 '</div>'
                    +             '</form>'
                    +         '</div>'
                    +     '</li>'
                    + '</ul>'
                }
                clientesHTML+="</ul>";
            } else {
                clientesHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaClientesHTML").append(clientesHTML);
        }
    }

    editarCliente = function(id){
        cliente.nome    = $( "#nome"    + id ).val();
        cliente.cpf     = $( "#cpf"     + id ).val();
        cliente.celular = $( "#celular" + id ).val();
        cliente.email   = $( "#email"   + id ).val();
        cliente.empresa = $( "#empresa" + id ).val();

        var cfg = {
            url: "../rest/clienteRest/editarCliente",
            data: JSON.stringify(cliente),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Cliente editado com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
                    resp = ("Erro ao editar o Cliente!");
                    exibirMessagem(resp, 2);
                }
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao editar o Cliente!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#cadCliente').click(function(e){
        cliente.nome    = $("#nome").val();
        cliente.cpf     = $("#cpf").val();
        cliente.celular = $("#celular").val();
        cliente.email   = $("#email").val();
        cliente.empresa = $("#empresa").val();
        
        var cfg = {
            url: "../rest/clienteRest/addCliente",
            data: JSON.stringify(cliente),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Cliente cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O cliente ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo cliente!");
                    exibirMessagem(resp, 2);
                }
                
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo cliente!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });

    buscar();

    $('#carrega-listaCliente').click(function(e){
        /*https://tableless.com.br/conteudo-sob-demanda-com-jquery/ */
    });
});




    
