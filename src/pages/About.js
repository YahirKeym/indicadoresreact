import React from 'react';
function About(props){
    return(
        <React.Fragment>
            <div className="jumbotron row">
                <div className="col-12">
                    <h2>Guia Rápida:</h2>
                    <a href="http://172.16.100.196/indicadoresreact/guiarapida.pdf" target="_blank">Guia Rápida</a>
                </div>
                <div className="col-12">
                     <h2>Soporte:</h2>
                     <h4>Yahir Axel Garcia Keymurth</h4>
                     <h5><i>5237-3806</i></h5>
                     <h4>Claudia Cardenas</h4>
                     <h5><i>5237-3817</i></h5>
                </div>
            </div>
        </React.Fragment>
    )
}
export default About;