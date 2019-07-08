import React from "react";
/**
 * Será el formulario para editar y agregar objetivos
 * @param {*} props 
 */
function Formulario(props) {
    return (
        <form className="form row col-md-8 col-sm-12 mx-auto">
            <div className="col-8">
                <input
                    type="text"
                    onChange={props.onChange}
                    className="form-control"
                    name="titulo"
                    placeholder="Título"
                    value={props.formulario ? props.formulario.titulo : ''}
                />
            </div>
            <div className="col-11 mt-3">
                <textarea
                    placeholder="Descripción"
                    onChange={props.onChange}
                    className="form-control"
                    name="descripcion"
                    value={props.formulario ? props.formulario.descripcion : ''}
                >{props.formulario ? props.formulario.descripcion : ''}</textarea>
            </div>
            <div className="col-6 mt-3 row">
                <div className="col-6">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="tipoAlcance"
                        value={props.formulario ? props.formulario.tipoAlcance : ''}
                    >
                        <option disabled selected>
                            Tipo de alcance
                        </option>
                        <option value="Global">Global</option>
                    </select>
                </div>
                <div className="col-6">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="paisAlcance"
                        value={props.formulario ? props.formulario.paisAlcance : ''}
                    >
                        <option disabled selected>
                            Seleccionar país
                        </option>
                        <option value="0">México</option>
                    </select>
                </div>
            </div>
            <div className="col-6 mt-3 row">
                <div className="col-8 offset-3">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="paisIniciativa"
                        value={props.formulario ? props.formulario.paisIniciativa : ''}
                    >
                        <option disabled selected>
                            Seleccionar país Iniciativa
                        </option>
                        <option value="0">México</option>
                    </select>
                </div>
            </div>
            <div className="col-12 mt-3 row">
                <div className="col-6 form-group">
                    <label for="inicia">Fecha cuando inicia</label>
                    <input
                        type="date"
                        onChange={props.onChange}
                        className="form-control"
                        name="inicia"
                        value={props.formulario ? props.formulario.inicia : ''}
                    />
                </div>
                <div className="col-6 form-group">
                    <label for="finaliza">Fecha cuando finaliza</label>
                    <input
                        type="date"
                        onChange={props.onChange}
                        className="form-control"
                        name="finaliza"
                        value={props.formulario ? props.formulario.finaliza : ''}
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
            </div>
        </form>
    );
}
export default Formulario;
