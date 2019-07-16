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
    public function validarLogin($cDatos = "")
    {
        $aDatos = json_decode($cDatos, true);
        $lEsEmail = filter_var($aDatos['usuario'], FILTER_VALIDATE_EMAIL);
        $cCondicion = "email='{$aDatos['usuario']}'";
        if (!$lEsEmail) {
            $cCondicion = "nickname ='{$aDatos['usuario']}'";
        }
        $aSearch = [
            'tabla' => 'general_empleado',
            'condiciones' => "WHERE {$cCondicion}",
        ];
        $aDatos['condicionDb'] = $cCondicion;
        $aDatosDeLaBaseDeDatos = $this->oConexion->selectDatos($aSearch);
        return $this->comparadorDedatos($aDatosDeLaBaseDeDatos, $aDatos, $cToken);
    }
    /**
     * Nos ayudara a hacer comprobación de las credenciales de los usuarios con lo que trae de la base de datos
     * @param array $aDatosBaseDeDatos
     * @param array $aDatosRecibidos
     * @return void
     */
    private function comparadorDedatos($aDatosBaseDeDatos = [], $aDatosRecibidos = [])
    {
        $aRegreso = [
            'validado' => false,
        ];
        foreach ($aDatosBaseDeDatos as $aUsuario) {
            if ($aDatosRecibidos['password'] === $aUsuario['password']) {
                $dateFechaCookie = date("Y-m-d H:i:s");
                $cookieParaUsuario = sha1($dateFechaCookie . $aUsuario['id']."1");
                $aUpdate = [
                    'tabla' => 'users',
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
                $aRegreso = [
                    'validado' => true,
                ];
            }
        }
        return $aRegreso;
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
                'condiciones' => "WHERE cookie = '{$cCookie}'",
            ];
            $aDatosDeLaBaseDeDatos = $this->oConexion->selectDatos($aSearch);
            foreach ($aDatosDeLaBaseDeDatos as $aUsuario) {
                if ($aUsuario['cookie'] === $cCookie) {
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
        return [
            'session' => false 
        ];        
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
    /**
     * Nos ayudara a implementar el login donde lo ocupemos
     * @return string Regresara el html del login
     */
    public function loginHtml()
    {
        return <<<HTML
        <form id="login" class="row mt-5 p-5 col-lg-5 offset-lg-3 col-sm-12" method="post">
            <div class="col-lg-12 row">
                <div class="form-group col-lg-7 offset-lg-3 col-sm-9">
                    <input type="text" name="usuario" class="form-control" placeholder="Usuario o Correo" />
                    <label class="d-none text-danger" for="usuario">El usuario se encuentra vacio</label>
                </div>
                <div class="form-group col-lg-7 offset-lg-3 col-sm-9">
                    <input type="password" name="password" class="form-control" placeholder="Password" />
                    <label class="d-none text-danger" for="password">El password se encuentra vacio</label>
                </div>
                <div class="form-group col-lg-7 offset-lg-3 col-sm-9">
                    <button class="btn btn-success">Iniciar Sesión</button>
                </div>
                <div class="d-none bg-danger col-md-6 offset-4 text-center error p-2">
                    <p class="text-white">El usuario o la contraseña no son validos, por favor de verificar</p>
                </div>
            </div>
        </form>
HTML;
    }
}
