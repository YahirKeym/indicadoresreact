import React from "react";
function Formulario(props) {
  return (
    <form>
      {props.formulario.campos.map((campo) => {
        var $Elemento = "";
        switch (campo.tipo) {
          case "input":
            $Elemento = <input type={campo.type} name={campo.nombre} value={campo.valor} placeholder={campo.placeholder} />;
            break;
          case "select":
            $Elemento = <select> {campo.opciones.map(opcion => { <option value={opcion.valor}>{opcion.texto}</option> })} </select>;
            break;
          case "textarea":
            $Elemento = <textarea name={campo.nombre} placeholder={campo.placeholder}>{campo.valor}</textarea>
            break;
        }
      })}
    </form>
  );
}
export default Formulario;
