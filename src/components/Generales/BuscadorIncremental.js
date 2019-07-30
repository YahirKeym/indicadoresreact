/**
 * keysUp Serán las acciones después de pulsar x tecla en el input
 */
function keysUp (event, {claseCorrecta,claseIncorrecta,seBusca}){
    let cCampoValor = document.querySelectorAll(`[search-name='${seBusca}'] > [data-search]`);
    let cValor = event.target.value;
    let cValorLimpio = quitaAcentos(cValor);
    
    cCampoValor.forEach((elements)=>{
        muestraBuqueda(
            {elements:elements}, 
            {claseCorrecta:claseCorrecta,claseIncorrecta:claseIncorrecta,cValorLimpio:cValorLimpio}
            )
        });
    }
    /**
     * muestraBuqueda Ayudara a ocultar y mostrar los elementos mediante la busqueda
     * @param  {elementos} elements      Son los elementos que se encuentrar mediante la iteración
     * @param  {number} iCountElement Es el valor númerico del elemento
     */
    function muestraBuqueda({elements},{claseCorrecta,claseIncorrecta,cValorLimpio}){
        // debugger;
        let cValorSearch = elements.getAttribute('data-search')
        if (quitaAcentos(cValorSearch.toLowerCase()).search(cValorLimpio.toLowerCase()) === -1) {
            elements.classList.remove(claseCorrecta);
            elements.classList.add(claseIncorrecta);
        } else {
            elements.classList.remove(claseIncorrecta);
            elements.classList.add(claseCorrecta);
        }
    }
    /**
     * quitaAcentos Nos ayudara a quitar los acentos de la cadena para poder hacer la busqueda de manera correcta
     * @param  {String} cCadena Es la cadena que queremos limpiar de acentos
     * @return {String}         Regresa la cadena limpia de acentos
     */
function quitaAcentos(cCadena = "") {
        cCadena = cCadena.replace(/á/gi, "a");
        cCadena = cCadena.replace(/é/gi, "e");
        cCadena = cCadena.replace(/í/gi, "i");
        cCadena = cCadena.replace(/ó/gi, "o");
        cCadena = cCadena.replace(/ú/gi, "u");
        cCadena = cCadena.replace(/ñ/gi, "n");
        return cCadena;
    }
/**
 * buscadorIncremental Hará la busqueda de elementos que le digamos, con los parametros y nodos que indiquemos
 * @author Yahir Axel Garcia Keymurth 20-Jun-2019
 * @param  {String} claseCorrecta   Es la clase que se usara para una busqueda correcta
 * @param  {String} claseIncorrecta Es la clase que se usara para los elementos que no coincidan con la busqueda 
*/
function BuscadorIncremental({claseCorrecta,claseIncorrecta,buscador,seBusca}) {
    /**
     *  busca Ajustara la configuración del buscador
     * @param  {string} nameInput             Es el nombre del input al que se le aplicara la busqueda
     * @param  {strign} nameParametroBusqueda Es el nombre de los lugares donde se buscara
     */
    let cBusqueda = document.querySelector(`input[name='${buscador}'`);
    cBusqueda.addEventListener("keyup", event=>{keysUp(event,{claseCorrecta: claseCorrecta,claseIncorrecta: claseIncorrecta,seBusca:seBusca})});
}
export default BuscadorIncremental;