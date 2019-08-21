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
    /**
     * Podremos añadir un mando
     * @param array $aDatos
     * @return string Regresara un string tipo json con el estado de la consulta
     */
    public function add($aDatos = [])
    {
        $iTipoIndicador = (int)$aDatos['datos']['tipoIndicador'];
        $iNivel = 0;
        $cFecha = date("Y-m-d H:i:s");
        $aDatosAGuardar = [
            "variables" => $aDatos['variables'],
            "datos" => $aDatos['datos'],
            "objetivosData" => $aDatos['objetivosData'],
            "acciones" => $aDatos['acciones'],
        ];
        $iIdObjetivo = $aDatos['objetivosData']['id'];
        $cDatos = json_encode($aDatosAGuardar);
        $cQueryMandoObjetivo = "INSERT INTO {$this->cTabla}
        (DatosMando,NivelPuesto,TipoIndicador,UsuarioCreo,Creado,Editado,UsuarioEdito,IdObjetivo) 
        VALUES 
        ('{$cDatos}',{$iNivel},{$iTipoIndicador},{$this->oAutentica->getId()},'{$cFecha}','{$cFecha}',{$this->oAutentica->getId()},{$iIdObjetivo})";
        $oConsultaMandoObjetivo = $this->oConexion->query($cQueryMandoObjetivo);
        $aStatus = [
            'status' => false
        ];
        if($oConsultaMandoObjetivo != false)
        {
            $aStatus['status'] = true;
            $aStatus['subindicador'] = $this->addSubIndicador($aDatos['subindicadores']);
        }
        return json_encode($aStatus);
    }
    // Ayudara a añadir los subindicadores que hay.
    private function addSubIndicador($aDatos=[]){
        $cQueryLastIndicadorOfUser = "SELECT Id FROM general_mando WHERE UsuarioCreo={$this->oAutentica->getId()} ORDER BY Id DESC LIMIT 1";
        $oConsultaLastIndicadorOfUser = $this->oConexion->query($cQueryLastIndicadorOfUser);
        $aDatosLastIndicador = $oConsultaLastIndicadorOfUser->fetch(PDO::FETCH_ASSOC);
        $IdLatIndicador = $aDatosLastIndicador['Id'];
        $lStatus = false;
        if(!empty($aDatos)){
            foreach ($aDatos as $subIndicadores) {
                $lStatus = false;
                $aDatosAEnviar = [
                    "id" => $subIndicadores['id'],
                    "nombre" => $subIndicadores['nombre'],
                    "variables" => $subIndicadores['variables'],
                ];
                $iCantidadDeResponsables = count($subIndicadores['responsables']);
                $iContadorDeResponsables = 0;
                $cResponsable = "";
                foreach ($subIndicadores['responsables'] as $responsable) {
                    $cResponsable .= $responsable['idUsuario'];
                    $iContadorDeResponsables++;
                    if($iContadorDeResponsables !== $iCantidadDeResponsables){
                        $cResponsable .= ",";
                    }
                }
                $cDatosAEnviar = json_encode($aDatosAEnviar);
                $cQuery ="INSERT INTO general_subindicadores (DatosSubIndicador,IdIndicador,IdUsuariosResponsables) VALUES ('{$cDatosAEnviar}',{$IdLatIndicador},'{$cResponsable}')";
                $oConsulta = $this->oConexion->query($cQuery);
                if($oConsulta !== false){
                    $lStatus = true;
                }
            }
        }else{
            $lStatus = true;
        }
        return $lStatus;
    }
    // La función view mandara a llamar a todos los indicadores que el usuario pueda ver
    public function view()
    {
        $idUsuario = $this->oAutentica->getId();
        $cQuery = "SELECT * FROM {$this->cTabla} WHERE IdUsuario LIKE '{$idUsuario}%' 
        OR IdUsuario LIKE  '%{$idUsuario}%' 
        OR IdUsuario LIKE '%{$idUsuario}'
        OR UsuarioCreo={$idUsuario}";
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
                $iId = $aMandos['Id'];
                $aStatus['datos'][$iContadorMandos]= json_decode($aMandos['DatosMando'],true);
                $cQuerySubIndicadores = "SELECT * FROM general_subindicadores WHERE IdIndicador = {$iId}";
                $oConsultaSubindicadores = $this->oConexion->query($cQuerySubIndicadores);
                $iContadorSubindicadores = 0;
                foreach ($oConsultaSubindicadores as $aSubindicador) {
                    $aStatus['datos'][$iContadorMandos]['subindicadores'][$iContadorSubindicadores] = json_decode($aSubindicador['DatosSubIndicador'],true);
                    $iContadorSubindicadores++;
                }
                if(json_last_error() !== 0){
                    $aStatus['status'] = false;
                    $aStatus['error'] = json_last_error();
                }
                $aStatus['datos'][$iContadorMandos]['id'] = $iId;
                $iContadorMandos++;
            }
        }
        return json_encode($aStatus);
    }
    public function editarHeredado($aDatos = []){
        $cDatos = json_encode($aDatos['subindicadores'][0]);
        $iIdSubindicador = (int)$aDatos['id'];
        $cQuery = "UPDATE general_subindicadores SET DatosSubIndicador='{$cDatos}' WHERE IdSubIndicador={$iIdSubindicador}";
        $oConsulta = $this->oConexion->query($cQuery);
        $cQueryTraeDatosSubindicador = "SELECT * FROM general_subindicadores WHERE IdSubIndicador={$iIdSubindicador}";
        $aDatosSubIndicador = $this->oConexion->query($cQueryTraeDatosSubindicador)->fetch(PDO::FETCH_ASSOC);
        $cQueryTraeSubindicadores = "SELECT DatosSubIndicador FROM general_subindicadores WHERE IdIndicador={$aDatosSubIndicador['IdIndicador']}";
        $cQueryTraeIndicador = "SELECT DatosMando FROM general_mando WHERE Id={$aDatosSubIndicador['IdIndicador']}";
        $aDatosIndicador = $this->oConexion->query($cQueryTraeIndicador)->fetch(PDO::FETCH_ASSOC);
        $aDatosDelMando = json_decode($aDatosIndicador['DatosMando'],true);
        $oConsultaSubindicadores = $this->oConexion->query($cQueryTraeSubindicadores);
        foreach ($aDatosDelMando['variables'] as $aVariables) {
            foreach ($aVariables['etapas'] as $aEtapas) {
                $aDatosDelMando['variables'][$aVariables['id']-1]['etapas'][$aEtapas['idEtapa']-1]['valor'] = 0;
            }
        }
        foreach ($oConsultaSubindicadores as $subindicador) {
            $aDatosSubindicador = json_decode($subindicador['DatosSubIndicador'],true);
            foreach ($aDatosSubindicador['variables'] as $aVariable) {
                $iSuma = 0;
                foreach ($aVariable['etapas'] as $aEtapa) {
                    $iValorActual = $aDatosDelMando['variables'][$aVariable['id']-1]['etapas'][$aEtapa['idEtapa']-1]['valor'];
                    $iSumaDeEtapas = $iValorActual+$aEtapa['valor'];
                    $iSuma = $iSuma +$aEtapa['valor'];
                    $aDatosDelMando['variables'][$aVariable['id']-1]['etapas'][$aEtapa['idEtapa']-1]['valor'] = $iSumaDeEtapas; 
                    $iValorVariableUno = $aDatosDelMando['variables'][0]['etapas'][$aEtapa['idEtapa']-1]['valor'];
                    $iPorcentaje = (100*(int)$aEtapa['valor'])/(int)$iValorVariableUno;
                    if($aVariable['id'] === 1){
                        $iPorcentaje = 100;
                    }
                    $aDatosDelMando['variables'][$aVariable['id']-1]['etapas'][$aEtapa['idEtapa']-1]['porcentaje'] = $iPorcentaje;   
                }
                $aDatosDelMando['variables'][$aVariable['id']-1]['valorTotal'] = $iSuma;
            }
        }
        $cDatosActualizadosDelMando = json_encode($aDatosDelMando);
        $cQueryDelMandoAactualizar = "UPDATE general_mando SET DatosMando='{$cDatosActualizadosDelMando}' WHERE Id={$aDatosSubIndicador['IdIndicador']}";
        $oConsultaDelMando = $this->oConexion->query($cQueryDelMandoAactualizar);
        $aStatus = [
            'status'=>false,
            'datos' => []
        ];
        if($oConsulta !== false){
            $aStatus['status'] = true;
            $aStatus['datos'] = $aDatosDelMando['variables'];
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
        $idUsuario = $this->oAutentica->getId();
        $cQuery = "SELECT * FROM {$this->cTabla} WHERE Id={$iId} AND UsuarioCreo={$idUsuario}";
        $cQuerySubIndicador = "SELECT DatosSubIndicador FROM general_subindicadores WHERE IdIndicador={$iId}";
        $oConsulta = $this->oConexion->query($cQuery);
        $oConsultaSubIndicador = $this->oConexion->query($cQuerySubIndicador);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['datos'] = json_decode($aDatos['DatosMando'], true);
            $aStatus['datos']['subindicadores'] = [];
            $iContadorSubIndicadores = 0;
            foreach($oConsultaSubIndicador as $aSubindicador){
                if(!empty($aSubindicador)){
                    $aDatosSubIndicador = json_decode($aSubindicador['DatosSubIndicador'],true);
                    $aStatus['datos']['subindicadores'][$iContadorSubIndicadores]["id"] = $aDatosSubIndicador['id'];
                    $aStatus['datos']['subindicadores'][$iContadorSubIndicadores]["nombre"] = $aDatosSubIndicador['nombre'];
                    $aStatus['datos']['subindicadores'][$iContadorSubIndicadores]["variables"] = $aDatosSubIndicador['variables'];                    
                    $iContadorSubIndicadores++;
                }else{
                    $aStatus['datos']['subindicadores'] = [];
                }
            }
            $aStatus['datos']['id'] = $aDatos['Id'];
        }
        return json_encode($aStatus);
    }
    //
    public function traeSubIndicadores(){
        $idUsuario = $this->oAutentica->getId();
        $cQuery = "SELECT * FROM general_subindicadores WHERE IdUsuariosResponsables LIKE '{$idUsuario}%' 
        OR IdUsuariosResponsables LIKE  '%{$idUsuario}%' 
        OR IdUsuariosResponsables LIKE '%{$idUsuario}'";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus= [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta !== false){
            $aStatus['status'] = true;
            $iContadorSubIndicadores = 0;
            foreach ($oConsulta as $aSubindicador) {
                $aStatus['datos'][$iContadorSubIndicadores] = $this->guardaSubIndicadores($aSubindicador);
                $iContadorSubIndicadores++;
            }
        }
        return json_encode($aStatus);
    }
    private function guardaSubIndicadores($aSubindicador)
    {
        $iIdIndicador = $aSubindicador['IdIndicador'];
        $cQueryIndicador = "SELECT DatosMando from general_mando WHERE id={$iIdIndicador}";
        $oConsultaIndicador = $this->oConexion->query($cQueryIndicador);
        $aDatosIndicador = $oConsultaIndicador->fetch(PDO::FETCH_ASSOC);
        $aDatosConvertidos = json_decode($aDatosIndicador['DatosMando'],true);
        $aDatosGuardados['variables'] = [];
        foreach ($aDatosConvertidos['variables'] as $variables) {
            array_push($aDatosGuardados['variables'],$variables);
        }
        $aDatosGuardados['subindicadores'] = [json_decode($aSubindicador['DatosSubIndicador'],true)];
        $aDatosGuardados['datos'] = $aDatosConvertidos['datos'];
        $aDatosGuardados['objetivosData'] = $aDatosConvertidos['objetivosData'];
        $aDatosGuardados['acciones'] = $aDatosConvertidos['acciones'];
        $aDatosGuardados['id'] = $aSubindicador['IdSubIndicador'];
        $aDatosGuardados['heredado'] =true;
        return $aDatosGuardados;
    }
    /**
     * Traera los indicadores heredados
     *
     * @param integer $iId
     * @return void
     */
    public function traeHeredado($iId = 0)
    {
        $cQuery = "SELECT * FROM general_subindicadores WHERE IdSubIndicador={$iId}"; 
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta !== false){
            $aStatus['status'] = true;
            $aDatos = $oConsulta->fetch(PDO::FETCH_ASSOC);
            $aStatus['datos'] = $this->guardaSubIndicadores($aDatos);
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
        $cQuery = "DELETE FROM {$this->cTabla} WHERE Id={$iIdMando} AND UsuarioCreo={$this->oAutentica->getId()}";
        $oConsulta = $this->oConexion->query($cQuery);
        $cQuerySubindicador = "DELETE FROM general_subindicadores WHERE IdIndicador={$iIdMando}";
        $aStatus = [
            'status' => false
        ];
        if($oConsulta != false)
        {
            $oConsultaSubIndicador = $this->oConexion->query($cQuerySubindicador);
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    // Modificara los datos del indicador que le dictemos
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