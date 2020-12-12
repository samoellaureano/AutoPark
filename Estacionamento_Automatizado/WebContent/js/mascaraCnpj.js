/* Máscaras ER */
function maskCnpj(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mCnpj(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")       
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
    if($('telefoneClienteLabel').val() != this.undefined){
        id('telefoneClienteLabel').onkeyup = function(){
		    maskTel( this, mCnpj );
	    }
    }
}