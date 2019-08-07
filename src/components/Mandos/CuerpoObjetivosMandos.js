import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Mandos.css';
import DeleteAction from '../DeleteAction.js';
import DecodificaMalos from '../Generales/DecodificaMalos';
/**
 * Guarda el componente de descrición del Mando
 * @param {propiedades} props 
 */
function Descripcion(props){
    let Descripcion = (
        <div className="col-12 p-2 mando-text">
            <p>{DecodificaMalos(props.descripcion)}</p>
        </div>
    );
    if(props.descripcion.length === 0){
        Descripcion = "";
    }
    return Descripcion
}
/**
 * Guarda el componente del titulo
 * @param {propiedades} props 
 */
function Titulo(props)
{
    let MuestraTitulo = DecodificaMalos(props.titulo);
    if(MuestraTitulo.length === 0){
        MuestraTitulo = DecodificaMalos(props.objetivo)
    }
    return(
        <h4>{MuestraTitulo}</h4>
    );
}
/**
 * Es el componente que nos ayudara a tenter un cuerpo general
 * @param {props} props 
 */
function CuerpoObjetivosMandos(props){
    const titulo = props.titulo,
    subtitulo = props.subtitulo,
    descripcion = props.descripcion,
    url = props.url,
    textSuccess = props.textSuccess,
    Delete = props.Delete,
    id = props.id,
    history = props.history,
    oneProfile = props.oneProfile,
    onClickSave = props.save;
    let size = props.size;
    if(size === undefined){
        size = 6; 
    }
    if(size === 0){
        size = 6;
    }
    let isProfile = false;
    if(props.isProfile)
    {
        isProfile = true;
    }
    return(
        <div className={`col-12 p-3 col-md-${size} row mando m-0 text-white`}>
            <div  className="col-12 text-center">
                <Titulo titulo={titulo} objetivo={subtitulo} />
            </div>
            <Descripcion descripcion={descripcion} />
            {props.children}
            <div className="col-12 mt-3">
                {isProfile && (<button className="btn btn-success" onClick={onClickSave}>Guardar</button>)}                
                {!isProfile && (<Link className="btn btn-success" to={url}>{textSuccess}</Link>)}
                <DeleteAction 
                url={Delete} 
                id={id} 
                oneProfile={oneProfile}  
                history={history}/>
            </div>
        </div>
    )
}
export default CuerpoObjetivosMandos;