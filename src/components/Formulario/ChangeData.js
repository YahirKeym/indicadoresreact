import CodificaMalos from '../Generales/CodificaMalos';
// Nos ayudara a guardar texto en donde le digamos por medio del componente que necesitamos
function ChangeData(e,_self, lugar, zona, valorRepuesto){
    let valor = e.target.value;
    if(valor.length === 0){
        valor = valorRepuesto;
        _self.state.emptyField = true;
        e.target.classList.add("border");
        e.target.classList.add("border-danger");
    }else{
        e.target.classList.remove("border");
        e.target.classList.remove("border-danger");        
        lugar[zona] = CodificaMalos(valor);
    }
    _self.setState(_self.state);
}
export default ChangeData;