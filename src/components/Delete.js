import React from 'react';
export default class DeleteAction extends React.Component
{
    constructor(props){
        super(props);
    }
    handleDelete = async () =>{
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
    render(){
        return (
                <button className="btn btn-danger ml-3" onClick={this.handleDelete}>eliminar</button>
            )
    }
}
