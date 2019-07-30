import CodificaMalos from '../Generales/CodificaMalos';
// Nos ayudara a guardar texto en donde le digamos por medio del componente que necesitamos
function ChangeData(e,_self, lugar, zona, valorRepuesto){
    let valor = e.target.value;
    if(valor.length === 0){
        valor = valorRepuesto;
    }
    lugar[zona] = CodificaMalos(valor);
    _self.setState(_self.state);
}
export default ChangeData;