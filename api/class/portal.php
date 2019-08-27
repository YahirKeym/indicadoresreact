<?php
error_reporting(E_ALL);
/**
 * Será la clase que encapsulara los elementos iniciales del portal, en este caso, head, header y footer
 * @author Yahir Axel Garcia Keymurth <arzkaner@gmail.com>
 */
class Portal
{
    /**
     * Nos ayudara a guardar los elementos CSS que agregaremos de manera extra al portal
     * @var array
     */
    private $aCssElements = [];
    /**
     * Nos ayudara a guardar los scripts que tengamos que agregar de manera extra
     * @var array
     */
    private $aScriptsElements = [];
    /**
     * Nos ayudara a guardar los componentes de react que tengamos de manera extra.
     * @var array
     */
    private $aComponentElements = [];
    /**
     * Guardara el objeto de autenticación
     * @var Autenticación
     */
    private $oAutentica = null;
    /**
     * Nos ayudara a definir el objeto de autenticación
     * @param Autenticación $oAutentica será el objeto de autenticación
     */
    public function __construct($oConexionMandos = null,$oAutentica = null)
    {
        $this->oAutentica = $oAutentica;
    }
    /**
     * Obtendremos el menú dependiendo del tipo de usuario que sea.
     *
     * @return void
     */
    public function getMenu(){
        $aMenu = $this->inicioMenu();
        if($this->oAutentica->lAutenticado){
            $aMenu = $this->userMenu();
            if($this->oAutentica->getPermisoDirectorGeneral()){
                $aMenu = $this->dirgenMenu();
            }
        }
        return json_encode($aMenu);
    }
    /**
     * Será el menú que se le mostrara al usuario no logueado
     * @return array regresara el menú del usuario no logueado
     */
    private function inicioMenu()
    {
        return [
            'status'=>true,
            'datos'=>[
                [
                    'nombre' => 'Inicio',
                    'path' => ''
                ]
            ]
        ];
    }
    /**
     * Será el menú del usuario logueado
     *
     * @return array Regresara el menú del usuario logueado
     */
    private function userMenu()
    {
        return [
            'status'=>true,
            'datos'=>[
                [
                    'nombre' => 'Inicio',
                    'path' => ''
                ],
                [
                    'nombre' => 'Objetivos',
                    'path' => 'objetivos'
                ],
                [
                    'nombre' => 'Indicadores',
                    'path' => 'mandos'
                ]
            ]
        ];
    }
    /**
     * Regresara el menú del director general
     *
     * @return array
     */
    private function dirgenMenu()
    {
        return [
            'status'=>true,
            'datos'=>[
                [
                    'nombre' => 'Inicio',
                    'path' => ''
                ],
                [
                    'nombre' => 'Objetivos',
                    'path' => 'objetivos'
                ],
                [
                    'nombre' => 'Indicadores',
                    'path' => 'mandos'
                ],
                [
                    'nombre' => 'General',
                    'path' => 'general'
                ]
            ]
        ];
    }
    /**
     * Nos ayudara a generar el header del portal ya construido
     * @param string $cElements Serán elementos extra que se le quieran agregar al portal
     * @param string $cTitle Será el titulo que llevará la página de donde lo estamos mandando a llamar.
     * @return string Regresara el header ya construido con los elementos que le pedimos
     */
    public function getHeader($cTitle = "", $cElements = "")
    {
        $cCssElements = "";
        if (!empty($this->aCssElements)) {
            $cCssElements = $this->createExtraHtml($this->aCssElements, "css");
        }
        $cMenu = $this->obtainMenu();
        return $this->headerHtml($cElements, $cTitle, $cCssElements, $cMenu);
    }
    /**
     * Nos ayudara a obtener el footer ya generado con los elementos que le solicitamos
     * @return string Regresara el footer con los elementos que le solicitamos
     */
    public function getFooter()
    {
        $cScripts = "";
        if (!empty($this->aScriptsElements)) {
            $cScripts = $this->createExtraHtml($this->aScriptsElements, "js");
        }
        $cComponents = "";
        if(!empty($this->aComponentElements)){
            $cComponents = $this->createExtraHtml($this->aComponentElements,"componente");
        }
        return $this->footerHtml($cScripts,$cComponents);
    }
    /**
     * Nos ayudara a guardar elementos Css extras de la web a usar
     * @param string $cCssNameFile Será el nombre del archivo css a usar
     */
    public function addCss($cCssNameFile = "")
    {
        array_push($this->aCssElements, $cCssNameFile);
    }
    /**
     * Nos ayudara a guardar elementos de script extras de la web a usar
     * @param string $cScriptNameFile Será el nombre del archivo a usar y a guardar
     */
    public function addScript($cScriptNameFile = "")
    {
        array_push($this->aScriptsElements, $cScriptNameFile);
    }
    /**
     * Nos ayudara a agregar los componentes que tenemos en la web
     * @param string $cComponentNameFile
     */
    public function addComponent($cComponentNameFile = "")
    {
        array_push($this->aComponentElements, $cComponentNameFile);
    }
    /**
     * Nos ayudara a obtener el html del menú que necesitamos
     * @return string Regresara las opciones del menú que tenemos
     */
    private function obtainMenu()
    {
        $aMenu = $this->arrayMenuHeader();
        $cMenuEnviar = "";
        foreach ($aMenu as $cMenu => $aValores) {
            $cAncla = $this->anclaHtml($aValores['path'], $cMenu, $aValores['atributos']);
            $cDropDown = "";
            if (isset($aValores['dropdown']) && !empty($aValores['dropdown'])) {
                $cAnclaDrop = "";
                foreach ($aValores['dropdown'] as $cNombre => $aValoresDrop) {
                    $cAnclaDrop .= $this->anclaHtml($aValoresDrop['path'], $cNombre, $aValoresDrop['atributos']);
                }
                $cDropDown = $this->dropdownHtml($cAnclaDrop);
            }
            if ($this->oAutentica->lAutenticado) {
                $cMenuEnviar .= $this->liHtml($cAncla, $cDropDown, $aValores['atributospadre']);
            } else {
                if (!$aValores['autenticado']) {
                    $cMenuEnviar .= $this->liHtml($cAncla, $cDropDown, $aValores['atributospadre']);
                }
            }
        }
        return $cMenuEnviar;
    }
    /**
     * Será el array del menú, si se quiere agregar otra sección, solo se tiene que colocar en el array
     * @return array Regresara el array del menú
     */
    private function arrayMenuHeader()
    {
        return [
            [
                'nombre' => 'Inicio',
                'path' => '/',
                'atributospadre' => 'class="nav-item"',
                'atributos' => 'class="nav-link"',
                'autenticado' => false,
            ],
            [
                'nombre' => 'Objetivos',
                'path' => 'objetivos',
                'atributospadre' => 'class="nav-item"',
                'atributos' => 'class="nav-link"',
                'autenticado' => true,
            ],
            [
                'nombre' => 'Mando',
                'path' => 'mando.php',
                'atributospadre' => 'class="nav-item"',
                'atributos' => 'class="nav-link"',
                'autenticado' => true,
            ],
            // 'Catalogos' => [
            //     'path' => '',
            //     'atributospadre' => 'class="nav-item"',
            //     'atributos' => 'class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"',
            //     'dropdown' => [
            //         'Tipos de Alcance' => [
            //             'path' => 'tiposdealcance.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Alcance' => [
            //             'path' => 'alcance.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Periodos' => [
            //             'path' => 'periodos.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Valores de Periodos' => [
            //             'path' => 'valoresdeperiodos.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Indicador' => [
            //             'path' => 'indicador.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Procesos' => [
            //             'path' => 'procesos.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //         'Frecuencias' => [
            //             'path' => 'frecuencias.php',
            //             'atributos' => 'class="dropdown-item"',
            //         ],
            //     ],
            //     'autenticado' => true,
            // ],
            'Cerrar Sesión' => [
                'path' => '#',
                'atributospadre' => 'class="nav-item" close-session',
                'atributos' => 'class="nav-link"',
                'autenticado' => true,
            ],
        ];
    }
    /**
     * Creara los elementos extra del header y del footer
     *
     * @param array $aFiles Será el array que contendra el nombre de los archivos que se ocuparan
     * @param string $cTypeFile Será el tipo de archivo que crearemos
     * @return string Regresara el html que le pidamos construido o construidos.
     */
    private function createExtraHtml($aFiles = [], $cTypeFile = "")
    {
        $cRegresa = "";
        foreach ($aFiles as $cFile) {
            switch ($cTypeFile) {
                case 'css':
                    $cRegresa .= $this->cssHtml($cFile);
                    break;
                case 'js':
                    $cRegresa .= $this->scriptHtml($cFile);
                    break;
                case 'componente':
                    $cRegresa .=$this->componentHtml($cFile);
                    break;
            }
        }
        return $cRegresa;
    }
}
