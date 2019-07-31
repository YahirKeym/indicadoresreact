// Nos ayudara a validar los campos de los elementos que le pidamos: ejem: input,select, etc.
function ValidaCampos(elemento){
    const elementos = document.querySelectorAll(`${elemento}`),
    cantidadDeElementos = elementos.length;
    let cantidadDeElementosValidados = 0, texto;
    for (let index = 0; index < elementos.length; index++) {
        if(elementos[index].value.length === 0){
            texto = document.createElement("p");
            texto.classList.add("emptyfield");
            texto.innerHTML = "Falta llenar este campo";
            elementos[index].parentNode.appendChild(texto,elementos[index].parentNode.nextSibling); 
        }else{
            cantidadDeElementosValidados++;
        }   
    }
    let seValido = false;
    if(cantidadDeElementos === cantidadDeElementosValidados){
        seValido = true;
    }
    return seValido;
}
export default ValidaCampos;