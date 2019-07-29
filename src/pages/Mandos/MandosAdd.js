import React from 'react';
import './styles/MandosAdd.css';
import TraeDatos from '../../components/TraeDatos';
import CodificaMalos from '../../components/Generales/CodificaMalos';
import DecodificaMalos from '../../components/Generales/DecodificaMalos';
import MandosDatos from '../../components/Mandos/MandoDatos.js';
import CambiarEtapas from '../../components/Mandos/CambiarEtapas';
import InputDeTitulo from '../../components/Formulario/InputDeTitulo';
function Formula(props){
    let _self= props.this;
    let onChange = props.onChange
    return(
            <div className="col-7 mt-3">
                <input className="form-control" disabled={true} onChange={onChange} name="formula" type="text" defaultValue={_self.state.datos.formula} placeholder="Formula etapas" />
            </div>
    )
}
//Ayudara a añadir un nuevo indicador
class MandosAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        let variables=[
           {
               id: 1,
               etapas:[],
               valorTotal: 0,
               nombre:"Variable_1"
           },
           {
               id: 2,
               etapas:[],
               valorTotal: 0,
               nombre: "Variable_2"
           }
       ];
        this.state = MandosDatos(variables);
    }
    /**
     * 
     */
    componentDidMount()
    {   
        this.crearEtapas();
        TraeDatos({url: this.props.urlObjetivos,_self: this}, "objetivos");
        this.creaFormula();
    }
    /**
     *
     */
    componentWillUnmount() {
        clearTimeout(this.traeDatos);

    }
    /**
     * 
     */
    creaFormula = () => 
    {
        const Variable_1 = this.state.variables[0].nombre;
        const Variable_2 = this.state.variables[1].nombre;
        const formula = `(100*${Variable_2})/${Variable_1}`;
        this.setState({
            datos:{
                ...this.state.datos,
                formula: formula
            }
        })
    }
    /**
     * 
     */
    crearEtapas = () => {
        var $aVariables = []
        for (let index = 0; index < this.state.variables.length; index++) {
            var aEtapas = [];
            for (let indexEtapas = 1; indexEtapas <= this.state.datos.etapas; indexEtapas++) {
                aEtapas = [
                    ...aEtapas,
                    {
                        id: `${index}_${indexEtapas}`,
                        valor: 0,
                        idEtapa: indexEtapas,
                        porcentaje: 0,
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
     * quitaAcentos Nos ayudara a quitar los acentos de la cadena para poder hacer la busqueda de manera correcta
     * @param  {String} cCadena Es la cadena que queremos limpiar de acentos
     * @return {String}         Regresa la cadena limpia de acentos
     */
    quitaAcentos = (cCadena = "") => {
        cCadena = cCadena.replace(/á/gi, "a");
        cCadena = cCadena.replace(/é/gi, "e");
        cCadena = cCadena.replace(/í/gi, "i");
        cCadena = cCadena.replace(/ó/gi, "o");
        cCadena = cCadena.replace(/ú/gi, "u");
        cCadena = cCadena.replace(/ñ/gi, "n");
        return cCadena;
    }
     /**
     * Cambiaremos el estado mediante las peticiones que se hagan
     */
    handleChange= async e => {
        let atributo = e.target.getAttribute("tipo");
        switch(atributo){
            case 'variable':
                this.handleChangeVariable(e);
            break;
            case 'dataObjetivo':
                this.handleChangeDataObjetive(e);
            break;
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
     * Se encargara de guardar los datos del objetivo en caso de haber sido editado.
     */
    handleChangeDataObjetive = e => {
        const valor = e.target.value, nombre = e.target.name;
        this.setState({
            objetivosData:{
                ...this.state.objetivosData,
                [nombre]:valor
            },
        })
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
            const Etapas = await this.crearEtapas();
        }
    }
    /**
     * 
     */
    handleChangeVariable = e => {
        var nuevoStado = this.state;
        const id = e.target.getAttribute("id");
        var Valor = e.target.value;
        if(e.target.value.length === 0)
        {
            Valor = `Variable_${id}`
        }
        const cambioEspaciosEnBlanco = Valor.replace(/\s/g,"_");
        const cadenaLimpia = this.quitaAcentos(cambioEspaciosEnBlanco);
        nuevoStado.variables[id-1]['nombre'] = cadenaLimpia;
        this.setState(nuevoStado);
        this.creaFormula();
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
                    porcentaje: 100,
                    procentajeApp: 100
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
     * Se encargara de hacer x Acción cuando algún select sea precionado
     */
    handleClickSelect = async e =>{
        const tipo = e.target.getAttribute("tipo");
        const $Seleccionados = document.querySelectorAll(`select [tipo='${tipo}']`);
        let CuentaSiHaySeleccionado = 0;
        for (let index = 0; index < $Seleccionados.length; index++) {
            if($Seleccionados[index].selected)
            {
                CuentaSiHaySeleccionado++;
            }
        }
        let url;
        switch(tipo)
        {
            case 'jerarquia':
                url = this.props.urlRangos;
            break;
            case 'rango':
                url = this.props.urlAutentica;
            break;
        }
        const id = e.target.value;
        const req = await fetch(`${url}&action=selectForMandos&id=${id}`);
        const response = await req.json();
        if(CuentaSiHaySeleccionado > 1)
        {
            switch(tipo)
            {
                case 'jerarquia':
                response.datos.map(rangos => {
                    this.setState({
                            rangos:[
                                ...this.state.rangos,
                                {
                                    nombre: rangos.nombre,
                                    id: rangos.id,
                                    idArea : rangos.idArea
                                }
                            ]
                        })
                })
                break;
                case 'rango':
                    response.datos.map(users => {
                        this.setState({
                                users:[
                                    ...this.state.users,
                                    {
                                        nombre: users.nombre,
                                        id: users.id,
                                        idArea : users.idArea
                                    }
                                ]
                            })
                    })
                break;
            }
        }else{
            switch(tipo)
            {
                case 'jerarquia':
                    this.setState({
                        rangos: response.datos
                    })
                break;
                case 'rango':
                    this.setState({
                        users: response.datos
                    })
                break;
            }
        }
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
    /**
     * 
     */
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
                <datalist id="usuarios">
                    {this.state.allUsers.map(usuario=>{
                        return (
                            <option value={usuario.id} label={`${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM}`} key={usuario.id}/>
                        )
                    })}
                </datalist>
                <div className="col-12">
                   <InputDeTitulo datos={{_self: this,lugar:this.state.datos}} />
                </div>
                {!this.state.objetivoSelect && (
                    <div className="col-12 col-lg-8 mt-3">
                        <select className="form-control" name="objetivo" tipo="objetivo" onChange={this.handleChange}>
                            <option>Selecciona el objetivo</option>
                            {this.state.objetivos.map(objetivos => {
                                return (<option value={objetivos.id} key={objetivos.id}>{objetivos.titulo}</option>);
                            })}
                        </select>
                    </div>
                )}
                {this.state.objetivoShow && (
                <div className="col-12 col-lg-9 mt-3 row">
                    <div className="col-12">
                        <input tipo="dataObjetivo" onChange={this.handleChange} className="form-control" placeholder="Titulo de objetivo" type="text" name="titulo" defaultValue={DecodificaMalos(this.state.objetivosData.titulo)}/>
                    </div>
                    <div className="col-12 mt-3">
                        <textarea className="form-control" tipo="dataObjetivo" onChange={this.handleChange} placeholder="Descripción del objetivo" name="descripcion" defaultValue={DecodificaMalos(this.state.objetivosData.descripcion)}></textarea>
                    </div>
                </div>
                )}
                <div className="col-12 mt-3 row">
                    {this.state.variables.map(variable=>
                    {
                        return (
                        <div className="col-12 col-lg-4 mt-2" key={variable.id}>
                            <input className="form-control" type="text" onChange={this.handleChange} tipo="variable" id={variable.id} name={`variable_${variable.id}`} placeholder={`variable ${variable.id}`} />
                        </div>)
                    })}
                    <div className="col-12 col-lg-4 mt-2">
                        <button onClick={this.handleAddVariable} type="button" className="btn btn-success">+</button>
                        {this.state.variables.length > 2 && (
                            <button onClick={this.handleQuitVariable} type="button" className="btn btn-danger ml-2">-</button>
                        )}
                    </div>
                </div>
                <Formula this={this} onChange={this.handleChange}/>
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
                    {this.state.datos.formula.length !== 0 && (
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
                    )}
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