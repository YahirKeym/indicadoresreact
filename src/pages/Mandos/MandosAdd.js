import React from 'react';
import './styles/MandosAdd.css';
import TraeDatos from '../../components/TraeDatos';
function Formula(props){
    let _self= props.this;
    let onChange = props.onChange
    if(_self.state.errors.formulaNoCoincideConVariables)
    {
        return(
            <div className="col-7 mt-3">
                <input className="form-control is-invalid" disabled={true} onChange={onChange} name="formula" type="text" defaultValue={_self.state.datos.formula} placeholder="Formula etapas" />
            </div>
        ) 
    }
    return(
            <div className="col-7 mt-3">
                <input className="form-control" disabled={true} onChange={onChange} name="formula" type="text" defaultValue={_self.state.datos.formula} placeholder="Formula etapas" />
            </div>
    )
}
class MandosAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            variables:[
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
            ],
            datos:{
                formula: "",
                etapas: 12,
                tipoDeEtapa: "meses",
                titulo: "",
                unidadDeMedida: "",
                AceptacionBuena: "90",
                AceptacionMedia: "70",
                tipoIndicador: 0,
                "minimaEscala":0,
                "maximaEscala":0,
                "personaResponsable" : ""
            },
            objetivos: [],
            objetivosData:{
                'titulo' : "",
                'descripcion' : ""
            },
            rangos:[],
            jeraraquias: [],
            users:[],
            errors: {
                'formulaNoCoincideConVariables': false,
            },
            acciones:[],
            objetivoShow: true,
            objetivoSelect: false,
            etapas: [],
            allUsers:[]
        }
    }
    /**
     * 
     */
    componentDidMount()
    {   
        this.crearEtapas();
        this.traerDatos();
        this.creaFormula();
        TraeDatos({ url: this.props.urlAutentica, _self: this}, "allUsers");
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
     * 
     */
    traerDatos = async () =>
    {
        const [objetivos,jerarquias] = await Promise.all(
            [
                fetch(`${this.props.urlObjetivos}&action=view`),
                fetch(`${this.props.urlJerarquias}&action=view`)
            ]
        )
        const responseObjetivos = await objetivos.json();
        const responseJerarquias = await jerarquias.json();
        if(responseObjetivos.status && responseJerarquias.status){
            this.setState({
                objetivos: responseObjetivos.datos,
                jeraraquias: responseJerarquias.datos
            })
        }
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
            case 'etapa':
                this.handleChangeEtapas(e);
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
        const idEtapa = e.target.getAttribute("idEtapa");
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
        this.setState({
            objetivosData:{
                ...this.state.objetivosData,
                'titulo' : response.datos.titulo,
                'descripcion' : response.datos.descripcion
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
    handleChangeEtapas = async e => 
    {
        const idVariable = e.target.getAttribute("idvariable") - 1;
        const idEtapa = e.target.getAttribute("idetapa") -1;
        const nombreEtapa = e.target.name;
        let Valor = e.target.value;
        if(Valor.length === 0)
        {
            Valor = 0;
        }
        if(Valor === "-"){
            Valor = 0;
        }
        const nuevoStado = await this.handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa);
        this.setState(nuevoStado);
        if(nombreEtapa === `${idVariable}_${idEtapa+1}`)
        {
            let str = "var ";
            let cantidadDeVariables = this.state.variables.length;
            let contadorVariables = 0;
            this.state.variables.map(variable => {
                str += variable.nombre;
                str +=`=parseFloat(nuevoStado.variables[${variable.id-1}]['etapas'][idEtapa]['valor'])`;
                contadorVariables++;
                if(contadorVariables !== cantidadDeVariables)
                {
                    str += ",";
                }
            })
            let formulaString = this.state.datos.formula;
            if(formulaString.length === 0)
            {
                formulaString= undefined;
            }
            let _self = this;
            let codigoEnString =  `${str}
                                   try{
                                    var formula = ${formulaString};
                                    let porcentaje = formula;
                                    if(idVariable === 0){
                                        porcentaje = 100;
                                    }
                                    const variableValor = parseFloat(nuevoStado.variables[idVariable]['etapas'][idEtapa]['valor']);
                                    if(idVariable > 1 ){
                                        porcentaje = (100*variableValor)/Variable_1;
                                    }
                                    if(porcentaje === Infinity){
                                        porcentaje = 100;
                                    }
                                    nuevoStado.variables[idVariable]['etapas'][idEtapa]['porcentaje'] = porcentaje;
                                    _self.setState(nuevoStado)
                                   }catch(e)
                                   {
                                       _self.setState({
                                           errors:{
                                               ..._self.state.errors,
                                               formulaNoCoincideConVariables: true
                                           }
                                       })
                                   }
                                `
            eval(codigoEnString)
        }
        let formula = undefined;
        this.state.variables.map(variable=>{
            let idVariable = variable.id -1;
            let etapa = parseInt(nuevoStado.variables[idVariable].etapas[idEtapa].valor);
            let ideEtapa= idEtapa
            nuevoStado.variables[0].etapas.map(etapaEstadoUno =>{
                if(ideEtapa === etapaEstadoUno.idEtapa-1){
                        formula = (100*etapa)/etapaEstadoUno.valor;
                    }
                })
                if(formula === Infinity){
                    formula = 100;
                }
                nuevoStado.variables[idVariable].etapas[idEtapa].porcentaje = formula;
        })
    }
    /**
     * 
     */
    handleMantenerEtapas = (idVariable, idEtapa, Valor, nombreEtapa) => 
    {
        var nuevoStado = this.state;
        if(nombreEtapa === `${idVariable}_${idEtapa+1}`)
        {
            var Suma = 0;
            const Etapas = nuevoStado.variables[idVariable]['etapas'];
            Etapas[idEtapa]['valor'] = Valor;
            const valorPrincipalDePorcentaje = nuevoStado.variables[0]['etapas'][idEtapa]['valor'];
            for (let index = 0; index < Etapas.length; index++) {
                Suma = Suma + parseFloat(Etapas[index]['valor']);
            }
            nuevoStado.variables[idVariable]['valorTotal'] = Suma;
        }
        return nuevoStado;
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
        console.log(url)
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
                    <input type="text" name="titulo" onChange={this.handleChange} className="form-control" placeholder="Nombre - Titulo Indicador"/>
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
                        <input tipo="dataObjetivo" onChange={this.handleChange} className="form-control" placeholder="Titulo de objetivo" type="text" name="titulo" defaultValue={this.state.objetivosData.titulo}/>
                    </div>
                    <div className="col-12 mt-3">
                        <textarea className="form-control" tipo="dataObjetivo" onChange={this.handleChange} placeholder="Descripción del objetivo" name="descripcion" defaultValue={this.state.objetivosData.descripcion}></textarea>
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
                    <div className="col-8 row m-0">
                        <span className="col-12">Tipo de Indicador: </span> 
                        <select className="form-control col-4" name="tipoIndicador" onChange={this.handleChange}>
                            <option value="0">Resultados</option>
                            <option value="1">Comportamentable</option>
                            <option value="3">Personal</option>
                        </select>
                    </div>
                    {Responsables}
                    <div className="col-12 mt-3">
                        <input list="usuarios" type="text" className="form-control col-6" placeholder="Persona responsable del indicador" onChange={this.handleChange} name="personaResponsable"/>
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
                            <input type="text" key={etapa.idEtapa} onChange={this.handleChange} idetapa={etapa.idEtapa} tipo="etapaNombre" className="form-control col-3" placeholder={`Etapa ${etapa.idEtapa} nombre`} />
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
                                                return(<input type="number" placeholder="0" idetapa={etapa.idEtapa} onChange={this.handleChange} tipo="etapa" name={etapa.id} idvariable={variable.id} className={`col-2 form-control ${color}`} key={etapa.id} />)
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