import React from "react";
import ChangeData from "./ChangeData";
function Select(props){
    const {_self,lugar,zona} = props.datos,
    elementos = props.elementos,
    callback= props.callback,
    callFunction = props.function;
    return(
        <select className="form-control" onChange={
            e=> {
                if(callback){
                    callFunction(e);
                }else{                    
                    ChangeData(e,_self,lugar,zona);
                }
            }
        }>
            <option>Selecciona un objetivo</option>
            {elementos.map(elemento => <option value={elemento.id} key={elemento.id}>{elemento.titulo}</option>)}
        </select>
    )
}
export default Select;