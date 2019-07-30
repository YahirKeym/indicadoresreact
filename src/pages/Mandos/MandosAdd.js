import React from 'react';
import './styles/MandosAdd.css';
import TraeDatos from '../../components/TraeDatos';
import {CodificaMalos, DecodificaMalos} from '../../components/Generales/ModulosGenerales.js';
import {MandosDatos, CambiarEtapas} from '../../components/Mandos/ModulosMandos.js';
import {InputText, TextArea, Select} from '../../components/Formulario/ModulosFormulario.js';
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
     /**
     * Cambiaremos el estado mediante las peticiones que se hagan
     */
    handleChange= async e => {
        let atributo = e.target.getAttribute("tipo");
        switch(atributo){
            case 'action':
                this.handleChangeAction(e);
            break;
            case 'etapaNombre':
                this.handleNombreEtapa(e);
            break;
            default:
                this.handleChangeGeneral(e);
            break;
        }
        if(atributo === "objetivo"){
            this.handleShowObjetivoEdit(e);
        }
    }
    /**
     * Se encargara de darle un nombre a las etapas
     */
    handleNombreEtapa = e => {
        const idEtapa = e.target.getAttribute("idetapa");
        const Valor = e.target.value;
        const nuevoStado = this.state;
        nuevoStado.variables.map(variable => {
            nuevoStado.variables[variable.id -1].etapas[idEtapa - 1]['nombreEtapa'] = Valor;
        })
        this.setState(nuevoStado);
    }
    /**
     * Nos ayudara a mostrar los campos para editar el objetivo
     */
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
    /**
     * Se encargara de ls cambios generales, como por ejemplo del estado de datos.
     */
    handleChangeGeneral = async e => {
        const nombre = e.target.name;
        let valor = e.target.value;
            valor = valor.replace(/"/gi,"'");
        if(valor.length === 0){
            valor = "";
            if(nombre === "etapas"){
                valor = 1;
            }
        }
        if(nombre === "etapas" && valor > 500){
            valor = 500;
        }
        const Estado = await this.setState({
            datos:{
                ...this.state.datos,
                [nombre] : valor
            }
        })
        if(nombre === "etapas"){
            const Etapas = await this.entregaEtapasALasVariables();
        }
    }
    /**
     * Nos ayudara a agregar más variables de así requerirlo
     */
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
        this.setState(
            {
                variables:[
                    ...this.state.variables,
                    {
                        etapas: aEtapas,
                        id: this.state.variables.length +1,
                        nombre: `Variable_${this.state.variables.length + 1}`
                    }
                ]
            }
        )
    }
    /**
     * 
     */
    handleQuitVariable = e =>{
        e.preventDefault();
        const cantidadDeVariables = this.state.variables.length;
        if(cantidadDeVariables > 2)
        {
            const variables = this.state.variables.splice(-cantidadDeVariables,cantidadDeVariables-1)
            this.setState(
                {
                    variables: variables
                }
            )
        }
    }
    /**
     * 
     */
    handleChangeAction = e =>{
        var nuevoStado = this.state;
        const id = e.target.getAttribute("id");
        var Valor = e.target.value;
        if(Valor.length === 0)
        {
            Valor = `Acción ${id}`
        }
        nuevoStado.acciones[id-1]['nombre'] = Valor;
        this.setState(nuevoStado);
    }
    /**
     * Añadira el mando haciendo los cambios de estados necesarios a empty, le asignara los valores correctos, limpiara las cadenas y realizara la petición del usuario.
     */
    handleAddMando = async e =>
    {
        e.preventDefault();
        const cambioEstado = await this.setState({
            datos:{
                ...this.state.datos,
                rangos:[],
                jerarquias:[],
                usuarios:[],
            }
        })
        const asignaValores = await this.asignarValores();
        const creaDatos = {
            variables: this.state.variables,
            datos: this.state.datos,
            objetivosData: this.state.objetivosData,
            acciones: this.state.acciones,
            rangos: this.state.rangos
        }
        const Datos = JSON.stringify(creaDatos);
        let cadenaLimpia = Datos.replace(/&/gi,"%26");
        const req = await fetch(`${this.props.url}&action=add&data=${cadenaLimpia}`);
        const response = await req.json();
        if(response.status)
        {
            this.props.history.push("/mandos")
        }
    }
    /**
     * Agregara una acción de así requerirlo.
     */
    handleAddAction = e =>{
        this.setState(
            {
                acciones:[
                    ...this.state.acciones,
                    {
                         id: this.state.acciones.length +1,
                         nombre: `Acción ${this.state.acciones.length + 1}`
                    }
                ]
            }
        )
    }
    /**
     * Quitara una acción de abajo hacía arriba
     */
    handleQuitAction = e =>{
        const cantidadDeAciones = this.state.acciones.length;
        if(cantidadDeAciones > 0)
        {
            const acciones = this.state.acciones.splice(-cantidadDeAciones,cantidadDeAciones-1)
            this.setState(
                {
                    acciones: acciones
                }
            )
        }
    }
    /**
     * Asignara los valores de los rangos y de las vriables
     */
    asignarValores = () =>{
        const $Rangos = document.querySelectorAll("select [tipo='rango']");
        let aRangos = [];
        for (let index = 0; index < $Rangos.length; index++) {
            if($Rangos[index].selected){
                aRangos = [
                    ...aRangos,
                    {
                        id: $Rangos[index].value
                    }
                ]
            }
        }
        const $Jerarquias = document.querySelectorAll("select [tipo='jerarquia']");
        let aJerarquias = [];
        for (let index = 0; index < $Jerarquias.length; index++) {
            if($Jerarquias[index].selected){
                aJerarquias = [
                    ...aJerarquias,
                    {
                        id: $Jerarquias[index].value
                    }
                ]
            }
        }
        const $Usuarios = document.querySelectorAll("select [tipo='user']");
        let aUsers = [];
        for (let index = 0; index < $Usuarios.length; index++) {
            if($Usuarios[index].selected){
                aUsers = [
                    ...aUsers,
                    {
                        id: $Usuarios[index].value,
                        nivel: $Usuarios[index].getAttribute("nivel")
                    }
                ]
            }
        }
        let globalRangos = true, globalJerarquia = true;
        if(aRangos.length > 0){
            globalRangos = false;
        }
        if(aJerarquias > 0){
            globalJerarquia = false;
        }
        this.setState({
            datos:{
                ...this.state.datos,
                rangos: {
                    datos: aRangos,
                    global: globalRangos
                },
                jerarquias: {
                    datos: aJerarquias,
                    global: globalJerarquia
                },
                usuarios: {
                    datos: aUsers,
                }
            }
        })
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
        let Responsables = "";
        if(parseInt(this.state.datos.tipoIndicador) === 1 || parseInt(this.state.datos.tipoIndicador) === 0 ){
            Responsables = (
                <React.Fragment>
                    <div className="col-6 mt-3">
                        <select multiple className="form-control" onClick={this.handleClickSelect} name="rangos">
                            {this.state.jeraraquias.map(rango => {
                                return(<option tipo="jerarquia" value={rango.id} key={rango.id}>{rango.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <div className="col-6 mt-3">
                        {this.state.rangos.length > 0  && (
                        <select multiple className="form-control" onClick={this.handleClickSelect} name="rangos">
                            {this.state.rangos.map(rango => {
                                return(<option tipo="rango" value={rango.id} key={rango.id}>{rango.nombre}</option>)
                            })}
                        </select>)}
                    </div>
                    <div className="col-6 mt-3">
                        {this.state.users.length > 0  && (<select multiple className="form-control" name="rangos">
                            {this.state.users.map(user => {
                                return(<option rango="true" tipo="user" value={user.id} nivel={user.nivelPuesto} key={user.id}>{`${user.nombre} ${user.apellidoP} ${user.apellidoM}`}</option>)
                            })}
                        </select>)}
                    </div>
                </React.Fragment>
            )
        }
        return (
            <form className="row col-12 col-lg-9 mx-auto p-3">
                <div className="col-12">
                   <InputText datos={{_self: this,lugar:this.state.datos,zona:"titulo"}} plhold="Titulo de indicador"/>
                </div>
                {!this.state.objetivoSelect && (
                    <div className="col-12 col-lg-8 mt-3">
                            <Select 
                            elementos={this.state.objetivos} callback={true} 
                            function={e => {
                                this.handleShowObjetivoEdit(e);
                            }}
                            datos={{_self:this,lugar: this,zona:""}} />
                    </div>
                )}
                {this.state.objetivoShow && (
                <div className="col-12 col-lg-9 mt-3 row">
                    <div className="col-12">
                        <InputText datos={{_self:this, lugar: this.state.objetivosData,zona:"titulo"}} plhold="Titulo de objetivo" dfv={DecodificaMalos(this.state.objetivosData.titulo)} />
                    </div>
                    <div className="col-12 mt-3">
                        <TextArea datos={{_self:this, lugar: this.state.objetivosData,zona:"descripcion"}} plhold="Descripción del objetivo" dfv={DecodificaMalos(this.state.objetivosData.descripcion)} />
                    </div>
                </div>
                )}
                <div className="col-12 mt-3 row">
                    {this.state.variables.map(variable=>
                    {
                        return (
                        <div className="col-12 col-lg-4 mt-2" key={variable.id}>
                            <InputText datos={{_self:this, lugar: this.state.variables[variable.id-1], zona:"nombre"}} plhold={`variable ${variable.id}`} />
                        </div>)
                    })}
                    <div className="col-12 col-lg-4 mt-2">
                        <button onClick={this.handleAddVariable} type="button" className="btn btn-success">+</button>
                        {this.state.variables.length > 2 && (
                            <button onClick={this.handleQuitVariable} type="button" className="btn btn-danger ml-2">-</button>
                        )}
                    </div>
                </div>
                {this.state.acciones.map(accion => {
                    return(
                        <div key={accion.id} className="col-12 mt-2">
                            <input type="text" tipo="action" id={accion.id} onChange={this.handleChange} defaultValue={accion.nombre} className="col-6 form-control" name={accion.nombre} />
                        </div>
                    )
                })}
                <div className="col-12 mt-3">
                    <div className="col-6">
                        <a className="text-primary accion" onClick={this.handleAddAction}>Agregar Acción +</a>
                    </div>
                    {this.state.acciones.length !== 0 && (
                        <div className="col-6">
                            <a className="text-primary accion" onClick={this.handleQuitAction}>Eliminar Acción -</a>
                        </div>
                    )}
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-12">
                        <label htmlFor="etapas">Etapas que tendra este mando </label>
                    </div>
                    <div className="col-12 col-lg-6">
                        <input name="tipoDeEtapa" type="text" onChange={this.handleChange} placeholder="Ejemplo: Meses" className="float-right form-control" />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <input type="number" max="500" min="1" onChange={this.handleChange} className="form-control" name="etapas" defaultValue={this.state.datos.etapas}/>
                    </div>
                    <div className="col-12 row m-0">
                        <span className="col-12">Tipo de Indicador: </span> 
                        <select className="form-control col-4" name="tipoIndicador" onChange={this.handleChange}>
                            <option value="0">Resultados</option>
                            <option value="1">Comportamentable</option>
                            <option value="3">Personal</option>
                        </select>
                        <select className="col-4 ml-3 form-control" name="formaDeIndicador" onChange={this.handleChange}>
                            <option value="incremento">Incremento</option>
                            <option value="decremento">Decremento</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-12 col-md-6">
                        <div className="col-12">
                            <label htmlFor="unidadDeMedida">UDM</label>
                        </div>
                        <input type="text" placeholder="Unidad de medida" onChange={this.handleChange} className="form-control" name="unidadDeMedida"/>
                    </div>
                    <div className="col-12 col-md-6 row">
                        <div className="col-12">
                            <label htmlFor="AceptacionBuena">Aceptación %</label>
                        </div>
                        <div className="col-4">
                            <input type="number" onChange={this.handleChange} min="1" name="AceptacionBuena" className="form-control border border-success" placeholder="Buena" />
                        </div>
                        <div className="col-4">
                            <input type="number" onChange={this.handleChange} min="1" name="AceptacionMedia" className="form-control border border-warning" placeholder="Media" />
                        </div>
                    </div>
                </div>
                <div className="col-12 row mt-3 m-0">
                    {this.state.etapas.map(etapa => {
                        return(
                            <input type="text" key={etapa.idEtapa} idetapa={etapa.idEtapa} onChange={this.handleChange} tipo="etapaNombre" className="form-control col-3" placeholder={`Etapa ${etapa.idEtapa} nombre`} />
                        )
                    })}
                    <div className="col-12 col-lg-12 row mt-3 m-0">
                        {this.state.variables.map(variable=>{
                                return(
                                    <div className="row col-12 mt-3" key={variable.id}>
                                        <div className="col-12">
                                                Valor de las etapas de {variable.nombre} 
                                        </div>
                                        <div className="col-12 p-0 col-lg-8 row">
                                            {variable.etapas.map(etapa=>{
                                                let color = "border border-success";
                                                if(etapa.porcentaje < this.state.datos.AceptacionBuena)
                                                {
                                                    color = "border border-warning";
                                                }
                                                if(etapa.porcentaje < this.state.datos.AceptacionMedia)
                                                {
                                                    color = "border border-danger";
                                                }
                                                return(<input type="number" placeholder="0" idetapa={etapa.idEtapa} onChange={e=>{CambiarEtapas(e,this,this.state.variables,this.state)}} tipo="etapa" name={etapa.id} idvariable={variable.id} className={`col-2 form-control ${color}`} key={etapa.id} />)
                                            })}
                                        </div>
                                        <div className="col-12 col-lg-4 text-center">
                                            <h5>{variable.nombre}: <span style={{fontWeight:100}}>{Math.round(variable.valorTotal* 100) / 100} {this.state.datos.unidadDeMedida}</span></h5>
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-success" onClick={this.handleAddMando}>Agregar</button>
                        <button className="btn btn-danger ml-3" onClick={this.handleBack}>Volver</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default MandosAdd;