<?php
error_reporting(E_ALL);
/**
 * Nos ayudara a saber si un usuario se encuentra autenticado o no
 * @author Yahir Axel Garcia Keymurth <arzkaner@gmail.com>
 */
class Autenticacion
{
    /**
     * Nos dira si el usuario se encuentra autenticado o no
     * @var boolean
     */
    public $lAutenticado = false;
    /**
     * Guardara el objeto de Conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Guardara el id del usuario en caso de que se encuentre logueado.
     * @var integer
     */
    private $iUserId = 0;
    /**
     * Guardaremos  el nombre del usuario logueado
     * @var string
     */
    private $cUserNombre = "";
    /**
     * Guardara el nombre completo del usuario
     * @var string
     */
    private $cNombreCompleto = "";
    /**
     * Guardara el correo del usuario
     * @var string
     */
    private $cCorreo = "";
    /**
     * Guardara el nombre de usuario del usuario
     * @var string
     */
    private $cUserName = "";
    /**
     * Guardara el permiso para saber si es o no director general
     *
     * @var integer
     */
    private $lEsDirectorGeneral = 0;
    /**
     * Nos dira si tiene el permiso de crear usuarios
     *
     * @var integer
     */
    private $lPuedeCrearUsuarios = 0;
    /**
     * Nos dirá si puede visualizar todos los objetivos creados por los usuarios
     *
     * @var integer
     */
    private $lPuedeVerTodosLosObjetivos = 0;
    /**
     * Marcara si puede ver todos los indicadores de los usuarios
     *
     * @var integer
     */
    private $PuedeVerTodosLosIndicadores = 0;
    /**
     * Nos marcara los puestos que controla, y así si puede ver los objetivos y indicadores de esos puestos
     *
     * @var string
     */
    private $cPuestos = "";
    /**
     * Guardara el departamento en el que se encuentra el usuario
     * @var string
     */
    private $cDepartamento = "";
    /**
     * La nueva conexión es la que irá remplazando la conexión que se usaba antes con las funciones que tiene. (Remplantear la conexión)
     *
     * @var object
     */
    private $oNewConexion = null;
    /**
     * Guardara la conexión de la base de datos de indicadores 
     *
     * @var object Conexión de indicadores
     */
    private $oConexionIndicadores = null;
    /**
     * Nos ayudara a iniciar la autenticación para poder obtener datos de usuario o bien, validar si su sesión se encuentra activa.
     */
    public function __construct($oConexion = null,$oConexionIndicadores = null)
    {
        $this->oConexion = $oConexion;
        $this->oNewConexion = $this->oConexion->oConexion;
        $this->oConexionIndicadores =  $oConexionIndicadores->oConexion;
    }
    /**
     * Nos ayudara a validar los datos del usuario para saber si es correcto el logueo o no
     * @param string $cDatos Serán los datos usuario/correo y pass del usuario a intentar loguear
     * @return array con los datos del usuario en caso de tenerlos
     */
    public function validarLogin($aDatos = [])
    {
        $lEsEmail = filter_var($aDatos['usuario'], FILTER_VALIDATE_EMAIL);
        $cCondicion = "Correo='{$aDatos['usuario']}'";
        if (!$lEsEmail) {
            $cCondicion = "UserName='{$aDatos['usuario']}'";
        }
        $cQuery = "SELECT IdEmpleado, Password, UserName FROM general_empleado WHERE {$cCondicion}";
        $aDatos['condicionDb'] = $cCondicion;
        $aDatosDeLaBaseDeDatos = $this->oNewConexion->query($cQuery);
        return $this->comparadorDedatos($aDatosDeLaBaseDeDatos, $aDatos);
    }
    /**
     * Nos ayudara a hacer comprobación de las credenciales de los usuarios con lo que trae de la base de datos
     * @param array $aDatosBaseDeDatos
     * @param array $aDatosRecibidos
     * @return array Mandara un array con el estado del usuario y una cookie en caso de tenerla
     */
    private function comparadorDedatos($aDatosBaseDeDatos = [], $aDatosRecibidos = [])
    {
        $aStatus = [
            'status' => false,
            'cookie' => '',
            'changePass' => false
        ];
        if($aDatosBaseDeDatos != false)
        {
            foreach ($aDatosBaseDeDatos as $aUsuario) {
                if ($aDatosRecibidos['password'] === $aUsuario['Password']) {
                    $dateFechaCookie = date("Y-m-d H:i:s");
                    $cookieParaUsuario = sha1($dateFechaCookie . $aUsuario['IdEmpleado']."1");
                    $cFecha = date("Y-m-d H:i:s");
                    $cQuery = "UPDATE general_empleado SET Cookie='{$cookieParaUsuario}', LastLogin='{$cFecha}' WHERE {$aDatosRecibidos['condicionDb']}";
                    $this->oNewConexion->query($cQuery);
                    setcookie('indicadores_i', $cookieParaUsuario, time() + 365 * 24 * 60 * 60, "/");
                    $aStatus['status'] = true;
                    if($aUsuario['UserName'] === $aUsuario['Password']){
                        $aStatus['changePass'] = true;
                        $aStatus['idUs'] = $aUsuario['IdEmpleado'];
                    }
                    $aStatus['cookie'] = $cookieParaUsuario;
                }
            }
        }
        return $aStatus;
    }
    /**
     * Validara la cookie que el se le haya pasado el usuario por parametro
     *
     * @param string $cToken Será la cookie que se validara
     * @return array regresara el estado si el usuario fue validado o no.
     */
    public function validarCookie($cToken = "")
    {
        $cCookie = !empty($cToken) ? $cToken : '';
        $aRegreso = [
            'autenticado' => false
        ];
        if (!empty($cCookie)) {
            $cQuery = "SELECT * FROM general_empleado WHERE Cookie = '${cCookie}'";
            $oConsulta = $this->oNewConexion->query($cQuery);
            if($oConsulta != false){
                foreach ($oConsulta as $aUsuario) {
                    if ($aUsuario['Cookie'] === $cCookie) {
                        $this->lAutenticado = true;
                        $cQueryPermisos = "SELECT * FROM permisos_indicadores WHERE IdEmpleado={$aUsuario['IdEmpleado']}";
                        $oConsultaPermisos = $this->oConexionIndicadores->query($cQueryPermisos);
                        $aPermisos = $oConsultaPermisos->fetch(PDO::FETCH_ASSOC);
                        $this->saveData($aUsuario, $aPermisos);
                        $aRegreso['autenticado'] = true;
                    }
                }
            }
        }
        return $aRegreso;
    }
    /**
     * Traera los usuarios del departamento que es el usuario y los departamentos que controla.
     *
     * @return array Regresara un array con los usuarios encontrados
     */
    public function view(){
        $cConsultaDePuestos = "";
        if(!empty($this->cPuestos)){
            $aPuestos = explode(",",$this->cPuestos);
            $cConsultaDePuestos .= "OR ";  
            $iConteoDePuestos = count($aPuestos);
            $iRepetidorDePuestos = 0;
            foreach ($aPuestos as $cPuesto) {
                $cConsultaDePuestos .= "IdPuesto='{$cPuesto}' ";
                if($iConteoDePuestos-1 > $iRepetidorDePuestos){
                    $cConsultaDePuestos .= "OR ";
                }
                $iRepetidorDePuestos++;
            }   
        }
        $cQuery = "SELECT IdEmpleado, IdPuesto, IdDepto, Nombre, ApellidoP,ApellidoM 
        FROM general_empleado
        WHERE IdDepto='{$this->cDepartamento}' OR IdPuesto='{$this->cPuesto}' {$cConsultaDePuestos}";
        $oConsulta = $this->oNewConexion->query($cQuery);
        $aStatus = [
            'status'=>false,
            'datos'=> []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $iContadorUsuarios = 0;
            foreach ($oConsulta as $aUsuarios) {
                $aStatus['datos'][$iContadorUsuarios]['id'] = $aUsuarios['IdEmpleado'];
                $aStatus['datos'][$iContadorUsuarios]['idPuesto'] = $aUsuarios['IdPuesto'];
                $aStatus['datos'][$iContadorUsuarios]['idDepartamento'] = $aUsuarios['IdDepto'];
                $aStatus['datos'][$iContadorUsuarios]['nombre'] = $aUsuarios['Nombre']." ".$aUsuarios['ApellidoP']." ".$aUsuarios['ApellidoM'];
                $aStatus['datos'][$iContadorUsuarios]['apellidoP'] = $aUsuarios['ApellidoP'];
                $aStatus['datos'][$iContadorUsuarios]['apellidoM'] = $aUsuarios['ApellidoM'];
                $iContadorUsuarios++;
            }
        }
        return $aStatus;
    }
    /**
     * Guardara los datos del usuario
     * @param array $aUsuario Serán los datos que guardaremos
     */
    private function saveData($aUsuario = [], $aPermisos = [])
    {
        $this->iUserId = $aUsuario['IdEmpleado'];
        $this->cUserNombre = $aUsuario['Nombre'];
        $this->cNombreCompleto = $aUsuario['Nombre']." ".$aUsuario['ApellidoP']." ".$aUsuario['ApellidoM'];
        $this->cUserName =  $aUsuario['UserName'];
        $this->cPuesto = $aUsuario['IdPuesto'];
        $this->cCorreo = $aUsuario['Correo'];
        $this->cDepartamento = $aUsuario['IdDepto'];
        if(!empty($aPermisos)){
            $this->lEsDirectorGeneral = $aPermisos['DirectorGeneral'];
            $this->lPuedeCrearUsuarios = $aPermisos['CrearUsuarios'];
            $this->lPuedeVerTodosLosObjetivos = $aPermisos['VerTodosLosObjetivos'];
            $this->PuedeVerTodosLosIndicadores = $aPermisos['VerTodosLosIndicadores'];
            $this->cPuestos = $aPermisos['PuestosQueControla'];
        }
    }
    /**
     * Nos ayudara a obtener el id del usuario
     *
     * @return integer Regresara el id del usuario
     */
    public function getId()
    {
        return $this->iUserId;
    }
    /**
     * Nos dictara si tiene los permisos de director general o no
     *
     * @return integer - boolean
     */
    public function getPermisoDirectorGeneral(){
        return $this->lEsDirectorGeneral;
    }
    /**
     * Nos regresara si tiene permiso de crear usuarios o no
     *
     * @return integer
     */
    public function getPermisoCreateUsuarios(){
        return $this->lPuedeCrearUsuarios;
    }
    /**
     * Regresara el permiso para poder ver todos los objetivos creados
     *
     * @return integer
     */
    public function getPermisoAllObjetivos(){
        return $this->lPuedeVerTodosLosObjetivos;
    }
    /**
     * Regresara el permiso para poder ver o no todos los indicadores creados
     *
     * @return integer
     */
    public function getPermisoAllIndicadores(){
        return $this->PuedeVerTodosLosIndicadores;
    }
    /**
     * Nos ayudara a obtener el nombre del usuario
     * @return string Regresara el nombre del usuario logueado
     */
    public function getName()
    {
        return $this->cUserNombre;
    }
    /**
     * Regresara el nombre completo del usuario
     * @return string Regresa el nombre completo del usuario con apellido paterno y materno
     */
    public function getFullName()
    {
        return $this->cNombreCompleto;
    }
    /**
     * Regresa el UserName para loguearse del usuario
     * @return string Regresara el nombre de usuario para poder logearse
     */
    public function getUserName()
    {
        return $this->cUserName;   
    }
    /**
     * Regresa el id del puesto del usuario
     * @return string Regresara el id del puesto del usuario
     */
    public function getIdPuesto()
    {
        return $this->cPuesto;        
    }
    /**
     * Regresa el id del departamento donde se encuentra el usuario
     * @return string Regresara el id del departamento del usuario
     */
    public function getIdDepartamento()
    { 
        return $this->cDepartamento;
    }
    /**
     * Nos ayudara a cerrar la sessión
     * @return array Regresara un array con la sesión cerrada
     */
    public function closeSession()
    {
        $dateFechaCookie = date("Y-m-d H:i:s");
        $cookieParaCerrarSesion = sha1($dateFechaCookie."0");
        setcookie('indicadores_i', $cookieParaCerrarSesion, time() + 365 * 24 * 60 * 60, "/");
        $aStatus = [
            'status' => true,
            'cookie' => $cookieParaCerrarSesion,
        ];
        return $aStatus;        
    }
    // Tengo que ver si estoy usando esta función, porque no que yo recuerde, pero gueno.
    public function selectForMandos($cId = "")
    {
        $cQuery = "SELECT IdEmpleado, Nombre, ApellidoP, ApellidoM,IdPuesto,IdDepto FROM general_empleado WHERE IdDepto = '{$cId}' AND Estatus='A'";
        $oConsulta = $this->oNewConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $iContadorUsers = 0;
            foreach ($oConsulta as $aUsuario) {
                $aStatus['datos'][$iContadorUsers]['nombre'] = $aUsuario['Nombre']." ".$aUsuario['ApellidoP']." ".$aUsuario['ApellidoM'];
                $aStatus['datos'][$iContadorUsers]['apellidoP'] = $aUsuario['ApellidoP'];
                $aStatus['datos'][$iContadorUsers]['apellidoM'] = $aUsuario['ApellidoM'];
                $aStatus['datos'][$iContadorUsers]['departamento'] = $aUsuario['IdDepto'];
                $aStatus['datos'][$iContadorUsers]['puesto'] = $aUsuario['IdPuesto'];
                $cQueryPuesto = "SELECT NivelDePuesto FROM general_puesto WHERE IdPuesto='{$aUsuario['IdPuesto']}'";
                $oConsultaPuesto = $this->oNewConexion->query($cQueryPuesto);
                $iNivel = $oConsultaPuesto->fetch(PDO::FETCH_ASSOC);
                $aStatus['datos'][$iContadorUsers]['nivelPuesto'] = $iNivel['NivelDePuesto'];
                $aStatus['datos'][$iContadorUsers]['id'] = $aUsuario['IdEmpleado'];
                $iContadorUsers++;
            }
        }
        return $aStatus;
    }
    /**
     * Cambiara el password si este es el mismo que se tiene como nombre de usuario
     *
     * @param string $cPwd
     * @return array Regresa el estado si el password fue cambiado de manera correcta
     */
    public function changePassword($cPwd = "",$iId = 0){
        $cQuery = "UPDATE general_empleado SET Password='{$cPwd}' WHERE IdEmpleado={$iId}";
        $oConsulta  = $this->oNewConexion->query($cQuery);
        $aStatus=[
            'status' => false,
            'changePass' => true
        ];
        // echo '<pre>';
        // var_dump($this->oNewConexion->errorInfo());
        // echo '</pre>';
        if($oConsulta !== false){
            $aStatus['status']  = true;
            $aStatus['changePass'] = false;    
        }
        return $aStatus;
    }
}
