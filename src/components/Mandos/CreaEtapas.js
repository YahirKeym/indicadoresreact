function CreaEtapas(LUGAR_VARIABLES,LUGAR_DE_DATOS){
    let aEtapas = [];
    let idVariable = LUGAR_VARIABLES.length;
    for (let indexEtapas = 1; indexEtapas <= LUGAR_DE_DATOS.datos.etapas; indexEtapas++) {
        aEtapas = [
            ...aEtapas,
            {
                id: `${idVariable}_${indexEtapas}`,
                valor: 0,
                idEtapa: indexEtapas,
                porcentaje: 0,
                valorReal: 0,
                aceptado:0
            }
        ]
    }
    return aEtapas;
}
export default CreaEtapas;