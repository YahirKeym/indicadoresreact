<?php 
/**
 * @author Yahir Axel Garcia Keymurth <arzkaner@gmail.com>
 */
class Alcance
{
    /**
     * Nos ayudara a guardar el objeto de conexión
     * @var object
     */
    private $oConexion = null;
    function __construct()
    {
        $oConexion = new Conexion();
        $this->oConexion = $oConexion->oConexion;    
    }
    /**
     * Nos ayudara a agregar un alcance si así se desea
     * @param array $aDatos
     * @return string Regresara un string tipo Json si fue exitoso o no la transación
     */
    public function addAlcance($aDatos = [])
    {
        $cQuery = "INSERT INTO alcance (nombre,nombreinterno) VALUES ('{$aDatos['nombre']}','{$aDatos['nombreinterno']}')";
        $oConsulta = $this->oConexion->query($cQuery);
        $aEstatus = [
            'status' => false,
        ];
        if($oConsulta != false)
        {
            $aEstatus['status'] = true;
        }
        return json_encode($aEstatus);
    }
    /**
     * Nos traera los alcances
     * @return string Regresara un string tipo Json con los datos si fue exitosa o no la consulta
     */
    public function viewAlcance()
    {
        $cQuery = "SELECT * FROM alcance";
        $oConsulta = $this->oConexion->query($cQuery);
        $iContadorDeAlcance = 0;
        $aDatos = [
            'status'=> false,
            'datos'=> []
        ];
        if ($oConsulta != false) {
            $aDatos['status'] = true;
            foreach($oConsulta as $aDatos){
                $aDatos['datos'][$iContadorDeAlcance]['id'] = $aDatos['id'];
                $aDatos['datos'][$iContadorDeAlcance]['nombre'] = $aDatos['nombre'];
                $aDatos['datos'][$iContadorDeAlcance]['nombreinterno'] = $aDatos['nombreinterno'];
            }
        }
        return json_encode($aDatos);
    }
}

?>