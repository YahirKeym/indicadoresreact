import React from 'react';
import { Chart } from "react-google-charts";
import Loader from "../../components/Generales/Loader.js";
import DecodificaMalos from '../Generales/DecodificaMalos.js';
/**
 * El componente Grafica ayudara a la creación general de la grefica de barras en el perfil de cada indicador.
 * 
 * @param {*} props Propiedades del componente
 * @param {object} aGeneral Llevara los datos generales de la grafica 
 *      {
 *          aDatos: Serán los datos de la grafica, 
 *          cTitulo: El nombre de la grafica, 
 *          cUDM: Unidad de medida de la grafica
 *      }
 * @param {object} aEscala Llevara la escala minima y maxima de la grafica
 *      {
 *          iMinima: Escala minima de la grafica,
 *          iMaxima: Escala maxima de la grafica 
 *      }
 * @param {integer} iVariables Es la cantidad de variables con las que cuenta la grafica. 
 */
function Grafica(props){
    const {aDatos,cTitulo,cUDM}= props.aGeneral,
    {iMinima,iMaxima} = props.aEscala,
    iTotalDeVariables = props.iVariables;
    return(
        <Chart
            width="100%"
            height={300}
            chartType="ComboChart"
            loader={<Loader />}
            data={aDatos}
            options={{
                'title': DecodificaMalos(cTitulo),
                'chartArea': {
                    'width': "80%",
                    'backgroundColor': "rgba(0,0,0,0)"
                },
                'backgroundColor': {
                    'fill': "#000",
                    'fillOpacity': 0
                },
                'hAxis': {
                    'title': "Etapas",
                    'minValue': 0
                },
                'vAxis': {
                    'title': DecodificaMalos(cUDM),
                    'minValue': iMinima,
                    'maxValue': iMaxima
                },
                'animation': {
                    'startup': true,
                    'easing': 'linear',
                    'duration': 1200,
                },
                'seriesType': 'bars',
                'series': { [iTotalDeVariables]: { 'type': 'line' } },
                'colors': [
                    "#289c7c",
                    "#007bff",
                    "#dc3545",
                    "#000d42",
                    "#000",
                    "#633836",
                    "#485051",
                    "#a3371f",
                    "#c5674a",
                    "#6b3e3e",
                    "#472019",
                    "#f2dede",
                    "#438efa",
                    "#1f8c9d",
                    "#de2a97",
                    "#3b3b3b"
                ]
            }}
            chartEvents={[
                {
                    'eventName': 'animationfinish',
                    'callback': () => {
                        console.log('Animation Finished')
                    },
                },
                ]}
            legendToggle
        />
    )
}
export default Grafica;