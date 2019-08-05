// Es una función asyncrona que nos traera los datos de la url que le pidamos siempre y cuando su acción sea "View"
// También los insertara en el lugar donde le digamos y por automatico nos pintara error de haberlo
// y quitara el loading
async function TraeDatos({url,_self},lugar = "",action = "",callBack){
    if(action === undefined){
        action = "";
    }
    if(action.length === 0){
        action = "view";
    }
    try{
        const response = await fetch(`${url}&action=${action}`);
        const data = await response.json();
        if(data.datos === undefined){
            data.datos = [];
        }
        if(lugar.length === 0)
        {
            lugar = "data";
        }
        if(data.status){
            _self.setState(
                {
                    loading: false,
                    [lugar]: data.datos,
                    error: false
                }
            );
        }
        if(callBack !== undefined){
            callBack(_self,_self.state.data);
        }
    }catch(error){
        _self.setState({
            error: true,
            loading:false
        })
        // _self.traeDatos = setTimeout(() => {
        //     TraeDatos({'url':url,'_self':_self})
        // },5000)
    }
}
export default TraeDatos;