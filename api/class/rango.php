<?php
class Rango {
    /**
     * Guardara el objeto de conexion
     * @var object
     */
    private $oConexion = null;
    function __construct()
    {
        $oConexion = new Conexion();
        $this->oConexion = $oConexion->oConexion;
    }
    public function view()
    {
        $cQuery = "SELECT * FROM rangos";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus=[
            'status' => false,
            'error' => false,
        ];
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
            $iContadorRangos = 0;
            foreach ($oConsulta as $aDatos) {
                $aStatus['datos'][$iContadorRangos]['id'] = $aDatos['id'];
                $aStatus['datos'][$iContadorRangos]['nombre'] = $aDatos['nombre'];
                $aStatus['datos'][$iContadorRangos]['idJerarquia'] = $aDatos['idJerarquia'];
                $aStatus['datos'][$iContadorRangos]['agregaObjetivos'] = $aDatos['agregaObjetivos'];
                $aStatus['datos'][$iContadorRangos]['agregaMandos'] = $aDatos['agregaMandos'];
                $aStatus['datos'][$iContadorRangos]['agregaPais'] = $aDatos['agregaPais'];
                $aStatus['datos'][$iContadorRangos]['agregaJerarquias'] = $aDatos['agregaJerarquias'];
                $aStatus['datos'][$iContadorRangos]['agregaRangos'] = $aDatos['agregaRangos'];
                $iContadorRangos++;
            }
        }
        return json_encode($aStatus);
    }
    public function modify()
    {
        
    }
    /**
     * Agregaremos el rango que le solicitemos
     * @param array $aDatos Serán los datos del rango
     * @return string Regresara un string tipo Json el cual nos dirá si la consulta fallo o no.
     */
    public function add($aDatos = [])
    {
        $cQuery = "INSERT INTO rangos 
        (nombre,idJerarquia,agregaObjetivos,agregaMandos,agregaPais,agregaJerarquias,agregaRangos) 
        VALUES 
        ('{$aDatos['nombre']}',{$aDatos['jerarquia']},{$aDatos['agregaObjetivos']},{$aDatos['agregaMandos']},{$aDatos['agregaPais']},{$aDatos['agregaJerarquias']},{$aDatos['agregaRangos']})";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false
        ];
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    public function select()
    {

    }
    public function delete()
    {
        
    }
}