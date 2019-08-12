import React from 'react';
import CuerpoObjetivosMandos from '../../components/Mandos/CuerpoObjetivosMandos.js';
import Loader from '../../components/Generales/Loader.js';
import ButtonDirectTop from '../../components/Generales/ButtonDirectTop.js';
import SinDatos from '../../components/Errores/SinDatos.js';
import ErrorConexion from '../../components/Errores/ErrorConexion.js';
import TraeDatos from '../../components/TraeDatos.js';
import BuscadorIncremental from '../../components/Generales/BuscadorIncremental.js';
// Pintara todos los objetivos disponibles por usuario.
class Objetivos extends React.Component
{
    // Iniciaremos el constructor para poder declarar el estado de inicio.
    constructor(props)
    {
        super(props);
        this.state ={
            loading: true,
            data: [],
            error: false,
        };
    }
    // Al montar el componente mandaremos a llamar a los objetivos disponibles para el usuario
    // Para luego colocarlos en el estado y así poder montar nuestro componente de manera correcta
    // con los datos que solicitamos
    componentDidMount()
    {
        TraeDatos({url: this.props.url, _self: this});
    }
    // Si llegase a ser el caso de que el usuario sale  del componente antes de que la petición a los datos termine 
    // Este limpiara el intervalo del tiempo para no generar error alguno o bien un consumo excesivo de memoria
    componentWillUnmount(){
        clearTimeout(this.traeDatos)
    }
    // Renderizamos el componente con los subcomponentes que ocuparemos para ello.
    render()
    {
        if(this.state.loading){ // En caso de que el componente se encuentre cargando mandamos a llamar el Loader
            return (
                <Loader />
            );
        }
        if (this.state.error){ // En caso de que la petición le haya generado algún error al usuario, mandaremos a llamar el error de conexión
            return (
                <ErrorConexion />
            );
        }
        this.buscadorTime = setTimeout(()=>{BuscadorIncremental({claseCorrecta: "d-block",claseIncorrecta:"d-none",buscador: "buscaObjetivos",seBusca:"objetives"})},1000);
        return ( // Si todo salió bien, renderizaremos los objetivos del usuario
            <div className="col-12 row">
                <ButtonDirectTop to="/objetivos/add" text="Añadir objetivo" />
                <div className="col-12 row d-flex justify-content-between">
                    {this.state.data.length === 0 && ( // En caso de que el usuario no cuente con datos, le mandaremos el componente de que no cuenta con datos
                        <SinDatos />
                    )}
                    <div className="col-12">
                        <input name="buscaObjetivos" type="text" className="form-control mb-3 col-6" placeholder="Buscar objetivo" />
                    </div>
                    <div className="col-12 row" search-name="objetives">
                        {this.state.data.map(objetivo => { // Si el usuario si llegase a tener datos, hacemos un mapping de ellos y los mostramos.
                            return(
                                <CuerpoObjetivosMandos titulo={objetivo.titulo} textSuccess="Editar" 
                                url={`/objetivos/${objetivo.id}/edit`} 
                                Delete={this.props.url}
                                descripcion={objetivo.descripcion} 
                                id={objetivo.id}
                                history={this.props.history}
                                key={objetivo.id}>
                                    <div className="col-12 mt-3">
                                        <p>Inicia: <span>{objetivo.inicia}</span></p>
                                        <p>Finaliza: <span>{objetivo.finaliza}</span></p>
                                    </div>
                                </CuerpoObjetivosMandos>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Objetivos;