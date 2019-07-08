import React from 'react';
import {Link} from 'react-router-dom';
class Mandos extends React.Component{
    render()
    {
        return (
            <React.Fragment>
                <Link to="/mandos/add" className="btn btn-success">Añadir nuevo mando</Link>
            </React.Fragment>
        );
    }
}
export default Mandos;