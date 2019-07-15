import React from 'react';
import './styles/MandosAdd.css';
function Formula(props){
    var _self= props.this;
    let onChange = props.onChange
    if(_self.state.errors.formulaNoCoincideConVariables)
    {
        return(
            <div className="row col-12">
            <div className="col-6">
                <input className="form-control is-invalid" onChange={onChange} name="formula" type="text" defaultValue={_self.state.datos.formula} placeholder="Formula etapas" />
            </div>
        </div>
        ) 
    }
    return(
        <div className="row col-12">
            <div className="col-6">
                <input className="form-control" onChange={onChange} name="formula" type="text" defaultValue={_self.state.datos.formula} placeholder="Formula etapas" />
            </div>
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
                objetivo: "",
                formula: "(100*Variable_2)/Variable_1",
                etapas: 12,
                tipoDeEtapa: "meses",
                titulo: "",
                unidadDeMedida: "",
                AceptacinBuena: "",
                AceptacionMedia: "",
                AceptacionMala: "",
            },
            objetivos: [],
            rangos:[],
            errors: {
                'formulaNoCoincideConVariables': false,
            }
        }
    }
    /**
     * 
     */
    componentDidMount()
    {   
        this.crearEtapas();
        this.traerDatos();
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
                        procentajeApp: 100
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
            variables:$aVariables
        })
    }
    /**
     * 
     */
    traerDatos = async () =>
    {
        const [objetivos,rangos] = await Promise.all(
            [
                fetch(`${this.props.urlObjetivos}&action=view`),
                fetch(`${this.props.urlRangos}&action=view`)
            ]
        )
        const responseObjetivos = await objetivos.json();
        const responseRangos= await rangos.json();
        if(responseObjetivos.status && responseRangos){
            this.setState({
                objetivos: responseObjetivos.datos,
                rangos: responseRangos.datos
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
        if(e.target.getAttribute("tipo") === "variable")
        {
            this.handleChangeVariable(e);
        }else if(e.target.getAttribute("tipo") === "etapa"){
            this.handleChangeEtapas(e);
        }else{
            const nombre = e.target.name;
            var valor = e.target.value;
            if(valor.length === 0)
            {
                valor = 1;
            }
            if(nombre === "etapas" && valor > 500)
            {
                valor = 500;
            }
            const Estado = await this.setState({
                datos:{
                    ...this.state.datos,
                    [nombre] : valor
                }
            })
            if(nombre === "etapas")
            {
                const Etapas = await this.crearEtapas();
            }
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
        var Valor = e.target.value;
        if(Valor.length === 0)
        {
            Valor = 0;
        }
        const nuevoStado = await this.handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa);
        this.setState(nuevoStado);
        if(nombreEtapa === `${idVariable}_${idEtapa+1}`)
        {
            var str = "var ";
            var cantidadDeVariables = this.state.variables.length;
            var contadorVariables = 0;
            this.state.variables.map(variable => {
                str += variable.nombre;
                str +=`=parseInt(nuevoStado.variables[${variable.id-1}]['etapas'][idEtapa]['valor'])`;
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
            var pruebaEval =  `${str}
                                   try{
                                    var formula = ${formulaString};
                                    let porcentaje = formula;
                                    if(idEtapa === 0 && idVariable === 0){
                                        porcentaje = 100;
                                    }
                                    nuevoStado.variables[idVariable]['etapas'][idEtapa]['porcentaje'] = porcentaje;
                                    this.setState(nuevoStado)
                                   }catch(e)
                                   {
                                       this.setState({
                                           errors:{
                                               ...this.state.errors,
                                               formulaNoCoincideConVariables: true
                                           }
                                       })
                                   }
                                `
            eval(pruebaEval)
        }
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
            // var porcentaje = (100*Valor)/valorPrincipalDePorcentaje;
            // if(idEtapa === 0 && idVariable === 0){
            //     porcentaje = 100;
            // }
            // Etapas[idEtapa]['porcentaje'] = porcentaje;
            for (let index = 0; index < Etapas.length; index++) {
                Suma = Suma + parseInt(Etapas[index]['valor']);
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
    }
    /**
     * Nos ayudara a agregar más variables de así requerirlo
     */
    handleAddVariable = (e) =>
    {
        e.preventDefault();
        this.setState(
            {
                variables:[
                    ...this.state.variables,
                    {
                        ...this.state.variables[1],
                         id: this.state.variables.length +1,
                         nombre: `Variable ${this.state.variables.length + 1}`
                    }
                ]
            }
        )
    }
    /**
     * 
     */
    handleQuitVariable = e => 
    {
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
    handleAddMando = async e =>
    {
        e.preventDefault();
        
        const cambioEstado = await this.setState({
            datos:{
                ...this.state.datos,
                rangos:[]
            }
        })
        const asignaValores = await this.asignarValores();
        const Datos = JSON.stringify(this.state);
        const req = await fetch(`${this.props.url}&action=add&data=${Datos}`);
        const response = await req.json();
    }
    /**
     * Asignara los valores de los rangos y de las vriables
     */
    asignarValores = () =>{
        const $Rangos = document.querySelectorAll("select [rango]");
        var aRangos = [];
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
        this.setState({
            datos:{
                ...this.state.datos,
                rangos: aRangos
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
        return (
            <form className="row col-12 col-lg-9 mx-auto p-3">
                <div className="col-12">
                    <input type="text" name="titulo" onChange={this.handleChange} className="form-control" placeholder="Nombre - Titulo Indicador"/>
                </div>
                <div className="col-12 col-lg-8 mt-3">
                    <select className="form-control" name="objetivo" onChange={this.handleChange}>
                        <option>Selecciona el objetivo</option>
                        {this.state.objetivos.map(objetivos => {
                            return (<option value={objetivos.id} key={objetivos.id}>{objetivos.titulo}</option>);
                        })}
                    </select>
                </div>
                <div className="col-12 mt-3 row">
                    {this.state.variables.map(variable=>
                    {
                        return (
                        <div className="col-12 col-lg-4 mt-2" key={variable.id}>
                            <input className="form-control" type="text" onChange={this.handleChange} tipo="variable" id={variable.id} name={`variable_${variable.id}`} placeholder={`variable ${variable.id}`} />
                        </div>)
                    })}
                    <div className="col-12 col-lg-4 mt-2">
                        <button onClick={this.handleAddVariable} className="btn btn-success">+</button>
                        {this.state.variables.length > 2 && (
                            <button onClick={this.handleQuitVariable} className="btn btn-danger ml-2">-</button>
                        )}
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Formula this={this} onChange={this.handleChange}/>
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-12">
                        <label htmlFor="etapas">Etapas que tendra este mando </label>
                    </div>
                    <div className="col-12 col-lg-6">
                        <select className="form-control" name="tipoDeEtapa" onChange={this.handleChange} defaultValue="meses">
                            <option value="dias">Días</option>
                            <option value="meses">Meses</option>
                            <option value="anios">Años</option>
                        </select>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <input type="number" max="500" min="1" onChange={this.handleChange} className="form-control" name="etapas" defaultValue={this.state.datos.etapas}/>
                    </div>
                    <div className="col-6 mt-3">
                        <select multiple className="form-control" name="rangos">
                            {this.state.rangos.map(rango => {
                                return(<option rango="true" value={rango.id} key={rango.id}>{rango.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <div className="col-6 mt-3">
                        <select multiple className="form-control" name="rangos">
                            {this.state.rangos.map(rango => {
                                return(<option rango="true" value={rango.id} key={rango.id}>{rango.nombre}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12 row mt-3">
                    <div className="col-6">
                        <div className="col-12">
                            <label htmlFor="unidadDeMedida">UDM</label>
                        </div>
                        <input type="text" placeholder="Unidad de medida" className="form-control" name="unidadDeMedida"/>
                    </div>
                    <div className="col-6 row">
                        <div className="col-12">
                            <label htmlFor="AceptacionBuena">Aceptación %</label>
                        </div>
                        <div className="col-4">
                            <input type="number" min="1" name="AceptacionBuena" className="form-control border border-success" placeholder="Buena" />
                        </div>
                        <div className="col-4">
                            <input type="number" min="1" name="AceptacionMedia" className="form-control border border-warning" placeholder="Media" />
                        </div>
                        <div className="col-4">
                            <input type="number" min="1" name="AceptacionMala" className="form-control border border-danger"  placeholder="Mala" />
                        </div>
                    </div>
                </div>
                <div className="col-12 row mt-3 m-0">
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
                                                return(<input type="number" idetapa={etapa.idEtapa} onChange={this.handleChange} tipo="etapa" name={etapa.id} idvariable={variable.id} className="col-1 form-control" key={etapa.id} />)
                                            })}
                                        </div>
                                        <div className="col-12 col-lg-4 text-center">
                                            <h5>{variable.nombre}: <span style={{fontWeight:100}}>{variable.valorTotal}</span></h5>
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