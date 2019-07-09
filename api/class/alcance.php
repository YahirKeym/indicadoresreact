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
     * Nos ayudara a añadir alcances
     * @param array $aDatos Serán los datos del alcance: ejem. nombre y nombre interno
     * @return string tipo Json dando la respuesta de si se pudo o no completar la acción
     */
    public function addAlcance($aDatos = [])
    {
        $iContadorDeElementos = 0;
        $iContadorDeNoVacios = 0;
        foreach($aDatos as $cNombre){
            if (!empty($cNombre)) {
                $iContadorDeNoVacios++;
            }
            $iContadorDeElementos++;
        }
        $aEstatus = [
            'status' => false,
            'empty' => true,
            'repetido' => false,
            'nombre' => '',
            'error' => false,
        ];
        $cQueryRepetido = "SELECT nombre FROM alcance WHERE nombreinterno='{$aDatos['nombreinterno']}' LIMIT 1";
        $oConsultaRepetido = $this->oConexion->query($cQueryRepetido);
        if($oConsultaRepetido->rowCount() != 0 )
        {
            $aEstatus['repetido'] = true;
            $aConsulta = $oConsultaRepetido->fetch(PDO::FETCH_ASSOC);
            $aEstatus['nombre'] = $aConsulta['nombre'];
        }else{
            if($iContadorDeElementos === $iContadorDeNoVacios)
            {
                $cQuery = "INSERT INTO alcance (nombre,nombreinterno) VALUES ('{$aDatos['nombre']}','{$aDatos['nombreinterno']}')";
                $oConsulta = $this->oConexion->query($cQuery);
                $aEstatus['status'] = true;
                $aEstatus['empty'] = false;
                if(!$oConsulta)
                {
                    $aEstatus['status'] = false;
                    $aEstatus['error'] = true;
                }
            }
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
            'datos'=> null,
        ];
        if ($oConsulta != false) {
            $aDatos['status'] = true;
            foreach($oConsulta as $aDatosDeConsulta){
                $aDatos['datos'][$iContadorDeAlcance]['id'] = $aDatosDeConsulta['id'];
                $aDatos['datos'][$iContadorDeAlcance]['nombre'] = $aDatosDeConsulta['nombre'];
                $aDatos['datos'][$iContadorDeAlcance]['nombreinterno'] = $aDatosDeConsulta['nombreinterno'];
                $iContadorDeAlcance++;
            }
        }
        return json_encode($aDatos);
    }
}

?>