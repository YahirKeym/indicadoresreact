// Codifica malos se encargara de codificar a nuestro punto los caracteres especiales que envian por cadenas.
// Así cuando lo recibamos el sistema lo podra interpretas de manera correcta.
function CodificaMalos(cCadena ){
    cCadena = cCadena.replace(/"/gi,"comiDouble;");
    cCadena = cCadena.replace(/'/gi,"comiSingle;");
    cCadena = cCadena.replace(/¿/gi,"openQuestion;");
    return cCadena;
}
// Exportamos CodificaMalos para poderlo usar en nuestra app.
export default CodificaMalos;