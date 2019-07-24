import React from 'react';
import {Link} from 'react-router-dom';
export default class JerarquiasAdd extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                nombre: ""
            }
        }
    }
    handleChage = e => 
    {
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name] : e.target.value
            }
        })
    }
    handleAdd = async e => {
        e.preventDefault();
        const datos = JSON.stringify(this.state.data);
        const req = await fetch(`${this.props.url}&action=add&data=${datos}`);
        const response = await req.json();
        if(response.status)
        {
            this.props.history.push("/jerarquia")
        }
    }
    render()
    {
        return(
            <form className="d-flex p-3 m-0 row justify-content-center col-12">
                <div className="col-7">
                    <input type="text" name="nombre" className="col-12 form-control" onChange={this.handleChage} placeholder="Nombre"/>
                </div>
                <div className="col-7 mt-3">
                    <button className="btn btn-success" onClick={this.handleAdd}>Agregar</button>
                    <Link className="btn btn-danger ml-3" to="/jerarquia">Jerarquias</Link>
                </div>
            </form>
        );
    }
}