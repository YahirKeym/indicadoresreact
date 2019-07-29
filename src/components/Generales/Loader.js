import React from 'react';
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