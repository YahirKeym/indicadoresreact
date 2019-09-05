import React from 'react';
class UserLogin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            usuario: '',
            password: '',
            changePass: false,
            newPassword: '',
            id:0
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
        let req;
        if(this.state.changePass){
            req = await fetch(`${this.props.url}&action=changePassword&pwd=${this.state.newPassword}&id=${this.state.id}`);
        }else{
            req = await fetch(`${this.props.url}&action=valida&data=${datosState}`);
        }
        const response = await req.json();
        if(response.status)
        {
            document.cookie = `indicadores_i=${response.cookie}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;`;
            if(response.changePass){
                this.setState({
                    changePass: true,
                    id: response.idUs
                })
            }else{
                window.location.reload();
            }                
        }
    }
    /**
     * Renderizara el formulario de Login de la web
     */
    render()
    {
        let accion,texto,primerInput,segundoInput,buttonText;
        accion = this.handleChange;
        if(this.state.changePass){
            texto = "Cambia tu contraseña";
            buttonText = "Cambiar contraseña"
            primerInput = (
                <React.Fragment>
                    <p className="col-12">Nueva contraseña</p>
                    <input name="newPassword" onChange={accion} className="form-control col-10" placeholder="Nueva contraseña" type="text" defaultValue=""/>
                </React.Fragment>
            );
            segundoInput = ""
        }else{
            texto = "Inicia sesión";
            buttonText = "Iniciar sesión"
            primerInput = (
                <input name="usuario" onChange={accion} className="form-control col-10" placeholder="Usuario" type="text" />
            );
            segundoInput = (
                <input name="password" onChange={accion} className="form-control col-10" placeholder="Password" type="password" />
            )
        }
        return (
            <React.Fragment>
                <form className="p-3 row col-12 col-lg-3 mx-auto">
                    <div className="col-12 d-flex justify-content-center">
                        <h4>{texto}</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center row">
                        {primerInput}
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center row">
                        {segundoInput}
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                        <button  onClick={this.handleSubmit} className="btn btn-success">{buttonText}</button>
                    </div>
                </form>
            </React.Fragment>
        );
    };
}
export default UserLogin;