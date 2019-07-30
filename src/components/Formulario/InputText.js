import React from 'react';
import ChangeData from './ChangeData.js'
// Se encargara de agregar un input para poder modificar titulos.
function InputText(props){
    let {_self,lugar,zona} = props.datos,
    placeholder=props.plhold,
    defaultValue= props.dfv;
    return(
        <input className="form-control" onChange={e => {
            ChangeData(e, _self, lugar, zona, placeholder);
        }} placeholder={placeholder} defaultValue={defaultValue} />
    )
}
export default InputText;