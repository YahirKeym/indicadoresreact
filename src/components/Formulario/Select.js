import React from "react";
import ChangeData from "./ChangeData";
/**
 * La función GeneraOption se encarga de generar opciones para el componente select
 * @param {array} aElementos Son los elementos es el arreglo de elementos el cual trae los datos del objeto 
 * @param {string} cValor Es el valor que se tomara para el valor del 
 * @param {string} cOpcion Será la opción a mostrar como titulo de la etiqueta
 * @param {*} cTitulo  Será la opción a mostrar como titulo de la etiqueta
 */
function GeneraOption(aElementos,cValor,cOpcion,cTitulo){
    return (
        aElementos.map((elemento,xId) => {
            let seMuestra;
            seMuestra = elemento[cOpcion]
            if(cTitulo === undefined){
                cTitulo = "";
            }
            if(cTitulo.length === 0){
                cTitulo = "titulo";
            }
            if(elemento.titulo !== undefined){
                seMuestra = elemento[cTitulo];
            }
            return (
                <option value={elemento[cValor]} key={xId}>{seMuestra}</option>
                )
            }
        )
    )
}
/**
 * El componente select armara un select con las opciones que nosotros le pasemos como arreglo
 * Esto hará que cambie el valor en el lugar donde le indiquemos del estado de la aplicación.
 * @param {properties} props Son las propiedades del componente.
 * @param {object} datos En los datos van las propiedades de cambio. 
 *      {
 *          _self: Es el objeto en si mismo (this, objeto),
 *          lugar: Es el lugar o bien el objeto donde se ingresa. (this.state),
 *          zona: Es la zona/llave dentro del objeto que modificaremos. ("NombreX")
 *      }
 * @param {array} elementos Son los elementos que se repetiran como opciones
 * @param {boolean} callback Será verdadero/true si se usara un callback y será falso/false si no
 * @param {function} function Si callback se encuentra en true, se tiene que mandar a llamar una función
 * aquí irá esa función que se mandara a llamar una vez haya sido seleccionado x elemento.
 * @param {string} plhold Será el primer elemento o bien la primera opción disable que llevara el select.
 * @param {string} className Son las clases que afectaran directamente al select.
 * @param {string} valor El valor es lo que se quiere tomar del array de datos para pasarlo como valor al lugar que le dictamos
 * del estado
 * @param {string} opcion La opción será la que se tomara para el titulo de los select.
 * @param {string} titulo El titulo será la que se tomara para el titulo de los select.
 */
function Select(props){
    const {_self,lugar,zona} = props.datos,
    aElementos = props.elementos,
    lCallback = props.callback,
    fCallFunction = props.function,
    cPlaceholder=props.plhold,
    cClassName=props.className,
    cValor = props.valor,
    cOpcion = props.opcion,
    cTitulo = props.titulo;
    return(
        <select className={`form-control ${cClassName}`} onChange={
            e=> {
                if(lCallback){
                    fCallFunction(e);
                }else{                    
                    ChangeData(e,_self,lugar,zona);
                }
            }
        }>
            <option>{cPlaceholder}</option>
           {GeneraOption(aElementos,cValor,cOpcion,cTitulo)}
        </select>
    )
}
export default Select;  