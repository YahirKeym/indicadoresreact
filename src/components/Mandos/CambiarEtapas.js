import IndicadorReductor from './IndicadorReductor.js';
// ayudara a mantener la etapa que estamos editando
function handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa,_self, datos, subindicador){
    let nuevoStado = datos, Etapas;
    if (nombreEtapa === `${idVariable}_${idEtapa + 1}`) {
        let Suma = 0;
        if(subindicador){
            Etapas = nuevoStado.subindicadores[0].variables[idVariable]["etapas"];
        }else{
            Etapas = nuevoStado.variables[idVariable]["etapas"];
        }
        Etapas[idEtapa]["valor"] = Valor;
        const CantidadEtapas = Etapas.length;
        if(datos.datos.formaDeIndicador === "acumulativoI" || datos.datos.formaDeIndicador === "acumulativoD"){
            let valorAnterior = 0;
            if(idEtapa !== 0){
                valorAnterior = Etapas[idEtapa-1].valor;
            }
            Etapas[idEtapa]["valorReal"] = Valor - valorAnterior;
            for (let index = 0; index < CantidadEtapas; index++) {
                Suma = Suma + parseFloat(Etapas[index]["valorReal"]);
            }
            if(subindicador){
                nuevoStado.subindicadores[0].variables[idVariable]["valorTotal"] = Suma;
            }else{
                nuevoStado.variables[idVariable]["valorTotal"] = Suma;
            }
        }else{
            for (let index = 0; index < CantidadEtapas; index++) {
                Suma = Suma + parseFloat(Etapas[index]["valor"]);
            }
            if(subindicador){
                nuevoStado.subindicadores[0].variables[idVariable]["valorTotal"] = Suma;
            }else{
                nuevoStado.variables[idVariable]["valorTotal"] = Suma;
            }
        }
    }
    return nuevoStado;
};
// Será la formula que definira el porcentaje de inicio.
function definePorcentaje(valor, etapa){
    let formula;
    if(valor === 0 || valor === "0"){
        valor = 100;
    }
    formula = (100 * etapa) / valor;
    if (etapa === 0 || formula === Infinity) {
        formula = 0;
    }
    return formula;
}
// Hará la selección del tipo de indicador que se está manejando.
function seleccionDeTipoDeIndicador(tipoIndicador, etapaEstadoUno,valorMinimo, etapa){
    let valor = etapaEstadoUno.valor, formula;
    switch(tipoIndicador){
        case 'incremento':
            formula = definePorcentaje(valor,etapa);
            break;
        case 'decremento':
            formula = IndicadorReductor({
                valorTop: valor,
                valorLow: valorMinimo,
                valorAReducir: etapa
            });
            if (formula === Infinity) {
                formula = 100;
            }
            break;
        case 'acumulativoI':
                valor = etapaEstadoUno.valorReal;
                formula = definePorcentaje(valor,etapa);
        break;
        case 'acumulativoD':
            valor = etapaEstadoUno.valorReal;
            formula = IndicadorReductor({
                valorTop: valor,
                valorLow: valorMinimo,
                valorAReducir: etapa
            });
            if (formula === Infinity) {
                formula = 100;
            }
    }
    return formula;
}
// Generara el porcentaje dependiendo del tipo de indicador que es (Incremento/Decremento)
function generaPorcentaje({idEtapa },valorMinimo,nuevoStado,variables,datos,subindicador) {
    let formula;
    variables.map(variable => {
        let idVariable = variable.id - 1,
        etapa; 
        if(subindicador){
            etapa = parseInt(
                nuevoStado.subindicadores[0].variables[idVariable].etapas[idEtapa].valor
            );
        }else{
            etapa= parseInt(
                nuevoStado.variables[idVariable].etapas[idEtapa].valor
            ); 
        }
        let ideEtapa = idEtapa;
        let variables = []
        if(subindicador){
            variables = nuevoStado.subindicadores[0].variables[0]
        }else{
            variables =nuevoStado.variables[0]
        }
        variables.etapas.map(etapaEstadoUno => {
            if (ideEtapa === etapaEstadoUno.idEtapa - 1) {
                if(datos.datos.formaDeIndicador === undefined || datos.datos.formaDeIndicador.length === 0){
                    datos.datos.formaDeIndicador = "incremento";
                }
                formula = seleccionDeTipoDeIndicador(datos.datos.formaDeIndicador,etapaEstadoUno,valorMinimo,etapa);
            }
            return true;
        });
        if(idVariable === 0){
            formula = 100;
        }
        if(subindicador){
            nuevoStado.subindicadores[0].variables[idVariable].etapas[
                idEtapa
            ].porcentaje = formula;
        }else{
            nuevoStado.variables[idVariable].etapas[
                idEtapa
            ].porcentaje = formula;
        }
        return true;
    });
}
// Está función ayudara a cambiar las etapas de los mandos, asignandole el valor de la formula a cada uno.
async function CambiarEtapas(e,_self,Variables,datos,valorMinimo,subindicador = false) {
    const idVariable = e.target.getAttribute("idvariable") - 1;
    const idEtapa = e.target.getAttribute("idetapa") - 1;
    const nombreEtapa = e.target.name;
    let Valor = e.target.value;
    if (Valor.length === 0) { Valor = 0; }
    const nuevoStado = await handleMantenerEtapas(
        idVariable,
        idEtapa,
        Valor,
        nombreEtapa,
        _self,datos,subindicador
    );
        generaPorcentaje({idEtapa: idEtapa },valorMinimo,nuevoStado,Variables,datos,subindicador);
    _self.setState(nuevoStado);
}
export default CambiarEtapas;
