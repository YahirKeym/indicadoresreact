/**
 * La función OtorgaNombres ayudara a darle un nombre a cada etapa mediante lo que
 * el usuario haya escrito, así facilitara la creación de cada indicador
 * @param {object} OBJETO  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 * @param {array} aNombres Será el arreglo de nombres el cual le pasaremos para
 * autocompletar el formulario. 
 */
function OtorgaNombres(OBJETO,lugarDeDatos, aNombres){
    lugarDeDatos.variables[0].etapas.map(etapa => {
        aNombres.map(mes => {
            if(mes.id === etapa.idEtapa){
                lugarDeDatos.variables[0].etapas[etapa.idEtapa-1]['nombre'] = mes.nombre;
            }
        })
    })
    OBJETO.setState(lugarDeDatos);
}
export default OtorgaNombres;