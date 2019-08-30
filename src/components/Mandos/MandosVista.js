import React from 'react';
import { Link } from "react-router-dom";
import VariablesMando from './VariablesMando';
import SinDatos from '../Errores/SinDatos';
import DeleteAction from '../DeleteAction';
import DecodificaMalos from '../Generales/DecodificaMalos';
import {Accordion, Card} from 'react-bootstrap';
import IndicadorReductor from './IndicadorReductor';
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
                <Accordion className="col-12 p-0" search-name="mandos">
                    {LUGAR_DE_DATOS.map((mando,idEvent) => {
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
                        const primerVariableDelIndicador = mando.variables[0].valorTotal;
                        let color = "bg-success";
                        let porcentajeIndicador;
                        if(mando.variables[1] !== undefined){
                            const segundaVariableDelIndicador = mando.variables[1].valorTotal;
                            if(mando.datos.formaDeIndicador === undefined){
                                mando.datos.formaDeIndicador = "incremento";
                            }
                            if(mando.datos.formaDeIndicador === "incremento" || mando.datos.formaDeIndicador === "acumulativoI"){
                                porcentajeIndicador = definePorcentaje(primerVariableDelIndicador,segundaVariableDelIndicador);
                            }
                            if(mando.datos.formaDeIndicador === "decremento" || mando.datos.formaDeIndicador === "acumulativoD" ){
                                porcentajeIndicador = IndicadorReductor(primerVariableDelIndicador,0,segundaVariableDelIndicador);
                            }
                            if(porcentajeIndicador < AceptacionBuena){
                                color = "bg-warning"
                            }
                            if(porcentajeIndicador < AceptacionMedio){
                                color = "bg-danger"
                            }
                            porcentajeIndicador = Math.round(porcentajeIndicador * 100) /100;
                        }
                        return (
                            <div data-search={`${titulo}`} className="mando">
                                <Card className="mando" key={idEvent}>
                                    <Accordion.Toggle as={Card.Header} eventKey={idEvent}>
                                        <div className="col-12 row">
                                            <h5 className="col-6">
                                                {DecodificaMalos(titulo)}
                                            </h5>
                                            <div className={`col-3 ${color} m-0 p-0 d-flex justify-content-center`}>
                                                {porcentajeIndicador}%
                                            </div>
                                        </div>    
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={idEvent}>
                                        <Card.Body>
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
                                                cede={subindicador.nombre}
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
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </div>

                        );
                    })}
                </Accordion>
            </div>
        </div>
    )
}
export default MandosVista;