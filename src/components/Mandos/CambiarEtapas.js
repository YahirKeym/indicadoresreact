import IndicadorReductor from './IndicadorReductor.js';
// ayudara a mantener la etapa que estamos editando
function handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa,_self, datos){
    let nuevoStado = datos;
    if (nombreEtapa === `${idVariable}_${idEtapa + 1}`) {
        let Suma = 0;
        const Etapas = nuevoStado.variables[idVariable]["etapas"];
        Etapas[idEtapa]["valor"] = Valor;
        for (let index = 0; index < Etapas.length; index++) {
            Suma = Suma + parseFloat(Etapas[index]["valor"]);
        }
        nuevoStado.variables[idVariable]["valorTotal"] = Suma;
    }
    return nuevoStado;
};
// Generara el porcentaje dependiendo del tipo de indicador que es (Incremento/Decremento)
function generaPorcentaje({idEtapa },valorMinimo,nuevoStado,variables,datos) {
    let formula;
    variables.map(variable => {
        let idVariable = variable.id - 1;
        let etapa = parseInt(
            nuevoStado.variables[idVariable].etapas[idEtapa].valor
        );
        let ideEtapa = idEtapa;
        nuevoStado.variables[0].etapas.map(etapaEstadoUno => {
            if (ideEtapa === etapaEstadoUno.idEtapa - 1) {
                if(datos.datos.formaDeIndicador === undefined || datos.datos.formaDeIndicador.length === 0){
                    datos.datos.formaDeIndicador = "incremento";
                }
                if (datos.datos.formaDeIndicador === "incremento") {
                    formula = (100 * etapa) / etapaEstadoUno.valor;
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
        });
        if( idVariable === 0){
            formula = 100;
        }
        nuevoStado.variables[idVariable].etapas[
            idEtapa
        ].porcentaje = formula;
    });
}
// Está función ayudara a cambiar las etapas de los mandos, asignandole el valor de la formula a cada uno.
async function CambiarEtapas(e,_self,Variables,datos,valorMinimo) {
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
        _self,datos
    );
    generaPorcentaje({idEtapa: idEtapa },valorMinimo,nuevoStado,Variables,datos);
    _self.setState(nuevoStado);
}
export default CambiarEtapas;
