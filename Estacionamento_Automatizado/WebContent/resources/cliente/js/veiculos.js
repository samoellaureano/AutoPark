var veiculo = new Object();
$(document).ready(function(){
    $("#menu").load("menu.html");

    buscar = function(){
        var valorBusca = $("#buscarVeic").val();
        var cfg = {
            type: "POST",
            url: "../rest/veiculoRest/buscarVeiculos/" + valorBusca,
            success: function (listaDeVeiculos) {
                exibirVeiculos(listaDeVeiculos);
            },
            error: function (err) {
                alert("Erro ao buscar Veiculo: " + err.responseText);
            }
        };
        autoPark.ajax.post(cfg);      
    }

    exibirVeiculos = function(listaDeVeiculos){
        var veiculosHTML = "<ul class='itemVeiculo'>";
        if (listaDeVeiculos != undefined) {
            if (listaDeVeiculos.length > 0) {
                for (var i = 0; i < 0; i++) {
                    +'<input type="radio" name="veiculo' + i + '" id="vei" hidden>'
                    +'<label for="veiculo' + i + '">'  + listaDeVeiculos.modelo[i] + ' - ' + listaDeVeiculos.placa[i] + '</label>'
                    +'<li>'
                    +    '<label for="editar' + i + '">Editar</label>'
                    +    '<input type="checkbox" name="editar" id="editar' + i + '" hidden>'
                    +    '<div>'
                    +        '<form action="">'
                    +            '<label for="marca' + i + '">Marca</label>'
                    +            '<select name="marca" id="marca' + i + '" required>'
                    +            '<option value=""> - Selecione - </option>'
                    +                // Verificar validação do combobox ( para pegar a posição do array )
                    +                '<option value="ford" selected>' + listaDeVeiculos.marca[ i ] + '</option>'
                    +            '</select>'
                    +            '<label for="modelo' + i + '">Modelo</label>'
                    +            '<select name="modelo" id="modelo' + i + '" required>'
                    +                // Verificar validação do combobox ( para pegar a posição do array )
                    +                '<option value=""> - Selecione - </option>'
                    +                '<option value="newfiesta">New Fiesta</option>'
                    +                '<option value="ka">Ka</option>'
                    +                '<option value="focus" selected>' + listaDeVeiculos.modelo[ i ] + '</option>'
                    +            '</select>'
                    +            '<label for="ano">Ano</label>'
                    +            '<select name="ano" id="ano' + i + '" required>'
                    +                // Verificar validação do combobox ( para pegar a posição do array )
                    +                '<option value=""> - Selecione - </option>'
                    +                '<option value="2010">2010</option>'
                    +                '<option value="2011">2011</option>'
                    +                '<option value="2012">2012</option>'
                    +                '<option value="2013">2013</option>'
                    +                '<option value="2014">2014</option>'
                    +                '<option value="2015">2015</option>'
                    +                '<option value="2016" selected>' + listaDeVeiculos.ano[ i ] + '</option>'
                    +                '<option value="2017">2017</option>'
                    +                '<option value="2018">2018</option>'
                    +                '<option value="2019">2019</option>'
                    +                '<option value="2020">2020</option>'
                    +            '</select>'
                    +            '<label for="cor' + i + '">Cor</label>'
                    +            '<input type="text" id="cor' + i + '" name="cor" value="' + listaDeVeiculos.cor[ i ] + '" placeholder="Informe a cor de veiculo" required>'
                    +            '<label for="tipo' + i + '">Tipo</label>'
                    +            '<select name="tipo" id="tipo' + i + '" required>'
                    +                '<option value=""> - Selecione - </option>'
                    +                '<option value="carro" selected>' + listaDeVeiculos.tipo[ i ] + '</option>'
                    +                '<option value="moto">Moto</option>'
                    +                '<option value="van">Van</option>'
                    +            '</select>'
                    +            '<label for="placa' + i + '">Placa</label>'
                    +            '<input type="text" id="placa" name="placa" value="MKU-5590" placeholder="Informe a placa do veiculo" required>'
                    +            '<label for="cliente' + i + '">Cliente</label>'
                    +            '<input type="text" id="cliente' + i + '" name="cliente">'
                    +            '<br>'
                    +            '<div>'
                    +                '<a href="">Cancelar</a>'
                    +                '<button onclick="editarVeiculo(' + i + ')">Confirmar</button>'
                    +            '</div>'
                    +        '</form>'
                    +    '</div>'
                    +'</li>'
                }
                veiculosHTML+="</ul>";
            } else {
                veiculosHTML += "<li style='text-align: center'>Nenhum registro encontrado</li>";
            }
            $("#listaVeiculosHTML").append(veiculosHTML);
        }
    }

    editarVeiculo = function(id){
        veiculo.marca   = $("#marca"+id).val();
        veiculo.modelo  = $("#modelo"+id).val();
        veiculo.ano     = $("#ano"+id).val();
        veiculo.cor     = $("#cor"+id).val();
        veiculo.tipo    = $("#tipo"+id).val();
        veiculo.placa   = $("#placa"+id).val();
        veiculo.cliente = $("#cliente"+id).val();

        var cfg = {
            url: "../rest/veiculoRest/editarVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculo editado com sucesso!");
                    exibirMessagem(resp, 1);
                }else{
                    resp = ("Erro ao editar o veiculo!");
                    exibirMessagem(resp, 2);
                }
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao editar o veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };

    $('#cadVeiculo').click(function(e){
        veiculo.marca   = $("#marca").val();
        veiculo.modelo  = $("#modelo").val();
        veiculo.ano     = $("#ano").val();
        veiculo.cor     = $("#cor").val();
        veiculo.tipo    = $("#tipo").val();
        veiculo.placa   = $("#placa").val();
        veiculo.cliente = $("#cliente").val();

        var cfg = {
            url: "../rest/veiculoRest/addVeiculo",
            data: JSON.stringify(veiculo),
            success: function (succJson) {
                if (succJson == 1) {
                    resp = ("Veiculo cadastrado com sucesso!");
                    exibirMessagem(resp, 1);
                } else if(succJson == 2){
                    resp = ("O Veiculo ja existe!");
                    exibirMessagem(resp, 2);
                }else{
                    resp = ("Erro ao cadastrar um novo veiculo!");
                    exibirMessagem(resp, 2);
                }
                
                buscar();
            },
            error: function (errJson) {
                resp = ("Erro ao cadastrar um novo veiculo!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    });
        visualizarVeiculos=function(listaDeVeiculo){

            var veiculoHtml ="";

            if (listaDeVeiculo != undefined) {
               if (listaDeVeiculo.length > 0) {
                    for (var i = 0; i < listaDeVeiculo.length; i++){
                        veiculoHtml+="<ul class='itemVeiculo'><input type='radio' name='carro' id='car"+i+"' hidden>"
                        +"<label for='car'"+i+"'> "+listaDeVeiculo[i].placa+"</label><li>"
                        +"<label for='editar"+i+"'>Editar</label>"
                        +"<input type='checkbox' name='editar' id='editar'"+i+"' hidden><div>"
                        +"<form action=''><label for='marca"+i+"'>Marca:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idMarca+"' name='marca' id='marca"+i+"' required></select>"
                        +"<label for='modelo"+i+"'>Modelo:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idModelo+"' name='modelo' id='modelo"+i+"' required></select>"
                        +"<label for='ano"+i+"'>Ano:</label>"
                        +"<select onkeyup='"+listaDeVeiculo[i].idAno+"' name='ano' id='ano"+i+"' required></select>"
                        +"<label for='placa"+i+"'>Placa:</label>"
                        +"<input type='text' id='placa"+i+"' value='"+listaDeVeiculo[i].placa+"'>"
                        +"<div><a href=''>Cancelar</a><button onclick='atualizaVeiculo("+i+")' id='editCar"+id+"'>Confirmar</button>"
                        +"</div></form></div></li></ul>";
                    };
                    veiculoHtml+="<a href='' id='carrega-listaFuncionario'>Ver Mais</a>";

               }else {

                    veiculoHtml += "<ul class='itemVeiculo'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
                };                    
                
            }else{
                veiculoHtml += "<ul class='itemVeiculo'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
            };
          console.log(veiculoHtml);
            $('#ListaDVeiculosHtml').html(veiculoHtml);
        };

        atualizaVeiculo=function(id){
            
            veiculo = new Object();
            veiculo.marca = $("#marca"+id).val();
            veiculo.modelo = $("#modelo"+id).val();
            veiculo.ano = $("#ano"+id).val();
            veiculo.placa1 = $("#placa"+id).val();

            var cfg = {
                url: "../rest/veiculoRest/updateVeiculo",
                data: JSON.stringify(veiculo),
                success: function (succJson) {
                    if (succJson == 1) {
                        resp = ("Veiculo cadastrado com sucesso!");
                        exibirMessagem(resp, 1);
                    } else if(succJson == 2){
                        resp = ("O Veiculo ja existe!");
                        exibirMessagem(resp, 2);
                    }else{
                        resp = ("Erro ao cadastrar um novo Veiculo!");
                        exibirMessagem(resp, 2);
                    };            
                },
                error: function (errJson) {
                    resp = ("Erro ao cadastrar um novo Veiculo!");
                    exibirMessagem(resp, 2);
                }
            };
            autoPark.ajax.post(cfg);
        };

     var lista1=undefined;
     visualizarVeiculos(lista1);
        
});
