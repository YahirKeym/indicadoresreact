<?php
/**
 * Será la clase que nos ayudara con la conexión a la base de datos
 * @author Yahir Axel Garcia Keymurth <arzkaner@gmail.com>
 */
class Conexion
{
    /**
     * Será el host de donde traeremos la base de datos
     * @var string
     */
    private $cHost = "localhost";
    /**
     * Será el usuario con el cual nos conectaremos a la base de datos
     * @var string
     */
    private $cUser = "root";
    /**
     * Será la contraseña con la cual nos conectaremos a la base de datos
     * @var string
     */
    private $cPassword = "";
    /**
     * Será la base de datos que ocuparemos para está conexión
     * @var string
     */
    private $cDatabase = "indicadores";
    /**
     * Guardara el tipo de codificación que usaremos
     *
     * @var string
     */
    private $cCodificacion = "SET NAMES utf8";
    /**
     * Guardara las tablas a las que se les hará un Inner join
     * @var array
     */
    private $aTablasForInner = [];
    /**
     * Nos ayudara a guardar el objeto de conexión
     * @var Object
     */
    private $oConexion = null;
    /**
     * Nos ayudara a declarar la conexión a la base de datos
     */
    public function __construct()
    {
        $this->oConexion = new PDO("mysql:host={$this->cHost};dbname={$this->cDatabase}", $this->cUser, $this->cPassword, [PDO::MYSQL_ATTR_INIT_COMMAND => $this->cCodificacion]);
    }
    /**
     * Nos ayudara a insertar una consulta a la base de datos
     * @param array $aInsertData Será la estructura que tendrá que llevar el array para insertar datos. Ejemp:
     * $aInsertData = [
     * 'tabla' => 'nombreDeLatabla',
     * 'datos' => [
     *          'nombreInsertar' => 'valorAInsertar',
     *          'nombreInsertar2' => 'valorAInsertar2',
     *          'etc' => 'etc'
     *      ]
     * ]
     * @return bool Regresara true si la consulta fue exitosa, o el error si la consulta no fue exitosa
     */
    public function addConsult($aInsertData = [])
    {
        $cTabla = $aInsertData['tabla'];
        $cNombreColumnas = "";
        $cValores = "";
        $iContadorDeDatos = count($aInsertData['datos']);
        $iRepeticionDeDatos = 0;
        foreach ($aInsertData['datos'] as $cNombreValor => $aValor) {
            $cNombreColumnas .= $cNombreValor;
            $cValor = "";
            switch ($aValor['tipo']) {
                case 'string':
                    $cValor = "'{$aValor['valor']}'";
                    break;
                case 'integer':
                    $cValor = $aValor['valor'];
                    break;
            }
            $cValores .= "{$cValor}";
            if ($iContadorDeDatos - 1 != $iRepeticionDeDatos) {
                $cNombreColumnas .= ",";
                $cValores .= ",";
            }
            $iRepeticionDeDatos++;
        }
        $cQuery = "INSERT INTO {$cTabla} ({$cNombreColumnas}) VALUES ($cValores)";
        $mRegreso = true;
        if (!$this->oConexion->query($cQuery)) {
            $mRegreso = $this->oConexion->errorInfo();
        }
        return $mRegreso;
    }
    /**
     * Nos seleccionara los datos que le pidamos o bien, todos los datos de X tabla
     * @param array $aDatos Serán los datos que le pidamos que nos traiga. Ejemplo:
     * $aDatos = [
     *      'tabla' => 'tablaNombre',
     *      'datos' => [
     *          'primerDatoAPedir',
     *          'segundoDatoAPedir',
     *          'tercerDatoAPedir'
     *      ],
     *      'condiciones' => 'WHERE id = x'
     * ]
     * @return array Regresara los datos que le hayamos pedido
     */
    public function selectDatos($aDatos = [])
    {
        $cSelectDatos = "*";
        if (isset($aDatos['datos']) && !empty($aDatos['datos'])) {
            $cSelectDatos = "";
            $iContadorDeDatos = count($aDatos['datos']);
            $iRepeticionDeDatos = 0;
            foreach ($aDatos['datos'] as $cDatos) {
                $cSelectDatos .= "{$cDatos}";
                if ($iContadorDeDatos - 1 != $iRepeticionDeDatos) {
                    $cSelectDatos .= ",";
                }
                $iRepeticionDeDatos++;
            }
        }
        $cCondiciones = "";
        if (isset($aDatos['condiciones']) && !empty($aDatos['condiciones'])) {
            $cCondiciones = $aDatos['condiciones'];
        }
        $cQuery = "SELECT {$cSelectDatos} FROM {$aDatos['tabla']} {$cCondiciones}";
        return $this->oConexion->query($cQuery);
    }
    /**
     * Nos ayudara a actualizar los datos de la tabla que le pidamos
     * @param array $aDatos Será la estructura que le tendremos que pasar para que actualice los datos. Ejemp:
     * $aDatos = [
     *      'tabla' => 'nombreDelaTablaAActualizar',
     *      'datos' => [
     *          'campoAActualizar' => [
     *                      'valor' => 'valorDelCampoAActualizar',
     *                      'tipo' => 'string'
     *                  ]
     *          'campoAAactializar2' => [
     *                      'valor' => 'valorDelCamporAActualizar2',
     *                      'tipo' => 'integer'
     *      ],
     *      'condiciones' => 'LasCondicionesQueLlevara la consulta: WEHERE id = x'
     * ]
     * @return bool Regresa true si fueron actualizados o el error si los datos no fueron actualizados
     */
    public function updateDatos($aDatos = [])
    {
        $cSelectDatos = "";
        $iContadorDeDatos = count($aDatos['datos']);
        $iRepeticionDeDatos = 0;
        foreach ($aDatos['datos'] as $cNombreCampo => $aValor) {
            switch ($aValor['tipo']) {
                case 'string':
                    $cValor = "'{$aValor['valor']}'";
                    break;
                case 'integer':
                    $cValor = $aValor['valor'];
                    break;
            }
            $cSelectDatos .= "{$cNombreCampo}={$cValor}";
            if ($iContadorDeDatos - 1 != $iRepeticionDeDatos) {
                $cSelectDatos .= ",";
            }
            $iRepeticionDeDatos++;
        }
        $cQuery = "UPDATE {$aDatos['tabla']} SET {$cSelectDatos} {$aDatos['condiciones']}";
        $updatePrepare = $this->oConexion->prepare($cQuery);
        $mRegreso = true;
        if (!$this->oConexion->query($cQuery)) {
            $mRegreso = $this->oConexion->errorInfo();
        }
        return $mRegreso;
    }
    /**
     * Nos ayudara a obtener los nombres de la tabla que le pedimos
     * @param string $cNombreBaseDeDatos
     * @return array Regresa un array con los nombre 
     */
    private function obtainNameTables($cNombreBaseDeDatos = "")
    {
        $cQuery = "SHOW columns FROM $cNombreBaseDeDatos";
        return $this->oConexion->query($cQuery);
    }
    public function initInner()
    {
        $this->innerJoin();
    }
    private function innerJoin($aInners = [])
    {
        $iConteoDeTablas = count($this->aTablasForInner);
        $cArmadoInner = "";
        $iContadorRepeticionTablas = 0;
        foreach ($this->aTablasForInner as $cNombres) {
            $aNombresTablas = $this->obtainNameTables($cNombres);
            $cUnionTablas = "";
            $iContadorColumnas = $aNombresTablas->rowCount();
            $iContadorRepeticionColumnas = 0;
            foreach ($aNombresTablas as $cNombreTabla) {
                $cUnionTablas .= $cNombres.".".$cNombreTabla['Field'];
                if($iContadorColumnas -1 != $iContadorRepeticionColumnas)
                {
                    $cUnionTablas .= ",";
                }
                $iContadorRepeticionColumnas++;
            }
            if($iConteoDeTablas - 1 != $iContadorRepeticionTablas)
            {
                $cUnionTablas .= ",";
            }  
            $cArmadoInner .= $cUnionTablas;
            $iContadorRepeticionTablas++;
        }
        echo '<pre>';
        var_dump($cArmadoInner);
        echo '</pre>';
    }
    public function addInner($cTablaName = "")
    {
        array_push($this->aTablasForInner, $cTablaName);
    }
}
