import React from 'react';

class ObjetivosVista extends React.Component
{
    render() 
    {
        return (
            <div className="row">
                {this.props.data.map(objetivo => {
                    return (
                        <div className="col-md-4 col-sm-12" key={objetivo.id}>
                            <h3>{objetivo.titulo}</h3>
                            <span>Inicio: 2019-03-01</span>
                            <span>Finaliza: 2019-12-30</span>
                            <button className="btn btn-success">{this.props.textoButton}</button>
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default ObjetivosVista;