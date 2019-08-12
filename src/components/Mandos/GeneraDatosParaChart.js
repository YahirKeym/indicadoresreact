import DecodificaMalos from "../Generales/DecodificaMalos";

function GeneraDatosParaChart(OBJETO, LUGAR_DE_DATOS){
    let firstDatos = ["Etapas"],
        secondData = [],
        aEtapas = [];

    // Guardamos el nombre de las variables principales del indicador
    LUGAR_DE_DATOS.variables.map(variable =>
        firstDatos.push(DecodificaMalos(variable.nombre))
        );
        // Guardamos el nombre de los subindicadores con sus respectivas variables
        if (LUGAR_DE_DATOS.subindicadores !== undefined) {
            if (LUGAR_DE_DATOS.subindicadores.length !== 0) {
                LUGAR_DE_DATOS.subindicadores.map(subindicador => 
                    subindicador.variables.map(variable => 
                        firstDatos.push(`${DecodificaMalos(subindicador.nombre)} ${DecodificaMalos(variable.nombre)}`)
                        )
                    );
                }
    }
    // Comienza el proceso para guardar los datos de las variables principales
    // con las variables de los subindicadores
    for (let index = 0; index < LUGAR_DE_DATOS.datos.etapas; index++) {
        let guardaValores = [];
        LUGAR_DE_DATOS.variables.map(variable => {
            if (variable.id === 1) {
                // Guardamos el nombre de las etapas
                guardaValores.push(
                    DecodificaMalos(LUGAR_DE_DATOS.variables[0].etapas[index].nombre)
                    );
                }
                // Guardamos el valor de las variables
                guardaValores.push(parseInt(variable.etapas[index].valor));
                return true;
            });
            if (LUGAR_DE_DATOS.subindicadores !== undefined) {
                if (LUGAR_DE_DATOS.subindicadores.length !== 0) {
                    // Guardamos los valores de las variables de los subindicadores
                    LUGAR_DE_DATOS.subindicadores.map(subindicador =>
                        subindicador.variables.map(variable =>
                            guardaValores.push(parseInt(variable.etapas[index].valor))
                            )
                            );
                        }
                    }
                    secondData.push(guardaValores);
                }
                aEtapas = [firstDatos];
                aEtapas = [...aEtapas, ...secondData];
                OBJETO.setState({
                    etapasChart: aEtapas
    });
}
export default GeneraDatosParaChart;