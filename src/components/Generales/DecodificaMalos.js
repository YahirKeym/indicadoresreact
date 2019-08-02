// Decodifica malos se encargara de decodificar a nuestro punto los caracteres especiales que envian por cadenas.
// Así cuando lo recibamos el sistema lo podra interpretas de manera correcta.
function DecodificaMalos(cadena){
    if(cadena !== undefined){
        cadena = cadena.replace(/comiDouble;/gi,'"');
        cadena = cadena.replace(/comiSingle;/gi,"'");
        cadena = cadena.replace(/openQuestion;/gi,"¿");
        cadena = cadena.replace(/closeQuestion;/gi,"?");
        cadena = cadena.replace(/u00e1/gi, "á");
        cadena = cadena.replace(/u00C1/gi, "Á");
        cadena = cadena.replace(/u00E9/gi, "é");
        cadena = cadena.replace(/u00C9/gi, "É");
        cadena = cadena.replace(/u00ED/gi, "í");
        cadena = cadena.replace(/u00CD/gi, "Í");
        cadena = cadena.replace(/u00f3/gi, "ó");
        cadena = cadena.replace(/u00D3/gi, "Ó");
        cadena = cadena.replace(/u00fa/gi, "ú");
        cadena = cadena.replace(/u00DA/gi, "Ú");
        cadena = cadena.replace(/u00F1/gi, "ñ");
        cadena = cadena.replace(/u00D1/gi, "Ñ");
        cadena = cadena.replace(/_/gi, " ");
        cadena = cadena.replace(/spaceString;/gi," ");
    }
    return cadena;
}
// Exportamos DecodificaMalos para poderlo usar en nuestra app.
export default DecodificaMalos;