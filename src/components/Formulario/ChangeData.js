import CodificaMalos from '../Generales/CodificaMalos';
/**
 * La función ChangeData se encargara de hacer el cambio de estado en la parte donde se le sea indicada. 
 * Esta función también lo que hace es pintar de color rojo el borde del input vacio faltante o el textarea vacio,
 * @param {event} e Es el evento o bien el input o campo seleccionado.
 * @param {object} _self Es el objeto principal
 * @param {object} oLugar Es el lugar o bien el objeto donde se ingresa. (this.state)
 * @param {string} cZona Es la zona/llave del objeto que se modificara. Ejem: "NombreX";
 * @param {string} cValorRepuesto El valor de repuesto es el valor que tomara en caso de que vacien el input. Valor por defecto.
 */
function ChangeData(e,_self, oLugar, cZona, cValorRepuesto){
    let valor = e.target.value;
    if(valor.length === 0){
        valor = cValorRepuesto;
        _self.state.emptyField = true;
        e.target.classList.add("border");
        e.target.classList.add("border-danger");
    }else{
        e.target.classList.remove("border");
        e.target.classList.remove("border-danger");        
        oLugar[cZona] = CodificaMalos(valor);
    }
    _self.setState(_self.state);
}
export default ChangeData;