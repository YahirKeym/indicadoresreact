import React from 'react';
class UserLogin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            usuario: '',
            password: ''
        }
    }
    /**
     * Se encargara de guardar los camibios del estado del formulario
     */
    handleChange = e => {
        const nombre = e.target.name;
        const valor = e.target.value;
        this.setState({
            [nombre] : valor
        })
    }
    /**
     * Se encargara de enviar le formulario al api de la web
     */
    handleSubmit = async e => 
    {
        e.preventDefault();
        const datosState = JSON.stringify(this.state);
        const req = await fetch(`${this.props.url}&action=valida&data=${datosState}`);
        const response = await req.json();
        if(response.status)
        {
            document.cookie = `indicadores_i=${response.cookie}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;`; 
            window.location.reload();
        }
    }
    /**
     * Renderizara el formulario de Login de la web
     */
    render()
    {
        return (
            <React.Fragment>
                <form className="p-3 row col-12 col-lg-3 mx-auto">
                    <div className="col-12 d-flex justify-content-center">
                        <h4>Inicia sesión</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <input name="usuario" onChange={this.handleChange} className="form-control col-10" placeholder="Usuario" type="text" />
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                        <input name="password" onChange={this.handleChange} className="form-control col-10" placeholder="Password" type="password" />
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                        <button  onClick={this.handleSubmit} className="btn btn-success">Iniciar Sesión</button>
                    </div>
                </form>
            </React.Fragment>
        );
    };
}
export default UserLogin;