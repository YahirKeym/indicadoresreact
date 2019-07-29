import React from 'react';
import CodificaMalos from '../Generales/CodificaMalos';
// Hará el cambio del titulo donde le digamos.
function changeTitulo(e, _self, lugar){
    let datos = lugar;
    datos.titulo = CodificaMalos(e.target.value);
    _self.setState(_self.state);
}
// Se encargara de agregar un input para poder modificar titulos.
function InputDeTitulo(props){
    let {_self,lugar} = props.datos;
    return(
        <input className="form-control" onChange={e => {
            changeTitulo(e, _self, lugar);
        }} />
    )
}
export default InputDeTitulo;