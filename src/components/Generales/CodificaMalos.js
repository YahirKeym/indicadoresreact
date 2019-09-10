/**
 * La función CodificaMalos traspasará elementos que afecten a la estructura de la web
 * a una codificiación ingresada por uno mismo. Esto se hace para evitar fallos de 
 * interpretación.
 * @param {string} cCadena Será la codificación que usaremos. 
 */
function CodificaMalos(cCadena ){
    cCadena = cCadena.replace(/"/gi,"comiDouble;");
    cCadena = cCadena.replace(/'/gi,"comiSingle;");
    cCadena = cCadena.replace(/¿/gi,"openQuestion;");
    cCadena = cCadena.replace(/\t/gi," ");
    cCadena = cCadena.replace(/ /gi,"spaceString;")
    return cCadena;
}
// Exportamos CodificaMalos para poderlo usar en nuestra app.
export default CodificaMalos;