/**
 * La función AddOneElement se encarga de añadir un nuevo objeto a un array
 * Esto sirve para hacer duplicidad de elementos por ejemplo, ya que una
 * vez creado el elemento vuelve a renderizar el dom y al detectar otro objeto
 * se genera de manera automatica
 * @param {event} e Será el evento del botón donde está mandando a llamar la función
 * @param {object} oObjeto Es el objeto principal (clase o función) (this)
 * @param {array} aLugar Será el lugar en donde empujaremos el nuevo elemento. 
 * Hay que tener en cuenta que estos nuevos elementos solo llevan id y nombre por default,
 * el id que le sigue y el nombre que le dictemos.
 * @param {string} cNombre Es el nombre que se le dara al elemento a repetir.
 * @param {*} aDatosExtra  Los datos extra tiene que ser un arreglo el cual nos indicara
 * cuál será el dato que llevara y el valor de este.
 *      [
 *          {
 *              'nombre':'SoyUnDatoExtra',
 *              'valor' : 'Mi valor es uno'
 *          }
 *      ]
 */
function AddOneElement(e,oObjeto,aLugar,cNombre,aDatosExtra){
    e.preventDefault();
    let cantidadDeElementos = aLugar.length;
    let nuevoObjeto = {};
    nuevoObjeto["id"] = cantidadDeElementos+1;
    nuevoObjeto["nombre"] = `${cNombre} ${cantidadDeElementos+1}`;
    aDatosExtra.map(dato => {
        nuevoObjeto[dato.nombre] = dato.valor;
        return true;
    })
    aLugar.push(nuevoObjeto);
    oObjeto.setState(
        oObjeto.state
    )
}
export default AddOneElement;