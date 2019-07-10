import React from 'react';
class MandosAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            variables:[
                {
                    id: 1,
                },
                {
                    id: 2,
                }
            ]
        }
    }
    /**
     * Nos ayudara a agregar más variables de así requerirlo
     */
    handleAddVariable = (e) =>
    {
        e.preventDefault();
        this.setState(
            {
                variables:[
                    ...this.state.variables,
                    {
                        id: this.state.variables.length +1
                    }
                ]
            }
        )
    }
    handleBack = (e) =>
    {
        e.preventDefault();
        this.props.history.push("/mandos");
    }
    render(){
        return (
            <form className="row col-8 mx-auto">
                <div className="col-12">
                    <select className="form-control" onChange={this.handleChange}>
                        <option>Selecciona el objetivo</option>
                    </select>
                </div>
                <div className="col-12 mt-3 row">
                    {this.state.variables.map(variable=>
                    {
                        return (
                        <div className="col-4 mt-2" key={variable.id}>
                            <input  onChange={this.handleChange} className="form-control" type="text" tipo="variable" name={`variable_${variable.id}`} placeholder={`variable ${variable.id}`} />
                        </div>)
                    })}
                    <div className="col-4 mt-2">
                        <button onClick={this.handleAddVariable} className="btn btn-success">+</button>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <input className="form-control" onChange={this.handleChange} name="formula" type="text" placeholder="Formula" />
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-12">
                        <label for="etapas">Etapas que tendra este mando </label>
                    </div>
                    <div className="col-6">
                        <input type="number" onChange={this.handleChange} className="form-control" name="etapas" defaultValue="12"/>
                    </div>
                    <div className="col-6">
                        <select className="form-control" onChange={this.handleChange}>
                            <option value="dias">Días</option>
                            <option value="meses" selected>Meses</option>
                            <option value="anios">Años</option>
                        </select>
                    </div>
                    <div className="col-12 mt-3">
                        <select multiple className="form-control">
                            <option value="gerencia">Gerencia</option>
                            <option value="gerencia">Gerencia</option>
                            <option value="gerencia">Gerencia</option>
                        </select>
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-success" onClick={this.handleAddMando}>Agregar</button>
                        <button className="btn btn-danger ml-3" onClick={this.handleBack}>Volver</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default MandosAdd;