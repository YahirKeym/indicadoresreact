<?php
error_reporting(E_ALL);
/**
 * No ayudara a realizar acciones como modificar, editar o agregar objetivos a la base de datos
 * @author Yahir Axel Garcia Keymurth <arzkaner@gmail.com>
 */
class Objetivos
{
    /**
     * Guardara el objeto de conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Guardara el objeto de autenticación
     * @var Object
     */
    private $oAutentica = null;
    /**
     * Nos ayudara a obtener los parametros necesarios para la configuración de la clase
     *
     * @param ObjetoDeAutenticacion $oAutentica Será el objeto de autenticación
     */
    public function __construct($oAutentica = null, $oConexion = null)
    {
        $this->oConexion = $oConexion->oConexion;
        $this->oAutentica = $oAutentica;
    }
    /**
     * Nos ayudara a agregar nuevos objetivos a la base de datos.
     * @param array $aDatos Serán los datos que tendremos que ingresar al objetivo
     * @return string Regresara un string el cual será un Json para validar si el objetivo fue agregado o no.
     */
    public function addObjetive($aDatos = [])
    {
        $cDate = date("Y-m-d H:i:s");
        $cQuery = "INSERT INTO objetivos 
        (nombre,descripcion,alcanceId,paisalcanceid,paisiniciativaid,inicio,finaliza,finalizo,creado,modificado,idusuariocreo,deleted)
        VALUES
        ('{$aDatos['titulo']}','{$aDatos['descripcion']}',{$aDatos['tipoAlcance']},{$aDatos['paisAlcance']},{$aDatos['paisIniciativa']},'{$aDatos['inicia']}','{$aDatos['finaliza']}',0,'{$cDate}','{$cDate}',{$this->oAutentica->getId()},0)"; 
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false
        ];
        if ($oConsulta != false) {
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    
    /**
     * Nos ayudara a modificar el objetivo o bien eliminarlo de así quererlo
     *
     * @param array $aDatos
     * @param boolean $lDeleted
     * @return string Regresara un string tipo json con los datos del objetivo modificado
     */
    public function modifyObjective($aDatos = [], $lDeleted = false)
    {
        $cDate = date("Y-m-d H:i:s");
       if($lDeleted)
       {
           $cQuery ="UPDATE objetivos 
           SET
            deleted=1 WHERE id={$aDatos}";
       }else{
            $cQuery = "UPDATE objetivos 
            SET
            nombre='{$aDatos['titulo']}',descripcion='{$aDatos['descripcion']}',alcanceId={$aDatos['tipoAlcance']},paisalcanceid={$aDatos['paisAlcance']},paisiniciativaid={$aDatos['paisIniciativa']},inicio='{$aDatos['inicia']}',finaliza='{$aDatos['finaliza']}',modificado='{$cDate}'
            WHERE id={$aDatos['id']}";
       }
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
     * Nos ayudara a mandar los datos de los objetivos a mostrar
     * @return string Regresa un string tipo Json con los datos para mostrar
     */
    public function selectObjectives()
    {
        $idUsuario = $this->oAutentica->getId();
        $cQuery = "SELECT * FROM objetivos 
        WHERE 
        deleted=0 
        AND 
        idusuariocreo={$idUsuario} 
        OR UsuariosDeObjetivo LIKE '{$idUsuario}%' 
        OR UsuariosDeObjetivo LIKE  '%{$idUsuario}%' 
        OR UsuariosDeObjetivo LIKE '%{$idUsuario}'";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
        ];
        $iContadorDeIndicadores = 0;
        foreach ($oConsulta as $aIndicadores) {
            $aStatus['status'] = true;
            $aStatus['view'] = true;
            $aStatus['datos'][$iContadorDeIndicadores]['id'] = $aIndicadores['id'];
            $aStatus['datos'][$iContadorDeIndicadores]['titulo'] = $aIndicadores['nombre'];
            $aStatus['datos'][$iContadorDeIndicadores]['descripcion'] = $aIndicadores['descripcion'];
            $aStatus['datos'][$iContadorDeIndicadores]['alcance'] = $aIndicadores['paisalcanceid'];
            $aStatus['datos'][$iContadorDeIndicadores]['iniciativa'] = $aIndicadores['paisiniciativaid'];
            $aStatus['datos'][$iContadorDeIndicadores]['inicia'] = $aIndicadores['inicio'];
            $aStatus['datos'][$iContadorDeIndicadores]['finaliza'] = $aIndicadores['finaliza'];
            $iContadorDeIndicadores++;
        }
        return json_encode($aStatus);
    }
    /**
     * Nos ayudara a seleccionar un solo objetivo
     * @param integer $iIdObjetive
     * @return string tipo Json.
     */
    public function selectOneObjetive($iIdObjetive = 0)
    {
        $cQuery = "SELECT * FROM objetivos WHERE id={$iIdObjetive} LIMIT 1";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
        ];
        $aIndicadores = $oConsulta->fetch(PDO::FETCH_ASSOC);
        $aStatus['status'] = true;
        $aStatus['view'] = true;
        $aStatus['datos']['id'] = $aIndicadores['id'];
        $aStatus['datos']['titulo'] = $aIndicadores['nombre'];
        $aStatus['datos']['descripcion'] = $aIndicadores['descripcion'];
        $aStatus['datos']['tipoAlcance'] = $aIndicadores['alcanceId'];
        $aStatus['datos']['paisAlcance'] = $aIndicadores['paisalcanceid'];
        $aStatus['datos']['paisIniciativa'] = $aIndicadores['paisiniciativaid'];
        $aStatus['datos']['inicia'] = $aIndicadores['inicio'];
        $aStatus['datos']['finaliza'] = $aIndicadores['finaliza'];
        return json_encode($aStatus);
    }
}
