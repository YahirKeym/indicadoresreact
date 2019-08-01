import CreaEtapas from "../CreaEtapas";
import AddOneElement from "../../Generales/AddOneElement";

function AddVariable(e,OBJETO,LUGAR_DE_DATOS,VARIABLES){
    e.preventDefault();
    let aEtapas = CreaEtapas(VARIABLES,LUGAR_DE_DATOS);
    AddOneElement(e,OBJETO,VARIABLES,"Variable",[
        {"nombre":"etapas","valor":aEtapas},
        {"nombre":"valorTotal","valor": 0}
    ])
}
export default AddVariable;
