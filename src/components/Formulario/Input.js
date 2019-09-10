import React from 'react';
import ChangeData from './ChangeData.js'
/**
 * El componente input se encargara de generalizar todos los metodos inputs. Este mandara
 * a llarmar al metodo changeData el cual cambiara el dato que nosotros le indiquemos del estado.
 * @param {properties} props Son las propiedades del componente.
 * @param {object} datos En los datos van las propiedades de cambio. 
 *      {
 *          _self: Es el objeto en si mismo (this, objeto),
 *          lugar: Es el lugar o bien el objeto donde se ingresa. (this.state),
 *          zona: Es la zona/llave dentro del objeto que modificaremos. ("NombreX")
 *      }
 * @param {string} plhold Será el placeholder que llevara el input
 * @param {string} dfv Será el valor por defecto que llevara el input
 * @param {string} type Será el tipo de input que mandaremos a llamar (text,number, etc)
 * @param {boolean} callback Nos indicara en falso/false o en verdadero/true si se tiene que llamar una función externa
 * @param {function} function En caso de que el callback este en verdadero/true, está será la función esterna que se mandara  llamar.
 * @param {string} className Serán clases que irán directo al input.
 * @return {component} Regresa el componente de un input el cual modificara los elementos que se le digan.
 */
function Input(props){
    let {_self,lugar,zona} = props.datos,
    cPlaceholder=props.plhold,
    cDefaultValue= props.dfv,
    cType=props.type,
    lCallback=props.callback,
    fCallFunction=props.function,
    cClassName=props.className;
    return(
        <input className={`form-control ${cClassName}`} type={cType} onChange={e => {
            ChangeData(e, _self, lugar, zona, cPlaceholder);
            if(lCallback){
                fCallFunction(e)
            }
        }} placeholder={cPlaceholder} defaultValue={cDefaultValue} />
    )
}
export default Input;