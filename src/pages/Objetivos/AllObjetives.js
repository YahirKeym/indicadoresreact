import React from 'react';
import './styles/Mandos.css';
export default class AllObjetives extends React.Component{
    render(){
        return(
            <div className="col-12">
                <div className="col-12 row mando">
                    <div className="col-12">
                        <h4>Objetivo</h4>
                    </div>
                    <div className="col-12 mando-text p-3">

                    </div>
                    <div className="col-12 mando-text p-3">

                    </div>
                    <div className="col-12">
                        <h4>Indicadores</h4>
                    </div>
                    <div className="col-12 row">
                        <h5>Nombre del indicador</h5>
                    </div>
                </div>
            </div>
        )
    }
}