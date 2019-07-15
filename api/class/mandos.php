<?php 
class Mandos
{
    /**
     * Guardara el objeto de conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Nos ayudara a iniciar los requerimientos de los mandos.
     */
    function __construct()
    {
        $oConexion = new Conexion();
        $this->oConexion = $oConexion->oConexion;

    }
    /**
     * Podremos añadir un mando
     * @param array $aDatos
     * @return string Regresara un string tipo json con el estado de la consulta
     */
    public function add($aDatos = [])
    {
        $cDatos = json_encode($aDatos);
        $cQueryMandoObjetivo = "INSERT INTO mandos (datosmando) VALUES ('{$cDatos}')";
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
        $cQuery = "SELECT * FROM mandos";
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
                $aStatus['datos'][$iContadorMandos]= json_decode($aMandos['datosmando'],true);
                $aStatus['datos'][$iContadorMandos]['id'] = $aMandos['id'];
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
        $cQuery = "SELECT * FROM mandos WHERE id={$iId}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['datos']['id'] = $aDatos['id'];
            $aStatus['datos'] = json_decode($aDatos['datosmando'], true);
        }
        return json_encode($aStatus);
    }
}
?>