function IndicadorReductor({valorTop,valorLow,valorAReducir}){
    let valorCienPorciento = valorTop-valorLow,
    porcentajeTotal = (100*valorAReducir)/valorCienPorciento,
    valorRecorrido = 0;
    for (let index = porcentajeTotal; index < 100; index += 0.01) {
        valorRecorrido +=0.01;
    }
    return valorRecorrido;
}
export default IndicadorReductor;