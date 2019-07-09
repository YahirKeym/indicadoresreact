import React from 'react';
class PaisesDeleted extends React.Component
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
        this.obtenerOnePais();
    }
    /**
     * Ayudara a obtener un solo pais para poderlo editar
     */
    obtenerOnePais = async () => {
        const response = await fetch(`${this.props.url}&action=select&id=${this.props.match.params.paisId}`);
        const data = await response.json();
        this.setState({
            deleted: data.data
        })
    }
    handleDelete = async e => 
    {
        e.preventDefault();
        const datos = JSON.stringify(this.state.deleted);
        const response = await fetch(`${this.props.url}&action=delete&data=${datos}`);
        const data = await response.json();
        if(data.status)
        {
            this.props.history.push("/paises");
        }
    }
    /**
     * Regresara a la página de paises.
     */
    handleBack = e => 
    {
        e.preventDefault();
        this.props.history.push("/paises");
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
                    <button className="btn btn-success" onClick={this.handleBack}>No</button>
                    <button className="btn btn-danger ml-3" onClick={this.handleDelete}>Si</button>
                </div>
            </div>
        );
    }
}
export default PaisesDeleted;