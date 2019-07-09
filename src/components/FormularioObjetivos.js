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
                    className="form-control"
                    name="titulo"
                    placeholder="Título"
                    defaultValue={props.formulario ? props.formulario.titulo : ''}
                    onChange={props.onChange}
                />
            </div>
            <div className="col-11 mt-3">
                <textarea
                    placeholder="Descripción"
                    onChange={props.onChange}
                    className="form-control"
                    name="descripcion"
                    defaultValue={props.formulario ? props.formulario.descripcion : ''}
                ></textarea>
            </div>
            <div className="col-6 mt-3 row">
                <div className="col-6">
                    <select
                        className="form-control"
                        onChange={props.onChange}
                        name="tipoAlcance"
                        defaultValue={props.formulario ? props.formulario.tipoAlcance : ''}
                    >
                        <option disabled>
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
                        defaultValue={props.formulario ? props.formulario.paisAlcance : ''}
                    >
                        <option disabled>
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
                        defaultValue={props.formulario ? props.formulario.paisIniciativa : ''}
                    >
                        <option disabled>
                            Seleccionar país Iniciativa
                        </option>
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
                        defaultValue={props.formulario ? props.formulario.inicia : ''}
                    />
                </div>
                <div className="col-6 form-group">
                    <label htmlFor="finaliza">Fecha cuando finaliza</label>
                    <input
                        type="date"
                        onChange={props.onChange}
                        className="form-control"
                        name="finaliza"
                        defaultValue={props.formulario ? props.formulario.finaliza : ''}
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
