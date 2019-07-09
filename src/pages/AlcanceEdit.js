import React from 'react';
import './styles/AlcanceAdd.css';
class AlcanceEdit extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            empty : false,
            data :{
                nombre: '',
                nombreinterno: ''
            },
            repetido: false,
            nombre : '',
        }
        console.log(this.state.data)
    }
    /**
     * Nos ayudara a guardar los inputs
     */
    handleChange = (e) => 
    {
        this.setState(
            {
                data: {
                    ...this.state.data,
                    [e.target.name] : e.target.value
                }
            }
        );
    }
    /**
     * Nos ayudara a enviar los datos del alcance
     */
    handleAdd = async (e) =>
    {
        e.preventDefault();
        const cDatos = JSON.stringify(this.state.data);
        const response = await fetch(`${this.props.url}&action=add&data=${cDatos}`);
        const data = await response.json();
        if(data.empty)
        {
            this.setState({
                empty: true
            });
        }
        if(data.repetido)
        {
            this.setState({
                empty: false,
                repetido: true,
                nombre: data.nombre
            })
        }
        if(data.status && !data.empty)
        {
            this.props.history.push("/tipos/alcance");
        }
        
    }
    /**
     * Renderizara el componente de formulario
     */
    render()
    {
        return (
            <React.Fragment>
                <form className="row col-md-8 col-sm-12 mx-auto">
                    {this.state.empty && (
                        <div className="bg-danger text-white mb-3 text-center col-12 field-empty p-2">
                            <h5>Un campo está vacio</h5>
                        </div>
                    )}
                    {
                        this.state.repetido && (
                            <div className="bg-danger text-white mb-3 text-center col-12 field-empty p-2">
                                <h5>El nombre interno ya está en uso</h5>
                                <p>{this.state.nombre} Lo está usando</p>
                            </div>
                        )
                    }
                    <div className="col-12">
                        {this.state.empty && (
                        <input type="text" name="nombre" className="form-control field-empty" placeholder="Nombre del alcance" onChange={this.handleChange}/>
                        )}
                        {!this.state.empty && (
                        <input type="text" name="nombre" className="form-control" placeholder="Nombre del alcance" onChange={this.handleChange}/>
                        )}
                    </div>
                    <div className="col-12 mt-3">
                        {this.state.empty && (
                            <input type="text" name="nombreinterno" className="form-control field-empty" placeholder="Nombre Interno y unico que llevara el alcance"  onChange={this.handleChange}/>
                        )}
                        {!this.state.empty && (
                            <input type="text" name="nombreinterno" className="form-control" placeholder="Nombre Interno y unico que llevara el alcance"  onChange={this.handleChange}/>
                        )}
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-success" onClick={this.handleAdd}>Agregar</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}
export default AlcanceEdit;