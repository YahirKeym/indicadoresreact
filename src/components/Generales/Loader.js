import React from 'react';
/**
 * Será el componente que marcara un spinner para saber que la web está trabajando
 */
 function Loader()
 {
     return (
       <div className="col-12 text-center">
         <div className="spinner-border" role="status">
           <span className="sr-only">Cargando...</span>
         </div>
       </div>
     );
 }
 export default Loader;