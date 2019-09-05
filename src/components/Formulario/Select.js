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
    let titulo = props.titulo;
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
    {elementos.map((elemento,xId) => {
        let seMuestra;
        seMuestra = elemento[opcion]
        if(titulo === undefined){
            titulo = "";
        }
        if(titulo.length === 0){
            titulo = "titulo";
        }
        if(elemento.titulo !== undefined){
            seMuestra = elemento[titulo];
        }
        return (
            <option value={elemento[valor]} key={xId}>{seMuestra}</option>
            )
        })
    }
        </select>
    )
}
export default Select;  