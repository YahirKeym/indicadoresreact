import React from 'react';
import DecodificaMalos from '../Generales/DecodificaMalos';
function MandosGenerales(props){
    const LUGAR_DE_DATOS = props.lugarDeDatos;
    return(
        <div className="col-12">
            {LUGAR_DE_DATOS.data.map(indicador=>{
                let objetivoTitulo = DecodificaMalos(indicador.objetivosData.titulo), 
                tituloIndicador = DecodificaMalos(indicador.datos.titulo);
                if(tituloIndicador.length === 0){ tituloIndicador = DecodificaMalos(indicador.objetivosData.titulo) }
                return(
                    <div className="col-12 row m-0 mb-3 mando text-white p-3" key={indicador.id}>
                        <div className="col-12">
                            <h4>Objetivo</h4>
                            <div className="mando-text p-3">
                                {objetivoTitulo}
                            </div>
                            {indicador.objetivosData.descripcion.length !== 0 && (
                                <React.Fragment>
                                    <h5 className="mt-2">Descripción</h5>
                                    <div className="mando-text p-3 mt-3">
                                        {DecodificaMalos(indicador.objetivosData.descripcion)}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="col-12">
                            <h4>Indicador</h4>
                            <div className="col-6 mando-text p-3">
                                {tituloIndicador}
                            </div>
                        </div>
                        <div className="col-4">
                            <h4>Unidad de medida</h4>
                            <div className="mando-text p-3 col-12 col-md-8">
                                {indicador.datos.unidadDeMedida.toUpperCase()}
                            </div>
                        </div>
                        <div className="col-4">
                            <h4>Periodo de tiempo</h4>
                            <div className="mando-text p-3 col-12 col-md-8">
                            </div>
                        </div>
                        <div className="col-4">
                            <h4>Naturaleza</h4>
                            <div className="mando-text p-3 col-12 col-md-8">
                                {indicador.datos.formaDeIndicador.toUpperCase()}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default MandosGenerales;