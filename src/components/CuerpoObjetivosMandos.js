import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Mandos.css';
import DeleteAction from './DeleteAction.js';
/**
 * Cambiara los acentos que vengan con codificación java
 */
function acentosEncodeJava(cadena = ""){
    cadena = cadena.replace(/u00e1/gi,"á");
    cadena = cadena.replace(/u00C1/gi,"Á");
    cadena = cadena.replace(/u00E9/gi,"é");
    cadena = cadena.replace(/u00C9/gi,"É");
    cadena = cadena.replace(/u00ED/gi,"í");
    cadena = cadena.replace(/u00CD/gi,"Í");
    cadena = cadena.replace(/u00f3/gi,"ó");
    cadena = cadena.replace(/u00D3/gi,"Ó");
    cadena = cadena.replace(/u00D3/gi,"ú");
    cadena = cadena.replace(/u00DA/gi,"Ú");
    cadena = cadena.replace(/u00F1/gi,"ñ");
    cadena = cadena.replace(/u00D1/gi,"Ñ");
    return cadena;
}
/**
 * Guarda el componente de descrición del Mando
 * @param {propiedades} props 
 */
function Descripcion(props){
    let Descripcion = acentosEncodeJava(props.descripcion);
    if(Descripcion.length === 0){
        Descripcion = "Este indicador no cuenta con una descripción, por favor de agregar una";
    }
    return(
            <p>{Descripcion}</p>
    )
}
/**
 * Guarda el componente del titulo
 * @param {propiedades} props 
 */
function Titulo(props)
{
    let MuestraTitulo = acentosEncodeJava(props.titulo);
    if(MuestraTitulo.length === 0){
        MuestraTitulo = acentosEncodeJava(props.objetivo)
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
    const titulo = props.titulo;
    const subtitulo = props.subtitulo;
    const descripcion = props.descripcion;
    const url = props.url;
    const textSuccess = props.textSuccess;
    const Delete = props.Delete;
    const id = props.id;
    const history = props.history;
    const oneProfile = props.oneProfile;
    const onClickSave = props.save;
    let isProfile = false;
    if(props.isProfile)
    {
        isProfile = true;
    }
    return(
        <div className="col-12 p-3 col-md-6 row mando mx-auto text-white">
            <div  className="col-12 text-center">
                <Titulo titulo={titulo} objetivo={subtitulo} />
            </div>
            <div className="col-12 p-2 mando-text">
                <Descripcion descripcion={descripcion} />
            </div>
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