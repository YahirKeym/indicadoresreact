import React from 'react';
class UserLogin extends React.Component
{
    handleSubmit(e)
    {
        e.preventDefault();
    }
    render()
    {
        return (
            <React.Fragment>
                <form>
                    <input name="nombre" type="text" />
                    <input name="password" type="password" />
                    <button onSubmit={this.handleSubmit} className="btn btn-success">Iniciar Sesión</button>
                </form>
            </React.Fragment>
        );
    };
}
export default UserLogin;