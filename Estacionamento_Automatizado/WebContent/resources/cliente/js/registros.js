$(document).ready(function(){
    $("#menu").load("menu.html");  
    
    busca=function(){
        var cfg = {
            url: "../rest/registroRest/buscaregistro",
            success: function (listaDeRegistros){
                 visualizar(listaDeRegistros);
            },
            error: function (errJson) {
                resp = ("Erro ao buscar um novo Registro!");
                exibirMessagem(resp, 2);
            }
        };
        autoPark.ajax.post(cfg);
    };
    
        visualizar=function(listaDeRegistros){

            var registroHtml=" <ul class='itemVeiculo'>";
            var checkout="";

            if (listaDeRegistros != undefined) {
                if (listaDeRegistros.length > 0) {
                    for (var i = 0; i < listaDeRegistros.length; i++){

                        if(listaDeRegistros[i].checkout==""){
                            checkout="-";
                        }else{
                            checkout=listaDeRegistros[i].checkout;
                        };
                        
                        registroHtml+="<ul class='itemRegistro'><input type='radio' name='registro' id='func1' hidden>"
                                    +"<input type='radio' name='funcionario' id='func1' hidden>"
                                    +"<label for='func1'>"+listaDeRegistros[i].estacionamento+"-"+listaDeRegistros[i].data+"</label>"
                                    +"<li>Check-in: <span>"+listaDeRegistros[i].checkin+"</span></li>"
                                    +"<li>Check-out: <span>"+checkout+"</span></li>"
                                    +"<li>Permanencia: <span>"+listaDeRegistros[i].permanencia+"</span></li>"
                                    +"<li>Valor Hora:  <span>R$:"+listaDeRegistros[i].vlhora+"</span></li></ul>";
                    };

                    registroHtml+="</ul>";
                    
                }else {

                    registroHtml += "<li style='text-align: center'>Nenhum registro encontrado</li>";
                };
                    $("#ListaDeVeiculosHtml").append(registroHtml);
            };   
        };
});