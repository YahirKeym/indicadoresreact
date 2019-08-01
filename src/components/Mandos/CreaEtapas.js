function CreaEtapas(LUGAR_VARIABLES,LUGAR_DE_DATOS){
    let aEtapas = [];
    const idVariable = LUGAR_VARIABLES.length;
    for (let indexEtapas = 1; indexEtapas <= LUGAR_DE_DATOS.datos.etapas; indexEtapas++) {
        aEtapas = [
            ...aEtapas,
            {
                id: `${idVariable}_${indexEtapas}`,
                valor: 0,
                idEtapa: indexEtapas,
                porcentaje: 0
            }
        ]
    }
    return aEtapas;
}
export default CreaEtapas;