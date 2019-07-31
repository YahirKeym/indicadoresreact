import React from 'react';
import './styles/MandosAdd.css';
import TraeDatos from '../../components/TraeDatos';
import {CodificaMalos} from '../../components/Generales/ModulosGenerales.js';
import {MandosDatos} from '../../components/Mandos/ModulosMandos.js';
import TitleAndDescription from '../../components/Mandos/FormularioMandos/TitleAndDescription';
import Variables from '../../components/Mandos/FormularioMandos/Variables';
import Acciones from '../../components/Mandos/FormularioMandos/Acciones';
import DatosGenerales from '../../components/Mandos/FormularioMandos/DatosGenerales';
import Etapas from '../../components/Mandos/FormularioMandos/Etapas';
import BodyFormulario from '../../components/Formulario/BodyFormulario';
import ValidaCampos from '../../components/Formulario/ValidaCampos';
import EmptyFields from '../../components/Errores/EmptyFields';
import AddOneElement from '../../components/Generales/AddOneElement';
import Subindicadores from '../../components/Mandos/FormularioMandos/Subindicadores';

// Creara un nuevo indicador mediante los campos solicitados
class MandosAdd extends React.Component
{
    // Definimos el constructor para poder iniciar con los datos de nuestra app.
    constructor(props)
    {
        super(props);   
        let variables=[ // Definimos las primeras dos variables que irán por default en la creación del indicador
           {
               id: 1,
               etapas:[],
               valorTotal: 0,
               nombre:"Variable 1"
           },
           {
               id: 2,
               etapas:[],
               valorTotal: 0,
               nombre: "Variable 2"
           }
       ];
        this.state = MandosDatos(variables);
    }
    // Una vez que nuestro componente se haya montado mandara a llamar a las etapas de cada variable 
    // y traera los datos de los objetivos
    componentDidMount()
    {   
        this.entregaEtapasALasVariables();
        TraeDatos({url: this.props.urlObjetivos,_self: this}, "objetivos");
    }
    // Si llegase a ser el caso de que salgamos de los indicadores antes de terminar la petición
    // en cuanto desmontemos el componente, se limpiara la petición echa.
    componentWillUnmount() {
        clearTimeout(this.traeDatos);
    }
    // Se manda a llamar para generar las etapas que le pedimos por cada variable.
    // Por default las etapas vienen en 12 que serían 12 meses: Enero, Febrero, Marzo...
    entregaEtapasALasVariables = () => {
        let $aVariables = []
        let aEtapas;
        // Contamos la cantidad de variables que son
        for (let index = 0; index < this.state.variables.length; index++) { 
            aEtapas = [];
            // Buscamos en cuantas son las etapas que nos piden
            for (let indexEtapas = 1; indexEtapas <= this.state.datos.etapas; indexEtapas++) { 
                aEtapas = [ 
                    ...aEtapas,
                    {
                        id: `${index}_${indexEtapas}`,
                        valor: 0,
                        idEtapa: indexEtapas,
                        porcentaje: 100,
                        nombreEtapa: ''
                    }
                ]
            }
            $aVariables = [
                ...$aVariables,
                {
                    ...this.state.variables[index],
                    etapas:aEtapas
                }
            ]
        }
        this.setState({
            variables:$aVariables,
            etapas: aEtapas
        })
    }
    // Al seleccionar un objetivo, este se guardara en el estado de la aplicación y también le dirá que uno ya fue seleccionado
    // El select desaparecera una vez el objetivo haya sido seleccionado.
    handleShowObjetivoEdit = async e => {
        const valor = e.target.value;
        const req = await fetch(`${this.props.urlObjetivos}&action=select&id=${valor}`);
        const response = await req.json();
        this.setState({
            objetivosData:{
                ...this.state.objetivosData,
                'titulo':'',
                'descripcion':''
            },
            objetivoShow:false,
            objetivoSelect: true
        })
        let titulo = CodificaMalos(response.datos.titulo),
        descripcion = CodificaMalos(response.datos.descripcion);
        this.setState({
            objetivosData:{
                ...this.state.objetivosData,
                'titulo' : titulo,
                'descripcion' : descripcion
            },
            objetivoShow:true
        })
    }
    // Nos ayudara a agregar una variable con sus etapas.
    handleAddVariable = (e) =>
    {
        e.preventDefault();
        let aEtapas = [];
        const idVariable = this.state.variables.length;
        for (let indexEtapas = 1; indexEtapas <= this.state.datos.etapas; indexEtapas++) {
            aEtapas = [
                ...aEtapas,
                {
                    id: `${idVariable}_${indexEtapas}`,
                    valor: 0,
                    idEtapa: indexEtapas,
                    porcentaje: 0
                }
            ]
        }
        AddOneElement(e,this,this.state.variables,"Variable",[
            {"nombre":"etapas","valor":aEtapas},
            {"nombre":"valorTotal","valor": 0}
        ])
    }
    /**
     * Añadira el mando haciendo los cambios de estados necesarios a empty, le asignara los valores correctos, limpiara las cadenas y realizara la petición del usuario.
     */
    handleAddMando = async e =>
    {
        e.preventDefault();
        this.cambioEstado = await this.setState({
            datos:{
                ...this.state.datos,
                rangos:[],
                jerarquias:[],
                usuarios:[],
            }
        })
        const creaDatos = {
            variables: this.state.variables,
            datos: this.state.datos,
            objetivosData: this.state.objetivosData,
            acciones: this.state.acciones,
            rangos: this.state.rangos
        }
        const input = ValidaCampos("input"),
        select = ValidaCampos("select");
        if(input && select){
            const Datos = JSON.stringify(creaDatos);
            let cadenaLimpia = Datos.replace(/&/gi,"%26");
            const req = await fetch(`${this.props.url}&action=add&data=${cadenaLimpia}`);
            const response = await req.json();
            if(response.status)
            {
                this.props.history.push("/mandos")
            }
        }else{
            this.setState({
                "emptyField":true
            })
            window.scrollTo(0,0)
        }
    }
    /**
     * Se encargara de llevarnos hacía la página de los mandos
     */
    handleBack = (e) =>
    {
        e.preventDefault();
        this.props.history.push("/mandos");
    } 
    // Renderizaremos los componentes necesarios para mostrar el formulario para agregar indicadores.
    render(){
        let emptyField;
        if(this.state.emptyField){
            emptyField = <EmptyFields />
        }
        return (
            <BodyFormulario>
                {emptyField}
                <TitleAndDescription objeto={this} lugarDeDatos={this.state} />
                <Variables objeto={this} lugarDeDatos={this.state} />
                <Subindicadores objeto={this} lugarDeDatos={this.state} />
                <Acciones objeto={this} lugarDeDatos={this.state} />
                <DatosGenerales objeto={this} lugarDeDatos={this.state} />
                <Etapas objeto={this} lugarDeDatos={this.state} />
                <div className="col-12 mt-3">
                    <button className="btn btn-success" onClick={this.handleAddMando}>Agregar</button>
                    <button className="btn btn-danger ml-3" onClick={this.handleBack}>Volver</button>
                </div>
            </BodyFormulario>
        );
    }
}
export default MandosAdd;