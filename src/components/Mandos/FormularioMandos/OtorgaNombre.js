function OtorgaNombres(OBJETO,lugarDeDatos, nombres){
    lugarDeDatos.variables[0].etapas.map(etapa => {
        nombres.map(mes => {
            if(mes.id === etapa.idEtapa){
                lugarDeDatos.variables[0].etapas[etapa.idEtapa-1]['nombre'] = mes.nombre;
            }
        })
    })
    OBJETO.setState(lugarDeDatos);
}
export default OtorgaNombres;