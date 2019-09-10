import React from 'react';
import DecodificaMalos from '../Generales/DecodificaMalos.js';
import './styles/VariablesDeMandos.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

/**
 * 
 * @param {properties} props 
 */
function VariablesMando(props)
{
    const {porcentajeBueno, porcentajeMedio} = props.porcentaje,
    tipoDeEtapa = props.etapa,
    variables = props.variables,
    seEdita = props.editar,
    onChange = props.onChange,
    porcentaje = props.muestraPorcentaje,
    heredado = props.heredado,
    OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos,
    perfil = props.perfil;
    let cede = props.cede;
    if(cede === undefined){
        cede = "";
    }
    return(
        <React.Fragment>
           {variables.map(variable =>{
                return(
                    <div className="col-12 row variable" key={variable.id}>
                        <div className="col-9">
                            <span style={{fontWeight:700}}>{DecodificaMalos(`${cede} ${variable.nombre}`)}</span> 
                                <span className="float-right"><span style={{fontWeight:700}}>Tipo de etapa:</span> {tipoDeEtapa} <span style={{fontWeight:700, marginLeft:50}}>Total:</span> {Math.round(variable.valorTotal * 100) / 100}</span>
                        </div>
                        <div className="col-12 row">
                            {variable.etapas.map((etapa,xId) =>{
                                let color = "";
                                if(etapa.porcentaje < porcentajeBueno){
                                    color = "bg-warning";
                                }
                                if(etapa.porcentaje < porcentajeMedio){
                                    color ="bg-danger"
                                }
                                let idVariable = variable.id;
                                if(heredado){
                                    idVariable = variable.id+1;
                                }
                                if(etapa.file === undefined){
                                    etapa.file = "";
                                }
                                let uploadFile, displayText;
                                if (etapa.file.length !== 0){
                                    etapa.file = etapa.file.replace(" ","");
                                    etapa.file = etapa.file.replace('\t',"");
                                    displayText="block";
                                }
                                if(etapa.file.length === 0 && perfil){
                                    uploadFile = (
                                        <React.Fragment>
                                            {                                                        
                                                variable.id !== 1 &&(
                                                    <input type="file" className="uploadFile" onChange={
                                                        async e=>{
                                                            e.preventDefault()
                                                            let file = e.target.files[0],
                                                            formData = new FormData();
                                                            formData.append("file",file);
                                                            if(file.type === "application/pdf" || file.type==="image/png" || file.type === "image/jpeg"){
                                                                let req = await fetch(`${OBJETO.props.url}&action=upload`,{
                                                                    method:'POST',
                                                                    body: formData
                                                                }),
                                                                response = await req.json();
                                                                if(response.status){
                                                                    LUGAR_DE_DATOS.variables[variable.id-1].etapas[etapa.idEtapa-1].file = response.ruta;
                                                                    OBJETO.setState({
                                                                        'guardar':true
                                                                    })
                                                                }
                                                                OBJETO.setState(OBJETO.state);
                                                                OBJETO.handleUpdate(e);
                                                            }
                                                        }
                                                    }/>
                                                )
                                            }
                                        </React.Fragment>
                                    )
                                }
                                if(seEdita){
                                    return (
                                        <React.Fragment key={xId}>
                                            <div className="input-group col-2 text-center ">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text p-0">
                                                        {/* <button className="btn btn-success p-0" onClick={e=>{
                                                            OBJETO.acceptEtapa(e,etapa.idEtapa-1,idVariable-1, OBJETO)
                                                        }
                                                        }><FontAwesomeIcon icon={faCheck}/></button> */}
                                                    </div>
                                                </div>
                                                <input type="number" name={etapa.id} idetapa={etapa.idEtapa} idvariable={idVariable} onChange={onChange} className={`${color} col-10 etapa__input mt-2`} defaultValue={etapa.valor} />
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                                let valor = etapa.valor;
                                if(porcentaje){
                                    valor = `${Math.round(etapa.porcentaje*100)/100}%`;
                                }
                                let col;
                                if(variable.etapas.length >= 12){
                                    col = 1;
                                }else{
                                    col = 2;
                                }
                                return(
                                    <div className={`col-${col} text-center`} key={xId}>
                                        {variable.id === 1 && (
                                                <div className="col-12 variable_nombre p-0">
                                                    {DecodificaMalos(etapa.nombre)}
                                                </div>
                                            )}
                                        <div className={`etapa ${color} text-white`} style={{display:displayText}}>
                                            <p>{valor}</p>                                                   
                                                {uploadFile}
                                                {
                                                    etapa.file.length !== 0 && (
                                                        <React.Fragment>
                                                            <a href={etapa.file} target="_blank" className="text-white uploadFile">Ver Informe</a>                                                        
                                                            <a href={etapa.file} target="_blank" className="text-white">Ver Informe</a>
                                                        </React.Fragment>
                                                    )
                                                }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-2">
                            
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    )
}
export default VariablesMando;