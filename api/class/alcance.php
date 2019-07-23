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
    function __construct($oConexion = null)
    {
        $oConexion = $oConexion;
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
    /**
     * Nos ayudara a seleccionar a solo un elemento de alcance
     * @param integer $iId Será el id del elemento
     * @return string Regresara un string tipo Json con los datos de la consulta si fue exitosa o si no
     */
    public function select($iId = 0)
    {
        $cQuery = "SELECT * FROM alcance WHERE id={$iId}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['datos']['id'] = $aDatos['id'];
            $aStatus['datos']['nombre'] = $aDatos['nombre'];
            $aStatus['datos']['nombreinterno'] = $aDatos['nombreinterno'];
        }
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a editar el alcance que le pedimos
     * @param array $aDatos Son los datos del alcance que editaremos
     * @return string Regresara un string tipo Json que nos dirá si la consulta fue correcta o no
     */
    public function edit($aDatos = [])
    {
        $cQuery = "UPDATE alcance SET nombre='{$aDatos['nombre']}', nombreinterno='{$aDatos['nombreinterno']}' WHERE id={$aDatos['id']}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);

    }
    /**
     * Eliminara el alcance que le pedimos
     * @param integer $iId 
     * @return string Regresara un string tipo Json con el estado de si fue exitosa o no la consulta
     */
    public function delete($iId = 0)
    {
        $cQuery = "DELETE FROM alcance WHERE id=${iId}";        
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($oConsulta != false)
        {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
}

?>