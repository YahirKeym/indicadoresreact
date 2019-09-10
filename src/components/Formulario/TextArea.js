import React from 'react';
import ChangeData from "./ChangeData";
/**
 * El componente TextArea pintara un TextArea en el cual le podremos indicar que lugar del estado cambiara.
 * @param {properties} props Son las propiedades del componente.
 * @param {object} datos En los datos van las propiedades de cambio. 
 *      {
 *          _self: Es el objeto en si mismo (this, objeto),
 *          lugar: Es el lugar o bien el objeto donde se ingresa. (this.state),
 *          zona: Es la zona/llave dentro del objeto que modificaremos. ("NombreX")
 *      }
 * @param {string} plhold Será el placeholder que llevara el textarea
 * @param {string} dfv Será el valor por defecto que llevara el textarea
 */
function TextArea(props){
    const {_self,lugar,zona} = props.datos,
    placeholder = props.plhold,
    defaultValue = props.dfv;
    return(
        <textarea className="form-control" onChange={
            e=>{
                ChangeData(e,_self,lugar,zona)
            }} 
            placeholder={placeholder} 
            defaultValue={defaultValue}></textarea>
    )
}
export default TextArea;