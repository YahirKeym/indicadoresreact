<?php 
class Mandos
{
    /**
     * Es el nombre de la tabla del cuerpo de mando
     * @var string
     */
    private $cTabla = "general_mando";
    /**
     * Guardara el objeto de conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Es el objeto de autentitación para saber que usuario es el que esta solicitando datos
     * @var object
     */
    private $oAutentica = null;
    /**
     * Nos ayudara a iniciar los requerimientos de los mandos.
     */
    function __construct($oAutentica = null, $oConexion)
    {
        $oConexion = $oConexion;
        $this->oConexion = $oConexion->oConexion;
        $this->oAutentica = $oAutentica;
    }
    private function repetidorDeDatos($aDatos = [])
    {
        $cRegreso = "";
        $iContadorDeDatos = 0;
        $iCantidadDeDatos = count($aDatos);
        foreach($aDatos as $reDatos)
        {
            $cRegreso .= $reDatos['id'];
            $iContadorDeDatos++;
            if($iContadorDeDatos < $iCantidadDeDatos){
                $cRegreso .= ",";
            }
        }
        return $cRegreso;
    }
    /**
     * Podremos añadir un mando
     * @param array $aDatos
     * @return string Regresara un string tipo json con el estado de la consulta
     */
    public function add($aDatos = [])
    {
        $cDatos = json_encode($aDatos);
        $aUsuarios = $aDatos['datos']['usuarios']['datos'];
        $aDepartamento = $aDatos['datos']['rangos']['datos'];
        $aArea = $aDatos['datos']['jerarquias']['datos'];
        $iTipoIndicador = (int)$aDatos['datos']['tipoIndicador'];
        $iNivel = 0;
        $cFecha = date("Y-m-d H:i:s");
        if(!empty($aUsuarios))
        {
            $iNivel = 10;
            foreach($aUsuarios as $aUsers){
                if($aUsers['nivel'] === null){
                    $aUsers['nivel'] = 0;
                }
                if($aUsers['nivel'] < $iNivel)
                {
                    $iNivel = $aUsers['nivel'];
                }
            }
        }
        $cDepartamento = $this->repetidorDeDatos($aDepartamento);
        $cArea= $this->repetidorDeDatos($aArea);
        $cUsuarios = (string)$this->repetidorDeDatos($aUsuarios);
        $cQueryMandoObjetivo = "INSERT INTO {$this->cTabla}
        (DatosMando,NivelPuesto,IdDepartamento,IdArea,IdUsuario,TipoIndicador,UsuarioCreo,Creado,Editado,UsuarioEdito) 
        VALUES 
        ('{$cDatos}',{$iNivel},'{$cDepartamento}','{$cArea}','{$cUsuarios}',{$iTipoIndicador},{$this->oAutentica->getId()},'{$cFecha}','{$cFecha}',{$this->oAutentica->getId()})";
        $oConsultaMandoObjetivo = $this->oConexion->query($cQueryMandoObjetivo);
        $aStatus = [
            'status' => false
        ];
        if($oConsultaMandoObjetivo != false)
        {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    /**
     * Undocumented function
     *
     * @return void
     */
    public function view()
    {
        $idUsuario = $this->oAutentica->getId();
    $cQuery = "SELECT * FROM {$this->cTabla} WHERE IdUsuario LIKE '{$idUsuario}%' OR '%{$idUsuario}%' OR '%{$idUsuario}' OR UsuarioCreo={$this->oAutentica->getId()} AND TipoIndicador=3 OR TipoIndicador=0";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus =[
            'status' => false,
            'datos' => []
        ];
        if($oConsulta !== false)
        {
          $aStatus['status'] = true;
            $iContadorMandos = 0;
            foreach($oConsulta as $aMandos)
            {
                $aStatus['datos'][$iContadorMandos]= json_decode($aMandos['DatosMando'],true);
                $aStatus['datos'][$iContadorMandos]['id'] = $aMandos['Id'];
                $iContadorMandos++;
            }
        }
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a seleccionar un mando dependiendo de su id
     * @param integer $iId
     * @return string Regresara un string tipo json con los datos del mando en caso de que haya sido correcta la consulta.
     * Si no regresara un string con el estatus en falso y sin datos en el
     */
    public function select($iId = 0)
    {
        $cQuery = "SELECT * FROM {$this->cTabla} WHERE Id={$iId}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['datos'] = json_decode($aDatos['DatosMando'], true);
            $aStatus['datos']['id'] = $aDatos['Id'];
        }
        return json_encode($aStatus);
    }
    /**
     * Eliminaremos el mando - indicador
     *
     * @param integer $iIdMando Será el id del mando que eliminaremos
     * @return string Regresa un string tipo json con el estado de la consulta.
     */
    public function delete($iIdMando = 0)
    {
        $cQuery = "DELETE FROM {$this->cTabla} WHERE Id={$iIdMando}";
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
    /**
     * Undocumented function
     *
     * @param array $aDatos
     * @param string $cDatos
     * @return void
     */
    public function modify($aDatos = [],$cDatos = "")
    {
        $cFecha = date("Y-m-d H:i:s");
        $cQuery = "UPDATE {$this->cTabla} SET DatosMando='{$cDatos}', Editado='{$cFecha}',UsuarioEdito={$this->oAutentica->getId()} WHERE Id={$aDatos['id']}";
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
}
?>