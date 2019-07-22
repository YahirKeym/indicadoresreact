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
    private $cNickname = "";
    /**
     * Guardara el rango del usuario
     * @var string
     */
    private $cRango = "";
    /**
     * Guardara el area donde se encuentra ubicado el usuario
     * @var string
     */
    private $cArea = "";
    private $oNewConexion = null;
    /**
     * Nos ayudara a iniciar la autenticación para poder obtener datos de usuario o bien, validar si su sesión se encuentra activa.
     */
    public function __construct($cToken = "")
    {
        $this->oConexion = new Conexion();
        $this->oNewConexion = $this->oConexion->oConexion;
    }
    /**
     * Nos ayudara a validar los datos del usuario para saber si es correcto el logueo o no
     * @param string $cDatos Serán los datos convertidos en Json.
     * @return void
     */
    public function validarLogin($aDatos = [])
    {
        $lEsEmail = filter_var($aDatos['usuario'], FILTER_VALIDATE_EMAIL);
        $cCondicion = "Correo='{$aDatos['usuario']}'";
        if (!$lEsEmail) {
            $cCondicion = "UserName='{$aDatos['usuario']}'";
        }
        $cQuery = "SELECT IdEmpleado, Password FROM general_empleado WHERE {$cCondicion}";
        $aDatos['condicionDb'] = $cCondicion;
        $aDatosDeLaBaseDeDatos = $this->oNewConexion->query($cQuery);
        return $this->comparadorDedatos($aDatosDeLaBaseDeDatos, $aDatos);
    }
    /**
     * Nos ayudara a hacer comprobación de las credenciales de los usuarios con lo que trae de la base de datos
     * @param array $aDatosBaseDeDatos
     * @param array $aDatosRecibidos
     * @return void
     */
    private function comparadorDedatos($aDatosBaseDeDatos = [], $aDatosRecibidos = [])
    {
        $aStatus = [
            'status' => false,
            'cookie' => '',
        ];
        foreach ($aDatosBaseDeDatos as $aUsuario) {
            if ($aDatosRecibidos['password'] === $aUsuario['Password']) {
                $dateFechaCookie = date("Y-m-d H:i:s");
                $cookieParaUsuario = sha1($dateFechaCookie . $aUsuario['IdEmpleado']."1");
                
                $aUpdate = [
                    'tabla' => 'general_empleado',
                    'datos' => [
                        'cookie' => [
                            'valor' => $cookieParaUsuario,
                            'tipo' => 'string',
                        ],
                        'lastlogin' => [
                            'valor' => date("Y-m-d H:i:s"),
                            'tipo' => 'string'
                        ]
                    ],
                    'condiciones' => "WHERE {$aDatosRecibidos['condicionDb']}",
                ];
                setcookie('indicadores_i', $cookieParaUsuario, time() + 365 * 24 * 60 * 60, "/");
                $this->oConexion->updateDatos($aUpdate);
                $aStatus['status'] = true;
                $aStatus['cookie'] = $cookieParaUsuario;
            }
        }
        return $aStatus;
    }
    /**
     * Nos ayudara a validar la cookie del usuario, para así loguearlo o no
     */
    public function validarCookie($cToken = "")
    {
        $cCookie = !empty($cToken) ? $cToken : '';
        $aRegreso = [
            'autenticado' => false
        ];
        if (!empty($cCookie)) {
            $aSearch = [
                'tabla' => 'general_empleado',
                'condiciones' => "WHERE Cookie = '{$cCookie}'",
            ];
            $aDatosDeLaBaseDeDatos = $this->oConexion->selectDatos($aSearch);
            foreach ($aDatosDeLaBaseDeDatos as $aUsuario) {
                if ($aUsuario['Cookie'] === $cCookie) {
                    $this->lAutenticado = true;
                    $this->saveData($aUsuario);
                    $aRegreso['autenticado'] = true;
                }
            }
        }
        return $aRegreso;
    }
    /**
     * Guardara los datos del usuario
     * @param array $aUsuario Serán los datos que guardaremos
     */
    private function saveData($aUsuario = [])
    {
        $this->iUserId = $aUsuario['IdEmpleado'];
        $this->cUserNombre = $aUsuario['Nombre'];
        $this->cNombreCompleto = $aUsuario['Nombre']." ".$aUsuario['ApellidoP']." ".$aUsuario['ApellidoM'];
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
    public function selectForMandos($cId = "")
    {
        $cQuery = "SELECT IdEmpleado, Nombre, ApellidoP, ApellidoM FROM general_empleado WHERE IdDepto = '{$cId}'";
        $oConsulta = $this->oNewConexion->query($cQuery);
        $aStatus = [
            'status' => false,
            'datos' => []
        ];
        if($oConsulta != false){
            $aStatus['status'] = true;
            $iContadorUsers = 0;
            foreach ($oConsulta as $aUsuario) {
                $aStatus['datos'][$iContadorUsers]['nombre'] = $aUsuario['Nombre'];
                $aStatus['datos'][$iContadorUsers]['apellidoP'] = $aUsuario['ApellidoP'];
                $aStatus['datos'][$iContadorUsers]['apellidoM'] = $aUsuario['ApellidoM'];
                $aStatus['datos'][$iContadorUsers]['id'] = $aUsuario['IdEmpleado'];
                $iContadorUsers++;
            }
        }
        return $aStatus;
    }
}
