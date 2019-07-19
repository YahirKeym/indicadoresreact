import React from "react";
import DeleteAction from './DeleteAction.js';
/**
 * Será el formulario para editar y agregar objetivos
 * @param {*} props 
 */
function Formulario(props) {    
    const datos = {url:"a",id:0,history:"",oneProfile:false}
    let {url,id,history,oneProfile} = props.Delete ? props.Delete  : datos;
    return (
        <form className="form row m-0 p-3 col-md-8 col-sm-12 mx-auto">
            <div className="col-8">
                <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título"
                    defaultValue={props.formulario ? props.formulario.datos.titulo : ''}
                    onChange={props.onChange}
                />
            </div>
            <div className="col-11 mt-3">
                <textarea
                    placeholder="Descripción"
                    onChange={props.onChange}
                    className="form-control"
                    name="descripcion"
                    value={props.formulario ? props.formulario.datos.descripcion : ""}
                >
                </textarea>
            </div>
            <div className="col-6 mt-3 row">
                <div className="col-6">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="tipoAlcance"
                        value={props.formulario ? props.formulario.datos.tipoAlcance : 0}
                    >
                        <option disabled defaultValue="0">
                            Tipo de alcance
                        </option>
                        {props.formulario.alcance.map(alcance=>{
                            return(
                                <option key={alcance.id} value={alcance.id}>{alcance.nombre}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-6">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="paisAlcance"
                        value={props.formulario ? props.formulario.datos.paisAlcance : 0}
                    >
                        <option disabled defaultValue="0">
                            Seleccionar país
                        </option>
                        {props.formulario.paises.map(pais=>{
                            return(
                                <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="col-6 mt-3 row">
                <div className="col-8 offset-3">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="paisIniciativa"
                        value={props.formulario ? props.formulario.datos.paisIniciativa : 0}
                        >
                        <option disabled defaultValue="0">
                            Seleccionar país Iniciativa
                        </option>
                        {props.formulario.paises.map(pais=>{
                            return(
                                <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                            );
                        })}
                        <option value="0">México</option>
                    </select>
                </div>
            </div>
            <div className="col-12 mt-3 row">
                <div className="col-6 form-group">
                    <label htmlFor="inicia">Fecha cuando inicia</label>
                    <input
                        type="date"
                        onChange={props.onChange}
                        className="form-control"
                        name="inicia"
                        defaultValue={props.formulario ? props.formulario.datos.inicia : ''}
                    />
                </div>
                <div className="col-6 form-group">
                    <label htmlFor="finaliza">Fecha cuando finaliza</label>
                    <input
                        type="date"
                        onChange={props.onChange}
                        className="form-control"
                        name="finaliza"
                        defaultValue={props.formulario ? props.formulario.datos.finaliza : ''}
                    />
                </div>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-success" onClick={props.onClick}>
                    {props.successButton}
                </button>
                <button
                    className="btn btn-danger ml-3"
                    onClick={props.back}
                >
                    Volver
                </button>
                {props.edit && (
                    <DeleteAction url={url} id={id} history={history} oneProfile={oneProfile} />
                )}
            </div>
        </form>
    );
}
export default Formulario;
