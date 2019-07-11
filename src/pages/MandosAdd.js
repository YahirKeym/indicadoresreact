import React from 'react';
import { promised } from 'q';
class MandosAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            variables:[
                {
                    id: 1,
                    valor: ""
                },
                {
                    id: 2,
                    valor: ""
                }
            ],
            datos:{
                variables:[]
            },
            objetivos: [],
            rangos:[]
        }
    }
    handleChangeVariable = e => {

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
    componentDidMount()
    {
        this.traerDatos();
    }
    traerDatos = async () =>
    {
        const [objetivos,rangos] = await Promise.all(
            [
                fetch(`${this.props.urlObjetivos}&action=view`),
                fetch(`${this.props.urlRangos}&action=view`)
            ]
        )
        const responseObjetivos = await objetivos.json();
        const responseRangos= await rangos.json();
        if(responseObjetivos.status && responseRangos){
            this.setState({
                objetivos: responseObjetivos.datos,
                rangos: responseRangos.datos
            })
        }
    }
    /**
     * 
     */
    handleQuitVariable = e => 
    {
        e.preventDefault();
        const cantidadDeVariables = this.state.variables.length;
        if(cantidadDeVariables > 2)
        {
            const variables = this.state.variables.splice(-cantidadDeVariables,cantidadDeVariables-1)
            this.setState(
                {
                    variables: variables
                }
            )
        }
    }
    handleAddMando = e =>
    {
        e.preventDefault();
        const $Rangos = document.querySelectorAll("select [rango]");
        const $Variables = document.querySelectorAll("[tipo='variable']");
        for (let index = 0; index < $Rangos.length; index++) {
            if($Rangos[index].selected){
                console.log($Rangos[index])
            }
        }
        for (let index = 0; index < $Variables.length; index++) {
            console.log($Variables[index])
            
        }
    }
    /**
     * Se encargara de llevarnos hacía la página de los mandos
     */
    handleBack = (e) =>
    {
        e.preventDefault();
        this.props.history.push("/mandos");
    }
    /**
     * 
     */
    render(){
        return (
            <form className="row col-8 mx-auto">
                <div className="col-12">
                    <select className="form-control" name="objetivo" onChange={this.handleChange}>
                        <option>Selecciona el objetivo</option>
                        {this.state.objetivos.map(objetivos => {
                            return (<option value={objetivos.id} key={objetivos.id}>{objetivos.titulo}</option>);
                        })}
                    </select>
                </div>
                <div className="col-12 mt-3 row">
                    {this.state.variables.map(variable=>
                    {
                        return (
                        <div className="col-4 mt-2" key={variable.id}>
                            <input className="form-control" type="text" tipo="variable" name={`variable_${variable.id}`} placeholder={`variable ${variable.id}`} />
                        </div>)
                    })}
                    <div className="col-4 mt-2">
                        <button onClick={this.handleAddVariable} className="btn btn-success">+</button>
                        {this.state.variables.length > 2 && (
                            <button onClick={this.handleQuitVariable} className="btn btn-danger ml-2">-</button>
                        )}
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <input className="form-control" onChange={this.handleChange} name="formula" type="text" placeholder="Formula" />
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-12">
                        <label htmlFor="etapas">Etapas que tendra este mando </label>
                    </div>
                    <div className="col-6">
                        <input type="number" onChange={this.handleChange} className="form-control" name="etapas" defaultValue="12"/>
                    </div>
                    <div className="col-6">
                        <select className="form-control" name="tipoDeEtapa" onChange={this.handleChange} defaultValue="meses">
                            <option value="dias">Días</option>
                            <option value="meses">Meses</option>
                            <option value="anios">Años</option>
                        </select>
                    </div>
                    <div className="col-12 mt-3">
                        <select multiple className="form-control" name="rangos">
                            {this.state.rangos.map(rango => {
                                return(<option rango="true" value={rango.id} key={rango.id}>{rango.nombre}</option>)
                            })}
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