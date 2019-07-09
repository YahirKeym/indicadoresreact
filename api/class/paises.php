<?php 
class Paises
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
     * Nos ayudar a añadir un país de así desearlo.
     * @param array $aDatos
     * @return string Regresara un string tipo json con la validación si la consulta fue o no exitosa
     */
    public function addPais($aDatos = [])
    {
        $cQuery = "INSERT INTO paises (nombre,prefijo) VALUES ('{$aDatos['nombre']}','{$aDatos['prefijo']}')";
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
    /**
     * Traera los datos de los paises de la base de datos
     * @return string Regresara un string tipo json con los datos de paises
     */
    public function viewPaises()
    {
        $cQuery = "SELECT * FROM paises";
        $aConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false
        ];
        if($aConsulta != false)
        {
            $aStatus['status'] = true;
            $iContadorDeDatos = 0;
            foreach ($aConsulta as $aDatos) {
                $aStatus['datos'][$iContadorDeDatos]['id'] = $aDatos['id'];
                $aStatus['datos'][$iContadorDeDatos]['nombre'] = $aDatos['nombre'];
                $aStatus['datos'][$iContadorDeDatos]['prefijo'] = $aDatos['prefijo'];
                $iContadorDeDatos++;
            }
        }else{
            $aStatus['error'] = true;
        }
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a obtener el país que le pedimos
     * @param integer $iId Será el id del pais que le solicitamos
     * @return string Regresara un string tipo Json 
     */
    public function selectOne($iId = 0)
    {
        $cQuery = "SELECT * FROM paises WHERE id={$iId}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false,
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['data']['id'] = $aDatos['id'];
            $aStatus['data']['prefijo'] = $aDatos['prefijo'];
            $aStatus['data']['nombre'] = $aDatos['nombre'];
        }
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a editar el país que le indiquemos
     * @param array $aDatos Serán los datos de ése páis
     * @return string Regresara un string tipo json que nos indicara si los procesos fueron correctos o no
     */
    public function editPais($aDatos = [])
    {
        $cQuery = "UPDATE paises SET nombre='{$aDatos['nombre']}', prefijo='{$aDatos['prefijo']}' WHERE id={$aDatos['id']}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'error' => false,
        ];
        if ($oConsulta != false) {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    /**
     * Eliminar el páis que le digamos
     * @param array $aDatos Serán los datos del país a eliminar
     * @return string Regresara un string tipo Json con el estado de si fallo o no la consulta
     */
    public function delete($aDatos = [])
    {
        $cQuery = "DELETE FROM paises WHERE id={$aDatos['id']}";
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
