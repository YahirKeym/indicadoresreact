async function TraeDatos({url,_self}){
    try{
        const response = await fetch(`${url}&action=view`);
        const data = await response.json();
        if(data.datos === undefined){
            data.datos = [];
        }
        _self.setState(
            {
                loading: false,
                data: data.datos,
                error: false
            }
        );
    }catch(error){
        _self.setState({
            error: true,
            loading:false
        })
        _self.traeDatos = setTimeout(() => {
            TraeDatos({'url':url,'_self':_self})
        },5000)
    }
}
export default TraeDatos;