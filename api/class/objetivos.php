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
    public function __construct($oAutentica = null)
    {
        $this->oConexion = new Conexion();
        $this->oAutentica = $oAutentica;
    }
    /**
     * Nos ayudara a agregar nuevos objetivos a la base de datos.
     * @param array $aDatos Serán los datos que tendremos que ingresar al objetivo
     * @return string Regresara un string el cual será un Json para validar si el objetivo fue agregado o no.
     */
    public function addObjetive($aDatos = [])
    {
        $aAdd = [
            'tabla' => 'objetivos',
            'datos' => [
                'nombre' => [
                    'valor' => $aDatos['titulo'],
                    'tipo' => 'string',
                ],
                'descripcion' => [
                    'valor' => $aDatos['descripcion'],
                    'tipo' => 'string',
                ],
                'paisalcanceid' => [
                    'valor' => $aDatos['paisAlcance'],
                    'tipo' => 'integer',
                ],
                'paisiniciativaid' => [
                    'valor' => $aDatos['paisIniciativa'],
                    'tipo' => 'integer',
                ],
                'inicio' => [
                    'valor' => $aDatos['inicia'],
                    'tipo' => 'string',
                ],
                'finaliza' => [
                    'valor' => $aDatos['finaliza'],
                    'tipo' => 'string',
                ],
                'finalizo' => [
                    'valor' => 0,
                    'tipo' => "integer",
                ],
                'creado' => [
                    'valor' => date("Y-m-d H-i-s"),
                    'tipo' => "string",
                ],
                'modificado' => [
                    'valor' => date("Y-m-d H-i-s"),
                    'tipo' => "string",
                ],
                'idusuariocreo' => [
                    'valor' => $this->oAutentica->getId(),
                    'tipo' => 'integer',
                ],
                'deleted' => [
                    'valor' => 0,
                    'tipo' => 'integer',
                ],
            ],
        ];
        $aDatos = [
            'status' => false,
        ];
        if ($this->oConexion->addConsult($aAdd) === true) {
            $aDatos = [
                'status' => true
            ];
        }
        return json_encode($aDatos);
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
        $aUpdate = [
            'tabla' => 'objetivos',
            'datos' => [
                'nombre' => [
                    'valor' => $aDatos['cNombre'],
                    'tipo' => 'string',
                ],
                'descripcion' => [
                    'valor' => $aDatos['cDescripcion'],
                    'tipo' => 'string',
                ],
                'paisalcanceid' => [
                    'valor' => $aDatos['iAlcance'],
                    'tipo' => 'integer',
                ],
                'paisiniciativaid' => [
                    'valor' => $aDatos['iIniciativa'],
                    'tipo' => 'integer',
                ],
                'inicio' => [
                    'valor' => $aDatos['cInicio'],
                    'tipo' => 'string',
                ],
                'finaliza' => [
                    'valor' => $aDatos['cFinaliza'],
                    'tipo' => 'string',
                ],
                'finalizo' => [
                    'valor' => 0,
                    'tipo' => "integer",
                ],
                'modificado' => [
                    'valor' => date("Y-m-d H-i-s"),
                    'tipo' => "string",
                ],
                'deleted' => [
                    'valor' => 0,
                    'tipo' => 'integer',
                ],
            ],
            'condiciones' => "WHERE id={$aDatos['iId']}"
        ];
        if ($lDeleted) {
            $aUpdate['datos']['deleted']['valor'] = 1;
        }
         $aDatosActualizado = [
            'status' => false,
        ];
        if ($this->oConexion->updateDatos($aUpdate) === true) {
            $aSelect = [
                'tabla' => 'objetivos',
                'condiciones' => "WHERE id={$aDatos['iId']}",
            ];
            $aDatosBaseDeDatos = $this->oConexion->selectDatos($aSelect);
            foreach ($aDatosBaseDeDatos as $aIndicadores) {
                $aDatosActualizado['status'] = true;
                $aDatosActualizado['deleted'] = $aIndicadores['deleted'];
                $aDatosActualizado['datos']['iId'] = $aIndicadores['id'];
                $aDatosActualizado['datos']['cNombre'] = $aIndicadores['nombre'];
                $aDatosActualizado['datos']['cDescripcion'] = $aIndicadores['descripcion'];
                $aDatosActualizado['datos']['iAlcance'] = $aIndicadores['paisalcanceid'];
                $aDatosActualizado['datos']['iIniciativa'] = $aIndicadores['paisiniciativaid'];
                $aDatosActualizado['datos']['cInicio'] = $aIndicadores['inicio'];
                $aDatosActualizado['datos']['cFinaliza'] = $aIndicadores['finaliza'];
                $aDatosActualizado['datos']['cIdContenedor'] = $aDatos['cIdContenedor'];
            }
        }
        return json_encode($aDatosActualizado);
    }
    /**
     * Nos ayudara a mandar los datos de los objetivos a mostrar
     * @return string Regresa un string tipo Json con los datos para mostrar
     */
    public function selectObjectives()
    {
        $aSelect = [
            'tabla' => 'objetivos',
            'condiciones' => 'WHERE deleted=0',
        ];
        $aDatosBaseDeDatos = $this->oConexion->selectDatos($aSelect);
        $aDatos = [
            'status' => false,
        ];
        $iContadorDeIndicadores = 0;
        foreach ($aDatosBaseDeDatos as $aIndicadores) {
            $aDatos['status'] = true;
            $aDatos['view'] = true;
            $aDatos['datos'][$iContadorDeIndicadores]['id'] = $aIndicadores['id'];
            $aDatos['datos'][$iContadorDeIndicadores]['titulo'] = $aIndicadores['nombre'];
            $aDatos['datos'][$iContadorDeIndicadores]['descripcion'] = $aIndicadores['descripcion'];
            $aDatos['datos'][$iContadorDeIndicadores]['alcance'] = $aIndicadores['paisalcanceid'];
            $aDatos['datos'][$iContadorDeIndicadores]['iniciativa'] = $aIndicadores['paisiniciativaid'];
            $aDatos['datos'][$iContadorDeIndicadores]['inicia'] = $aIndicadores['inicio'];
            $aDatos['datos'][$iContadorDeIndicadores]['finaliza'] = $aIndicadores['finaliza'];
            $iContadorDeIndicadores++;
        }
        return json_encode($aDatos);
    }
    /**
     * Nos ayudara a seleccionar un solo objetivo
     * @param integer $iIdObjetive
     * @return string tipo Json.
     */
    public function selectOneObjetive($iIdObjetive = 0)
    {
        $aSelect = [
            'tabla' => 'objetivos',
            'condiciones' => "WHERE id={$iIdObjetive}",
        ];
        $aDatosBaseDeDatos = $this->oConexion->selectDatos($aSelect);
        $aDatos = [
            'status' => false,
        ];
        foreach ($aDatosBaseDeDatos as $aIndicadores) {
            $aDatos['status'] = true;
            $aDatos['view'] = true;
            $aDatos['datos']['id'] = $aIndicadores['id'];
            $aDatos['datos']['titulo'] = $aIndicadores['nombre'];
            $aDatos['datos']['descripcion'] = $aIndicadores['descripcion'];
            $aDatos['datos']['alcance'] = $aIndicadores['paisalcanceid'];
            $aDatos['datos']['iniciativa'] = $aIndicadores['paisiniciativaid'];
            $aDatos['datos']['inicia'] = $aIndicadores['inicio'];
            $aDatos['datos']['finaliza'] = $aIndicadores['finaliza'];
        }
        return json_encode($aDatos);
    }
}
