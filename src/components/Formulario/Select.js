import React from "react";
import ChangeData from "./ChangeData";
function Select(props){
    const {_self,lugar,zona} = props.datos,
    elementos = props.elementos,
    callback = props.callback,
    callFunction = props.function,
    placeholder=props.plhold,
    className=props.className,
    valor = props.valor,
    opcion = props.opcion;
    return(
        <select className={`form-control ${className}`} onChange={
            e=> {
                if(callback){
                    callFunction(e);
                }else{                    
                    ChangeData(e,_self,lugar,zona);
                }
            }
        }>
            <option>{placeholder}</option>
    {elementos.map(elemento => {
        let seMuestra;
        seMuestra = elemento[opcion]
        if(elemento.titulo !== undefined){
            seMuestra = elemento.titulo;
        }
        return (
            <option value={elemento[valor]} key={elemento.id}>{seMuestra}</option>
            )
        })
    }
        </select>
    )
}
export default Select;  