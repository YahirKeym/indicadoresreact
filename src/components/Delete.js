import React from 'react';
function Delete(props)
{
    return (
        <div className="col-12 row">
            <div className="col-7 mx-auto">
                <h5>¿Estás seguro de eliminar a {this.state.deleted.nombre}?</h5>
            </div>
            <div className="col-7 mx-auto">
                <Link className="btn btn-success" to="/tipos/alcance">No</Link>
                <button className="btn btn-danger ml-3" onClick={this.handleDelete}>Si</button>
            </div>
        </div>
}