import React from 'react';
import './styles/ObjetivosVista.css';
import SinDatos from "../components/SinDatos.js";
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
                          <span>Inicio: 2019-03-01</span>
                          <span>Finaliza: 2019-12-30</span>
                        </div>
                        <div className="col-12 mt-2">
                          <button
                            className="btn btn-success"
                            name={"objetivo_" + objetivo.id}
                            onClick={this.props.onClick}
                          >
                            {this.props.textButton}
                          </button>
                        </div>
                      </div>
                    );
                })}
            </div>
        );
    }
}
export default ObjetivosVista;