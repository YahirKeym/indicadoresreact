import React from 'react';
export default class JerarquiaRangoEdit extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            datos: {
                nombre:'',
                jerarquia:0,
                agregaObjetivos: false,
                agregaMandos:false,
                agregaPaises:false,
                agregaJerarquias:false,
                agregaRangos:false
            }
        }
    }
    render()
    {
        return (
            <h1>edit rank</h1>
        );
    }
}