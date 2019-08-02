import React from 'react';
import {DecodificaMalos} from '../../Generales/ModulosGenerales';
import {Input, TextArea, Select} from '../../Formulario/ModulosFormulario';
// Será el formulario para editar titulo y la descripción base al objetivo seleccionado
// ó de manera individual.
function TitleAndDescription(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos
    return(
        <React.Fragment>
            <div className="col-12">
                <h4>Titulo y descripción del indicador</h4>
                <Input type="text" datos={{_self: objeto,lugar:lugarDeDatos.datos,zona:"titulo"}} plhold="Titulo de indicador"/>
            </div>
            {!lugarDeDatos.objetivoSelect && (
                <div className="col-12 col-lg-8 mt-3">
                    <Select 
                        elementos={lugarDeDatos.objetivos} callback={true} 
                        function={e => {
                            objeto.handleShowObjetivoEdit(e);
                        }}
                        valor="id"
                        datos={{_self:objeto,lugar: objeto,zona:""}} 
                        plhold="Seleccionar un objetivo"/>
                </div>
            )}
            {lugarDeDatos.objetivoShow && (
                <div className="col-12 col-lg-9 mt-3 row">
                    <h4>Objetivo</h4>
                    <div className="col-12">
                        <div>
                            {DecodificaMalos(lugarDeDatos.objetivosData.titulo)}
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div>
                            {DecodificaMalos(lugarDeDatos.objetivosData.descripcion)}
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
export default TitleAndDescription;