import React from 'react';
import './styles/ObjetivosVista.css';
import SinDatos from "../components/SinDatos.js";
import {Link} from "react-router-dom";
class ObjetivosVista extends React.Component
{
    render() 
    {
        if (this.props.data.length === 0) {
          return <SinDatos />
        }
        return (
            <div className="row m-0">
                {this.props.data.map(objetivo => {
                    return (
                      <div
                        className="col-md-5 mr-5 col-sm-12 row objetivos m-0 p-3 mx-auto mt-3"
                        id={"objetivo_" + objetivo.id}
                        key={"objetivo_" + objetivo.id}
                      >
                        <div className="col-12">
                          <h3 name='titulo' value={objetivo.titulo}>
                            {objetivo.titulo}
                          </h3>
                        </div>
                        <div className="col-12">
                          <p name='titulo' value={objetivo.descripcion}>
                            {objetivo.descripcion}
                          </p>
                        </div>
                        <div className="col-12">
                          <span>Inicio: {objetivo.inicia}</span>
                          <span>Finaliza: {objetivo.finaliza}</span>
                        </div>
                        <div className="col-12 mt-2">
                          <Link
                            to={`/objetivos/${objetivo.id}/edit`}
                            className="btn btn-success"
                          >
                            {this.props.textButton}
                          </Link>
                        </div>
                      </div>
                    );
                })}
            </div>
        );
    }
}
export default ObjetivosVista;