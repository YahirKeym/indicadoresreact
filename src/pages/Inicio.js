import React from 'react';
import {Helmet} from 'react-helmet';

class Inicio extends React.Component {
    render() {
        return (
            <div className="container jumbotron">
                <Helmet>
                    <title>Indicadores - Inicio</title>
                </Helmet>
                <h1 className="text-center ">Indicadores</h1>
                <div className="text-indicadores text-justify">
                    <p>Los indicadores de desempeño son instrumentos que proporcionan información cuantitativa sobre el desenvolvimiento y logros de la empresa a favor de la población u objeto de su intervención, en el marco de sus objetivos estratégicos y su misión. Los indicadores de desempeño establecen una relación entre dos o más variables, que al ser comparados con periodos anteriores, productos similares o metas establecidas, permiten realizar inferencias sobre los avances y logros de la institución y sus programas.</p>
                </div>
            </div>
        );
    }
}
export default Inicio;