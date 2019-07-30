import React from 'react';
import ChangeData from './ChangeData.js'
// Se encargara de agregar un input para poder modificar titulos.
function Input(props){
    let {_self,lugar,zona} = props.datos,
    placeholder=props.plhold,
    defaultValue= props.dfv,
    type=props.type,
    callback=props.callback,
    callFunction=props.function,
    className=props.className;
    return(
        <input className={`form-control ${className}`} type={type} onChange={e => {
            ChangeData(e, _self, lugar, zona, placeholder);
            if(callback){
                callFunction()
            }
        }} placeholder={placeholder} defaultValue={defaultValue} />
    )
}
export default Input;