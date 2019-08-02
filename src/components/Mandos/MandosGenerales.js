import React from 'react';
function MandosGenerales(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos;
    return(
        <div className="col-12">
            {LUGAR_DE_DATOS.data.map(indicador=>{
                return(
                    <div className="col-12 row m-0 mb-3 bg-primary p-3" key={indicador.id}>
                        <div className="col-12">
                            <h4>Objetivo</h4>
                            {indicador.objetivosData.titulo}
                        </div>
                        <div className="col-12">
                            <h4>Indicador</h4>
                            {indicador.datos.titulo}
                        </div>
                        <div className="col-4">
                            <h4>Unidad</h4>
                            {indicador.datos.unidadDeMedida}
                        </div>
                        <div className="col-4">
                            <h4>Periodo de tiempo</h4>
                        </div>
                        <div className="col-4">
                            <h4>Naturaleza</h4>
                            {indicador.datos.formaDeIndicador}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default MandosGenerales;