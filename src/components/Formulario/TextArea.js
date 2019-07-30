import React from 'react';
import ChangeData from "./ChangeData";
// Se encargara de pintar un text area con la función de cambiar datos donde le pidamos.
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