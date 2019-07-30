// Nos ayudara a eliminar el ultimo elemento de un array, o bien un objeto
function DeleteOneElement(e,elementos,minimoDeElementos,_self){
    e.preventDefault();
    const cantidadDeElementos = elementos.length;
    if(cantidadDeElementos > minimoDeElementos){
        const elementosEliminados = elementos.splice(cantidadDeElementos-1,1);
        _self.setState(_self.state)
    }
}
export default DeleteOneElement;