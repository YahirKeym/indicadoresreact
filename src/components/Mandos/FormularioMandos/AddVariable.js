import CreaEtapas from "../CreaEtapas";
import AddOneElement from "../../Generales/AddOneElement";
/**
 * El componente AddVariable nos ayudara a implementar la creación
 * de una nueva variable.
 * @param {*} e Evento del boton que está mandando a llamar
 * @param {*} oObjeto Es el componente padre (this)
 * @param {*} LUGAR_DE_DATOS Será el lugar donde se encuentran los datos
 * principales del estado.
 * @param {*} VARIABLES Serán las variables en uso.
 */
function AddVariable(e,oObjeto,LUGAR_DE_DATOS,VARIABLES){
    e.preventDefault();
    let aEtapas = CreaEtapas(VARIABLES,LUGAR_DE_DATOS);
    AddOneElement(e,oObjeto,VARIABLES,"Variable",[
        {"nombre":"etapas","valor":aEtapas},
        {"nombre":"valorTotal","valor": 0}
    ])
}
export default AddVariable;
