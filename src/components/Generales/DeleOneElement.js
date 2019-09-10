/**
 * La función DeleteOneElement Eliminara el ultimo elemento de un array,
 * esto nos puede ayudar para la integración de nuevos campos al gusto,
 * ya que renderiza de nuevo el estado de la aplicación.
 * @param {event} e Es el evento del botón que lo mando a llamar. 
 * @param {array} aElementos Será el array que cuenta con los elementos 
 * a eliminar.
 * @param {integer} iMinimoDeElementos Es el minimo de elementos que puede haber
 * para afectuar el cambio en el estado del componente
 * @param {object} _self Es el objeto en si mismo del componente padre (this) 
 */
function DeleteOneElement(e,aElementos,iMinimoDeElementos,_self){
    e.preventDefault();
    const cantidadDeElementos = aElementos.length;
    if(cantidadDeElementos > iMinimoDeElementos){
        aElementos.splice(cantidadDeElementos-1,1);
        _self.setState(_self.state)
    }
}
export default DeleteOneElement;