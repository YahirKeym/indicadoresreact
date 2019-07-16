<?php
class Jerarquias
{
    /**
     * Guardara el objeto de conexión
     * @var object
     */
    private $oConexion = null;
    function __construct()
    {
        $oConexion = new Conexion();
        $this->oConexion = $oConexion->oConexion;
    }
    /**
     * Nos ayudara a traer todas las jerarquias existentes
     * @return void
     */
    public function view()
    {
        $cQuery = "SELECT * FROM general_area ORDER BY orden ASC";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
            $iContadorDeDatos = 0;
            foreach ($oConsulta as $aDatos) {
                $aStatus['datos'][$iContadorDeDatos]['id'] = $aDatos['IdArea'];
                $aStatus['datos'][$iContadorDeDatos]['nombre'] = $aDatos['Area'];
                $aStatus['datos'][$iContadorDeDatos]['orden'] = $aDatos['Orden'];
                $iContadorDeDatos++;
            }
        }
        
        return json_encode($aStatus);
    }
    /**
     * Actualizara los movimientos de los rangos
     * @param array $aDatos Serán los datos el cual traera la posición de cada jerarquia
     * @return string Regresara un string tipo Json el cual nos confirmara si fue ejecutada la consulta correctamente o no
     */
    public function updateMoves($aDatos = [])
    {
        $aStatus=[
            'status' => false
        ];
        foreach($aDatos as $aData)
        {
            $cQuery = "UPDATE general_area SET Orden={$aData['orden']} WHERE IdArea='{$aData['id']}'";
            $oConsulta = $this->oConexion->query($cQuery);
        }
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    /**
     * Agregara una jerarquia
     * @param array $aDatos serán los datos de la jerarquia
     * @return string Regresara un string tipo json si todo sale bien.
     */
    public function add($aDatos = [])
    {
        $cQuery = "INSERT INTO jerarquias (nombre) VALUES ('{$aDatos['nombre']}')";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($oConsulta != false){
            $cQueryTwo = "SELECT * FROM jerarquias ORDER BY id DESC LIMIT 1";
            $oConsultaTwo = $this->oConexion->query($cQueryTwo);
            if($oConsultaTwo != false)
            {
                $aData = $oConsultaTwo->fetch(PDO::FETCH_ASSOC);
                $cQueryTree = "UPDATE jerarquias SET orden={$aData['id']} WHERE id={$aData['id']}";
                $oConsultaTree = $this->oConexion->query($cQueryTree);
                if($oConsultaTree != false){
                    $aStatus['status'] = true;
                }
            }
        }
        return json_encode($aStatus);
    }
}
 
?>