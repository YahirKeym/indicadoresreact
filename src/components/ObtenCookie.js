// Buscara la cookie que le pidamos limpiando la cadena que regresa document.cookie
// Si existe la cookie nos devolverá el valor de esta, en caso de no existir regresara una cadena vacía
function ObtenCookie(nombreCookie){
    var name = nombreCookie + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export default ObtenCookie;