import React from 'react';
class UserLogin extends React.Component
{
    handleSubmit = e => 
    {
        e.preventDefault();
    }
    render()
    {
        return (
            <React.Fragment>
                <form className="p-3 row col-12 col-lg-3 mx-auto">
                    <div className="col-12 d-flex justify-content-center">
                        <h4>Inicia sesión</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <input name="nombre" className="form-control col-10" placeholder="Usuario" type="text" />
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                        <input name="password" className="form-control col-10" placeholder="Password" type="password" />
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