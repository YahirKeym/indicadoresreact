import IndicadorReductor from './IndicadorReductor.js';
// ayudara a mantener la etapa que estamos editando
function handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa,_self, datos, subindicador){
    let nuevoStado = datos, Etapas;
    if (nombreEtapa === `${idVariable}_${idEtapa + 1}`) {
        let Suma = 0;
        Etapas = nuevoStado.variables[idVariable]["etapas"];
        if(subindicador){
            Etapas = nuevoStado.subindicadores[0].variables[idVariable]["etapas"];
        }
        Etapas[idEtapa]["valor"] = Valor;
        for (let index = 0; index < Etapas.length; index++) {
            Suma = Suma + parseFloat(Etapas[index]["valor"]);
        }
        if(subindicador){
            nuevoStado.subindicadores[0].variables[idVariable]["valorTotal"] = Suma;
        }else{
            nuevoStado.variables[idVariable]["valorTotal"] = Suma;
        }
    }
    return nuevoStado;
};
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
        nuevoStado.variables[0].etapas.map(etapaEstadoUno => {
            if (ideEtapa === etapaEstadoUno.idEtapa - 1) {
                if(datos.datos.formaDeIndicador === undefined || datos.datos.formaDeIndicador.length === 0){
                    datos.datos.formaDeIndicador = "incremento";
                }
                if (datos.datos.formaDeIndicador === "incremento") {
                    let valor = etapaEstadoUno.valor;
                    if(valor === 0 || valor === "0"){
                        valor = 100;
                    }
                    formula = (100 * etapa) / valor;
                    if (etapa === 0 || formula === Infinity) {
                        formula = 0;
                    }
                } else {
                    formula = IndicadorReductor({
                        valorTop: etapaEstadoUno.valor,
                        valorLow: valorMinimo,
                        valorAReducir: etapa
                    });
                    if (formula === Infinity) {
                        formula = 100;
                    }
                }
            }
            return true;
        });
        if( idVariable === 0){
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
