import React from 'react';
import {Link} from 'react-router-dom';
class AlcanceDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            deleted:{
                id: 0,
                nombre: "",
                prefijo: ""
            }
        }
    }
    componentDidMount()
    {
        this.obtenerOneAlcance();
    }
    /**
     * Ayudara a obtener un solo pais para poderlo editar
     */
    obtenerOneAlcance = async () => {
        const response = await fetch(`${this.props.url}&action=select&id=${this.props.match.params.alcanceId}`);
        const data = await response.json();
        this.setState({
            deleted: data.datos
        })
    }
    handleDelete = async e => 
    {
        e.preventDefault();
        const response = await fetch(`${this.props.url}&action=delete&id=${this.props.match.params.alcanceId}`);
        const data = await response.json();
        if(data.status)
        {
            this.props.history.push("/tipos/alcance");
        }
    }
    /**
     * 
     */
    render()
    {
        return (
            <div className="col-12 row">
                <div className="col-7 mx-auto">
                    <h5>¿Estás seguro de eliminar a {this.state.deleted.nombre}?</h5>
                </div>
                <div className="col-7 mx-auto">
                    <Link className="btn btn-success" to="/tipos/alcance">No</Link>
                    <button className="btn btn-danger ml-3" onClick={this.handleDelete}>Si</button>
                </div>
            </div>
        );
    }
}
export default AlcanceDelete;