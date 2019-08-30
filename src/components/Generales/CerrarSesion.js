import React from 'react';
export default class CerrarSesion extends React.Component{
    /**
     * Cerrara la sesión y cambiara la cookie automaticamente
     */
    handleCloseSession = async e => {
        const url = `http://172.16.100.196/indicadoresreact/api/controller/autentica.php?`;
        e.preventDefault();
        const req = await fetch(`${url}action=close`);
        const response = await req.json();
        if(response.status)
        {
            document.cookie =  `indicadores_i=${response.cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; 
            window.location.reload();
        }
        return false
    }
    /**
     * Renderizara el boton para cerrar la sesión en la web
     */
    render(){
        return(
            <a className={this.props.className} href="/cerrarSesion" onClick={this.handleCloseSession}>Cerrar Sesión</a>
        );
    }
}