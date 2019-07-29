// Limpiara la codificación Java que lleva y transformara cada codigo encontrado en la cadena de texto que le pasemos a el acento correspondiente.
function LimpiaAcentosJava(cadena = ""){
    cadena = cadena.replace(/u00E1/gi,"á");
    cadena = cadena.replace(/u00C1/gi,"Á");
    cadena = cadena.replace(/u00E9/gi,"é");
    cadena = cadena.replace(/u00C9/gi,"É");
    cadena = cadena.replace(/u00ED/gi,"í");
    cadena = cadena.replace(/u00CD/gi,"Í");
    cadena = cadena.replace(/u00F3/gi,"ó");
    cadena = cadena.replace(/u00D3/gi,"Ó");
    cadena = cadena.replace(/u00D3/gi,"ú");
    cadena = cadena.replace(/u00DA/gi,"Ú");
    cadena = cadena.replace(/u00F1/gi,"ñ");
    cadena = cadena.replace(/u00D1/gi,"Ñ");
    // Regresa la cadena que pasamos inicialmente limpia con los acentos correspondientes
    return cadena;
}
// Exportamos la función para hacerla general.
export default LimpiaAcentosJava;