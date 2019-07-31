// Añadira un elemento a un array donde le indiquemos.
function AddOneElement(e,objeto,lugar,nombre,datosExtra){
    e.preventDefault();
    let cantidadDeElementos = lugar.length;
    let nuevoObjeto = {};
    nuevoObjeto["id"] = cantidadDeElementos+1;
    nuevoObjeto["nombre"] = `${nombre} ${cantidadDeElementos+1}`;
    datosExtra.map(dato => {
        nuevoObjeto[dato.nombre] = dato.valor;
        return true;
    })
    lugar.push(nuevoObjeto);
    objeto.setState(
        objeto.state
    )
}
export default AddOneElement;