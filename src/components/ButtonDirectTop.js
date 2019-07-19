import React from 'react';
import {Link} from 'react-router-dom';
function ButtonDirectTop(props){
    return(
        <div className="col-12 row d-flex justify-content-center mb-3">
            <Link to={props.to} className="col-4 btn btn-success">{props.text}</Link>
        </div>
    )
}

export default ButtonDirectTop;