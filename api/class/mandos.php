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
        $this->oConexion = new Conexion();

    }
    public function addMando($aDatos = [])
    {
        $cFirstQuery = "INSERT INTO mandos_objetivos (idobjetivo,etapas) VALUES ($aDatos['objetivoid'],$aDatos['etapas'])";
        $this->oConexion->query($cFirstQuery);
        $cSecondQuery = "INSERT INTO variables_mandos";
    }
}
?>