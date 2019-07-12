import React from 'react';
export default class MandosProfile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            datos: {
                datos:{},
                objetivos:[]
            }
        }
    }
    componentDidMount()
    {
        this.traerDatos();
    }
    /**
     * Traera los datos de los objetivos y del mando.
     */
    traerDatos = async () =>{
        const [mando,objetivos]= await Promise.all([
            fetch(`${this.props.url}&action=select&id=${this.props.match.params.mandoId}`),
            fetch(`${this.props.urlObjetivos}&action=view`)
        ]);
        const responseMando = await mando.json();
        const responseObjetivos = await objetivos.json();
        if(responseMando.status && responseObjetivos)
        {
            this.setState({
                datos: responseMando.datos,
                objetivos: responseObjetivos
            })
        }
    }
    render()
    {
        return (
            <h1>PROFILE</h1>
        );
    }
}