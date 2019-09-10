/**
 * La función DecodificaMalos se encarga de decodificar caracteres echos por nuestra
 * misma codificación o bien que se integren como tipo caracteres especiales en 
 * codificación Java.
 * @param {string} cCadena Es el texto que decodificaremos
 */
function DecodificaMalos(cCadena){
    if(cCadena !== undefined){
        cCadena = cCadena.replace(/comiDouble;/gi,'"');
        cCadena = cCadena.replace(/comiSingle;/gi,"'");
        cCadena = cCadena.replace(/openQuestion;/gi,"¿");
        cCadena = cCadena.replace(/closeQuestion;/gi,"?");
        cCadena = cCadena.replace(/u00e1/gi, "á");
        cCadena = cCadena.replace(/u00C1/gi, "Á");
        cCadena = cCadena.replace(/u00E9/gi, "é");
        cCadena = cCadena.replace(/u00C9/gi, "É");
        cCadena = cCadena.replace(/u00ED/gi, "í");
        cCadena = cCadena.replace(/u00CD/gi, "Í");
        cCadena = cCadena.replace(/u00f3/gi, "ó");
        cCadena = cCadena.replace(/u00D3/gi, "Ó");
        cCadena = cCadena.replace(/u00fa/gi, "ú");
        cCadena = cCadena.replace(/u00DA/gi, "Ú");
        cCadena = cCadena.replace(/u00F1/gi, "ñ");
        cCadena = cCadena.replace(/u00D1/gi, "Ñ");
        cCadena = cCadena.replace(/u00b4/gi, "´");
        cCadena = cCadena.replace(/_/gi, " ");
        cCadena = cCadena.replace(/spaceString;/gi," ");
    }
    return cCadena;
}
// Exportamos DecodificaMalos para poderlo usar en nuestra app.
export default DecodificaMalos;