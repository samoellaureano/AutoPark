$(document).ready(function(){
    $("#menu").load("menu.html");
    
    $("#buscaRegistros").click(function(e){
        var dataInicial = $("#buscarDataInicial").val();
        var dataFinal = $("#buscarDataFinal").val();
        var cfg = {
            type: "POST",
            url: "../../rest/registroRest/buscaRegistro/dataInicial="+dataInicial + "&dataFinal=" + dataFinal,
            success: function (listaDeRegistros){
                visualizarRegistro(listaDeRegistros);
            },
            error: function (errJson) {
                alert("Erro ao buscar Configurações: " + errJson.responseText);
            }
        };
        autoPark.ajax.post(cfg);
    });

    visualizarRegistro=function(listaDeRegistros){

            var registroHtml="";
            var checkout="";

            if (listaDeRegistros != undefined) {
                if (listaDeRegistros.length > 0) {
                    for (var i = 0; i < listaDeRegistros.length; i++){

                        if(listaDeRegistros[i].checkout==""){
                            checkout="-";
                        }else{
                            checkout=listaDeRegistros[i].checkout;
                        };
                        
                        registroHtml+="<ul class='itemFuncionario'><input type='radio' name='funcionario' id='func"+i+"' hidden>"
                                    +"<label for='func"+i+"'>"+listaDeRegistros[i].estacionamento+"-"+listaDeRegistros[i].data+"</label>"
                                    +"<li>Check-in: <span>"+listaDeRegistros[i].checkin+"</span></li>"
                                    +"<li>Check-out: <span>"+checkout+"</span></li>"
                                    +"<li>Permanencia: <span>"+listaDeRegistros[i].permanencia+"</span></li>"
                                    +"<li>Valor Hora:  <span>R$:"+listaDeRegistros[i].vlhora+"</span></li></ul>";
                    };                   
                    
                }else {

                    registroHtml += "<ul class='itemFuncionario'><li style='text-align: center'>Nenhum registro encontrado</li></ul>";
                };
                    $("#ListaDeVeiculosHtml").append(registroHtml);
                   
            };   
        };
});