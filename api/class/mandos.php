<?php 
/**
 * Guardara las funciones principales para poder armar un mando/indicador.
 */
class Mandos
{
    /**
     * Es el nombre de la tabla del cuerpo de mando
     * @var string
     */
    private $cTabla = "general_mando";
    private $cRuta = "";
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
     * Nos ayudara a iniciar los requerimientos de los mandos mandando a la conexión y al objeto de autenticación
     */
    function __construct($oAutentica = null, $oConexion = null, $cRuta = "")
    {
        $oConexion = $oConexion;
        $this->oConexion = $oConexion->oConexion;
        $this->oAutentica = $oAutentica;
        $this->cRuta = $cRuta;
    }
    /**
     * añadira un mando con su cuerpo en formato json y sus caracteristicas principales separadas en formato de entidad
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
    /**
     * Añadira los subindicadores que contenga un mando, el mando lo manda a llamar y en caso de tener subindicadores, va agregando uno por uno.
     *
     * @param array $aDatos
     * @return bool Regresara true en caso de que haya insertado correctamente todos los subindicadores o en caso de que los subindicadores se encuentren
     * vacios también regresara true, solo regresara false en caso de que haya un error en alguno de los subindicadores
     */
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
    /**
     * Mostrara todos los indicadores permitidos por el usuario mediante los parametros dados en la consulta.
     *
     * @return array Regresa un array convertido en json con las datos en caso de contener y con el estado de la consulta.
     */
    public function view()
    {
        $idUsuario = $this->oAutentica->getId();
        $cQuery = "SELECT * FROM {$this->cTabla} WHERE IdUsuario LIKE '{$idUsuario}%' 
        OR IdUsuario LIKE  '%{$idUsuario}%' 
        OR IdUsuario LIKE '%{$idUsuario}'
        OR UsuarioCreo={$idUsuario}";
        if($this->oAutentica->getPermisoDirectorGeneral()){
            $cQuery = "SELECT * FROM {$this->cTabla}";
        }
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
    /**
     * Está función editara el subindicador que se mando a llamar. Ayudara también a sumar todos los subindicadores para poder darle un valor
     * al indicador principal mediante los valores de cada uno de los subindicadores
     *
     * @param array $aDatos Serán los datos del subindicador
     * @return array regresa un array en formato json con la respuesta del estado
     */
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
                    if($iValorVariableUno === 0){
                        $iValorVariableUno = 100;
                    }
                    if($aEtapa['valor'] === 0){
                        $aEtapa['valor'] = 100;
                    }
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
        if($this->oAutentica->getPermisoDirectorGeneral()){
            $cQuery = "SELECT * FROM {$this->cTabla} WHERE Id={$iId}";
        }
        $cQuerySubIndicador = "SELECT IdSubIndicador,DatosSubIndicador,IdUsuariosResponsables FROM general_subindicadores WHERE IdIndicador={$iId}";
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
                    $aStatus['datos']['subindicadores'][$iContadorSubIndicadores]["idReal"] = $aSubindicador['IdSubIndicador'];
                    $aStatus['datos']['subindicadores'][$iContadorSubIndicadores]["idUsuario"] = $aSubindicador['IdUsuariosResponsables'];
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
    public function resignation($iIdIndicador, $iIdUser){
        $cQuery = "UPDATE general_subindicadores SET IdUsuariosResponsables={$iIdUser} WHERE IdSubIndicador={$iIdIndicador}";
        $oConsulta = $this->oConexion->query($cQuery);
        $aStatus = [
            'status' => false
        ];
        if($oConsulta !== false){
            $aStatus['status'] = true;
        }
        return json_encode($aStatus);
    }
    /**
     * Traera los subindicadores disponibles que se le hayan dado al usuario que está solicitando
     *
     * @return array Regresa un array convertido en json el cual mandara los subindicadores del usuario con el indicador correspondiente
     */
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
    /**
     * Guardara los datos principales del indicador principal de cada subindicador.
     *
     * @param array $aSubindicador Trae los datos del subindicador, esto para saber a que indicador mandaremos a llamar.
     * @return array Regresa un array con el subindicador y el indicador ya construidos.
     */
    private function guardaSubIndicadores($aSubindicador = [])
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
    /**
     * Modificara el indicador que nosostros le pidamos, guardara la fecha de edición y el ultimo usuario que lo edito.
     *
     * @param array $aDatos serán los datos del indicador
     * @param string $cDatos serán los datos en formato de json que guardaremos del indicador
     * @return array Regresara un array en formato json el cual dara el estado de true o false si se guardo el indicador o no.
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
    /**
     * Recibira y guardara el archivo
     *
     * @param array $aFile serán los datos del archivo
     * @return array 
     */
    public function uploadFileEtapas($aFile = []){
        $cTipoDeArchivo = $aFile['type'];
        $aStatus = [
            'status' => false,
            'ruta' => "",
            'type' => false
        ];
        if($cTipoDeArchivo === "application/pdf" || $cTipoDeArchivo === "image/png" || $cTipoDeArchivo === "image/jpeg"){
            $cIdUnico = uniqid();
            $cExtencion = pathinfo($aFile['name'],PATHINFO_EXTENSION);
            $lMueveArchivo = move_uploaded_file($aFile['tmp_name'],"c:/xampp/htdocs{$this->cRuta}/files/{$cIdUnico}.{$cExtencion}");
            $aStatus['type'] = true;
            if($lMueveArchivo){
                $aStatus['status'] = true;
                $aStatus['ruta'] = "http://172.16.100.196{$this->cRuta}/files/{$cIdUnico}.{$cExtencion}";
            }
        }
        return json_encode($aStatus);
    }
}
?>