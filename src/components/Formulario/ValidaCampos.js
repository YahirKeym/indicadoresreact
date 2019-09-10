/**
 * La función ValidaCampos se encargara de hacer la validación de si falta de rellenar algún campo.
 * Lo cual los formularios en los que si un campo esta vacio no deja proseguir, validaCampos puede ayudar
 * para indicar que campo está faltando.
 * Validara por medio de todos los elementos indicados.
 * Ejemplo: ".input, input, #input, [input]"
 * @param {*} cElemento Será el elemento/etiqueta que se tendrá que validar. 
 */
function ValidaCampos(cElemento){
    const aElementos = document.querySelectorAll(`${cElemento}`),
    cantidadDeElementos = aElementos.length;
    let cantidadDeElementosValidados = 0, texto;
    for (let index = 0; index < aElementos.length; index++) {
        if(aElementos[index].value.length === 0){
            texto = document.createElement("p");
            texto.classList.add("emptyfield");
            texto.innerHTML = "Falta llenar este campo";
            aElementos[index].parentNode.appendChild(texto,aElementos[index].parentNode.nextSibling); 
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