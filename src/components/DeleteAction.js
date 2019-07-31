import React from 'react';
// Nos ayudara a eliminar un elemento, siempre y cuando sus peticiones sean similares a las que le dimos-
// Actualmente se ocupara objetivos y indicadores.
export default class DeleteAction extends React.Component
{
    // Se encarga de hacer la petición para eliminar el elemento.
    handleDelete = async (e) =>{
        e.preventDefault();
        const req = await fetch(`${this.props.url}&action=delete&id=${this.props.id}`);
        const response = await req.json();
        if(response.status && this.props.oneProfile){
            this.props.history.goBack();
        }
        if(response.status && !this.props.oneProfile)
        {
            this.props.history.push("/empty");
            this.props.history.goBack();
        }
    }
    // Renderizamos el Botón de eliminar
    render(){
        return (
                <button className="btn btn-danger ml-3" onClick={this.handleDelete}>eliminar</button>
            )
    }
}
