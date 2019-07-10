import React from 'react';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader.js';
export default class JerarquiaRangoAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            datos : [],
            data : {
                nombre: "",
                jerarquia: "",
                agregaObjetivos: false,
                agregaMandos: false,
                agregaPais : false,
                agregaJerarquias: false,
                agregaRangos: false
            }
        }
    }
    componentDidMount(){
        this.traerJerarquias()
    }
    /**
    * traera todas las jerarquias disponibles
    */
    traerJerarquias = async () => {
        const req = await fetch(`${this.props.urlJerarquias}&action=view`);
        const response = await req.json();
        if(response.status)
        {
            this.setState({
                loading: false,
                datos: response.datos
            })
        }
    }
    handleAdd = async e => 
    {
        e.preventDefault();
        const datos = JSON.stringify(this.state.data);
        const req = await fetch(`${this.props.url}&action=add&data=${datos}`);
        const response = await req.json();
        if(response.status){
            this.props.history.push("/jerarquia");
        }
    }
    /**
     * Guardara los cambios del formulario
     */
    handleChange = e => {
        if(e.target.getAttribute("type") === "checkbox"){
            if(e.target.value === "true"){
                e.target.value = false;
            }else{
                e.target.value = true;
            }
        }
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name] : e.target.value
            }
        });
    }
    render()
    {
        if(this.state.loading)
        {
            return(<Loader />);
        }
        return(
            <form className="col-12 row d-flex justify-content-center">
                <div className="col-12">
                    <input type="text" name="nombre" placeholder="Nombre del rango a ocupar" onChange={this.handleChange} className="form-control" required/>
                </div>
                <div className="col-12 mt-3">
                    <select className="form-control" name="jerarquia" onChange={this.handleChange} required>
                        <option defaultValue='' disable="true">Selecciona la jerarquia correspondiente</option>
                        {this.state.datos.map(jerarquia => {
                            return(<option key={jerarquia.id} value={jerarquia.id}>{jerarquia.nombre}</option>)
                        })}
                    </select>
                </div>
                <div className="col-12 row mt-3">
                        <div className="col-4 row">
                            <div className="col-12 text-center">
                                <label htmlFor="agregaObjetivos">¿Agregara objetivos?</label>
                            </div>
                            <input onChange={this.handleChange} type="checkbox" className="form-control col-12" name="agregaObjetivos" />
                        </div>
                        <div className="col-4 row">
                            <div className="col-12 text-center">
                                <label htmlFor="agregaMandos">¿Agregara Mandos?</label>
                            </div>
                            <input onChange={this.handleChange} type="checkbox" className="form-control col-12" name="agregaMandos" />
                        </div>
                        <div className="col-4 row">
                            <div className="col-12 text-center">
                                <label htmlFor="agregaPais">¿Agregara Paises?</label>
                            </div>
                            <input onChange={this.handleChange} type="checkbox" className="form-control col-12" name="agregaPais" />
                        </div>
                        <div className="col-4 row">
                            <div className="col-12 text-center">
                                <label htmlFor="agregaJerarquias">¿Agregara Jerarquias?</label>
                            </div>
                            <input onChange={this.handleChange} type="checkbox" className="form-control col-12" name="agregaJerarquias" />
                        </div>
                        <div className="col-4 row">
                            <div className="col-12 text-center">
                                <label htmlFor="agregaRangos">¿Agregara Rangos?</label>
                            </div>
                            <input onChange={this.handleChange} type="checkbox" className="form-control col-12" name="agregaRangos" />
                        </div>
                </div>
                <div className="col-7 mt-3">
                    <button className="btn btn-success" onClick={this.handleAdd}>Agregar</button>
                    <Link to="/jerarquia" className="btn btn-danger ml-3">Jerarquia</Link>
                </div>
            </form>
        );
    }
}