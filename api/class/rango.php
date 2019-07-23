<?php
class Rango {
    /**
     * Guardara el objeto de conexion
     * @var object
     */
    private $oConexion = null;
    function __construct($oConexion = null)
    {
        $this->oConexion = $oConexion->oConexion;
    }
    public function view()
    {
        $cQuery = "SELECT * FROM general_departamento";
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
                $aStatus['datos'][$iContadorRangos]['id'] = $aDatos['IdDepto'];
                $aStatus['datos'][$iContadorRangos]['nombre'] = $aDatos['Departamento'];
                $aStatus['datos'][$iContadorRangos]['idJerarquia'] = $aDatos['IdArea'];
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
    public function selectForMandos($cId = "")
    {
        $cQuery = "SELECT IdDepto,IdArea,Departamento FROM general_departamento WHERE IdArea='{$cId}'";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => [],
        ];
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
            $iContadorDeDatos = 0;
            foreach ($oConsulta as $aDatos) {
                $aStatus['datos'][$iContadorDeDatos]['nombre'] = $aDatos['Departamento'];
                $aStatus['datos'][$iContadorDeDatos]['id'] = $aDatos['IdDepto'];
                $aStatus['datos'][$iContadorDeDatos]['idArea'] = $aDatos['IdArea']; 
                $iContadorDeDatos++;
            }
        }
        return json_encode($aStatus);
    }
    public function delete()
    {
        
    }
}