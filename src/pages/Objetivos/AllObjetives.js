import React from 'react';
import '../../components/Mandos/styles/Mandos.css';
import TraeDatos from '../../components/TraeDatos';
import {Accordion, Card} from 'react-bootstrap';
import DecodificaMalos from '../../components/Generales/DecodificaMalos';
import VariablesMando from '../../components/Mandos/VariablesMando';
import GeneraDatosParaChart from '../../components/Mandos/GeneraDatosParaChart';
import BuscadorIncremental from '../../components/Generales/BuscadorIncremental';
// Serán los mini badges que guardaran un pequeño fragmento de información
// Ejemplo: Tipo de indicador, alcance, país, etc.
function BadgeOfInformation(props){
    const titulo = props.title,
    contenido = props.content;
    return(
        <div className="row col-3 d-flex justify-content-center ml-3 ">
            <div className="col-12 d-flex justify-content-center">
                <h5>{titulo}</h5>
            </div>
            <div className="mando-text col-12 p-3 d-flex justify-content-center border border-secondary">
                <h5>{contenido}</h5>
            </div>
        </div>
    )
}
// Ayudara  mostrar los datos del objetivo con sus badges más importantes.
// Ejem: El nombre del objetivo y la descripción
function ObjetiveData(props){
    const OBJETO = props.objeto, 
    LUGAR_DE_DATOS = props.lugarDeDatos;
    return(
        <React.Fragment>
            <div className="col-12 m-0 p-0">
                <h4>Objetivo</h4>
            </div>
            <div className="col-12 mando-text p-3 mb-3">
                <h4>{LUGAR_DE_DATOS.nombre}</h4>
            </div>
            <div className="col-12 mando-text p-3 mb-3">
                <p>{LUGAR_DE_DATOS.descripcion}</p>
            </div>
            <div className="col-12 row p-0 mb-3 d-flex justify-content-center">
                <BadgeOfInformation title="Alcance" content="Global" />
                <BadgeOfInformation title="Periodo" content={OBJETO.darPeriodo(LUGAR_DE_DATOS.inicio,LUGAR_DE_DATOS.finaliza)} />
                <BadgeOfInformation title="País iniciativa" content={LUGAR_DE_DATOS.paisAlcance} />
            </div>
        </React.Fragment>
    )
}
// Guardara los indicadores en su formato de collapse
function AccordionIndicador(props){
    const children = props.children,
    datos = props.datos,
    idEvent = props.id;
    let titulo = datos.datos.titulo,
    tipoDeIndicador = datos.datos.formaDeIndicador; 
    if(titulo.length === 0){
        titulo = datos.objetivosData.titulo;
    }
    if(tipoDeIndicador === undefined){
        tipoDeIndicador = "incremento";
    }
    if(tipoDeIndicador.length === 0){
        tipoDeIndicador = "incremento";
    }
    return(
        <Card className="mando-text">
            <Accordion.Toggle as={Card.Header} eventKey={idEvent}>
                <div className="col-12 row">
                    <h5 className="col-6">
                        {DecodificaMalos(titulo)}
                    </h5>
                    <span className="float-right text-right">
                        {datos.usuario}
                    </span>
                </div>    
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={idEvent}>
                <Card.Body>
                    <div className="row col-12 d-flex justify-content-center mb-3">
                        <BadgeOfInformation title="Naturaleza" content={tipoDeIndicador.toUpperCase()} />
                        <BadgeOfInformation title="Responsable" content={datos.usuario} />
                        <BadgeOfInformation title="Unidad de Medida" content={datos.datos.unidadDeMedida.toUpperCase()} />
                    </div>
                    {children}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
// Serán los datos del indicador
function IndicadorData(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos;
    return(
        <div className="col-12 row">
            <div className="col-12 m-0 p-0">
                <h4>Indicadores</h4>
            </div>
            <Accordion className="col-12 p-0">
                {LUGAR_DE_DATOS.indicadores !== undefined && LUGAR_DE_DATOS.indicadores.map((indicador,xId) =>{
                let AceptacionBuena, AceptacionMedio;
                if(indicador.datos.AceptacionBuena === undefined || indicador.datos.AceptacionBuena === 0 ){
                    AceptacionBuena = 94;
                }else{
                    AceptacionBuena = indicador.datos.AceptacionBuena;
                }
                if(indicador.datos.AceptacionMedia=== undefined || indicador.datos.AceptacionMedia === 0 ){
                    AceptacionMedio = 80;
                }else{
                    AceptacionMedio = indicador.datos.AceptacionMedia;
                }
                const porcentaje = {
                    porcentajeBueno: AceptacionBuena,
                    porcentajeMedio: AceptacionMedio 
                };
                   return( <AccordionIndicador key={xId} id={xId} datos={indicador}>
                        <VariablesMando
                                    variables={indicador.variables}
                                    porcentaje={porcentaje}
                                    etapa={indicador.datos.tipoDeEtapa}
                                />
                    </AccordionIndicador>)
                }
                )}
            </Accordion>
        </div>
    )
}
function BodyAllObjetives(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos;
    let Indicadores = (
        <div>
            <h4 className="text-danger">Este objetivo aún no cuenta con indicadores</h4>
        </div>
    );
    if(LUGAR_DE_DATOS.indicadores !== undefined){
        Indicadores = <IndicadorData objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS}/>;
    }
    return(
        <div data-search={`${LUGAR_DE_DATOS.nombre}`} className="col-12 row mando text-white p-3 mb-3">
            <ObjetiveData objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS}/>
            {Indicadores}
        </div>
    )
}
export default class AllObjetives extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    // Montaremos el componente trayendo los datos que necesitamos para ver todos los objetivos con sus indicadores correspondientes
    componentDidMount(){
        TraeDatos({url:this.props.url,_self:this},"data","general");
    }
    // Desmonstaremos el componente para que no haya problema al salir de este.
    componentWillUnmount(){
        clearTimeout(this.TraeDatos)
    }
    // Podremos saber el perior en el que se encuentra el objetivo
    darPeriodo = (FechaInicio, FechaFin ) =>{
        const ComprobarFechaInicio = FechaInicio.slice(0,4),
        ComprobarFechaFin = FechaFin.slice(0,4);
        let Periodo;
        if(ComprobarFechaInicio === ComprobarFechaFin){
            Periodo = ComprobarFechaInicio;
        }else{
            Periodo = `${ComprobarFechaInicio} - ${ComprobarFechaFin}`;
        }
        return Periodo;
    }
    // Renderizaremos los cuerpos de cada objetivo.
    render(){
        this.buscadorTime = setTimeout(()=>{BuscadorIncremental({claseCorrecta: "d-block",claseIncorrecta:"d-none",buscador: "buscaObjetivos",seBusca:"allObjetives"})},1000);
        return(
            <div className="col-12">
                <div className="col-12">
                    <input name="buscaObjetivos" type="text" className="form-control mb-3 col-6" placeholder="Buscar objetivo" />
                </div>
                <div className="col-12"  search-name="allObjetives">
                    {this.state.data.map((objetivo,xId) => 
                        <BodyAllObjetives objeto={this} key={xId} lugarDeDatos={objetivo}/>
                    )}
                </div>
            </div>
        )
    }
}