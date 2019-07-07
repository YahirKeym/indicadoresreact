import React from 'react';

class Ancla extends React.Component
{
    render()
    {
        return (
            <a href={this.props.cUrl} className={this.props.cClases}>{this.props.cContenido}</a>
        );
    }
}
export default Ancla;