import React from 'react';
import { Link } from "react-router-dom";
import VariablesMando from './VariablesMando';
import SinDatos from '../Errores/SinDatos';
import DeleteAction from '../DeleteAction';
import DecodificaMalos from '../Generales/DecodificaMalos';
function MandosVista(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos;
    let heredado = props.heredado;
    if(heredado === undefined){
        heredado="";
    }
    return(
        <div className="col-12 row m-0">
            {LUGAR_DE_DATOS.length === 0 && (
                <SinDatos />
            )}
            <div
                className="col-12 row d-flex justify-content-between m-0"
                search-name="mandos"
            >
                {LUGAR_DE_DATOS.map(mando => {
                    let AceptacionBuena, AceptacionMedio;
                    if(mando.datos.AceptacionBuena === undefined || mando.datos.AceptacionBuena === 0 ){
                        AceptacionBuena = 94;
                    }else{
                        AceptacionBuena = mando.datos.AceptacionBuena;
                    }
                    if(mando.datos.AceptacionMedia=== undefined || mando.datos.AceptacionMedia === 0 ){
                        AceptacionMedio = 80;
                    }else{
                        AceptacionMedio = mando.datos.AceptacionMedia;
                    }
                    const porcentaje = {
                        porcentajeBueno: AceptacionBuena,
                        porcentajeMedio: AceptacionMedio 
                    };
                    let titulo = DecodificaMalos(mando.datos.titulo);
                    if (titulo.length === 0) {
                        titulo = DecodificaMalos(
                            mando.objetivosData.titulo
                        );
                    }
                    if(mando.subindicadores === undefined){
                        mando.subindicadores = [];
                    }
                    return (
                        <div
                            className="mando col-12 text-white p-3"
                            data-search={`${titulo}`}
                            key={mando.id}
                        >
                            <h4>{titulo}</h4>
                            <div className="col-12 p-2 mando-control">
                                <VariablesMando
                                    variables={mando.variables}
                                    porcentaje={porcentaje}
                                    etapa={mando.datos.tipoDeEtapa}
                                    muestraPorcentaje={true}
                                />
                                {mando.subindicadores.map(subindicador => {
                                    return(
                                        <VariablesMando
                                        key={subindicador.id}
                                        variables={subindicador.variables}
                                        porcentaje={porcentaje}
                                        etapa={mando.datos.tipoDeEtapa}
                                        muestraPorcentaje={true}
                                    />
                                    )
                                })}
                            </div>
                            <div className="col-12 mt-2">
                                <Link
                                    className="btn btn-success"
                                    to={`/mandos/${mando.id}/${heredado}`}
                                >
                                    Ver
                                </Link>
                                <DeleteAction
                                    url={OBJETO.props.url}
                                    id={mando.id}
                                    oneProfile={false}
                                    history={OBJETO.props.history}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default MandosVista;