<?php

$cRuta = "/indicadores/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/objetivos.php";
// if ($oAutentica->lAutenticado) {
    $cAccion = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    $cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
    $aDatos = json_decode($cDatos);
    $oObjetivos = new Objetivos($oAutentica);
    $aDatos = json_decode($cDatos, true);
    switch ($cAccion) {
        case 'add':
            $cRegreso = $oObjetivos->addObjetive($aDatos);
            break;
        case 'edit':
            $cRegreso = $oObjetivos->modifyObjective($aDatos);
            break;
        case 'deleted':
            $cRegreso = $oObjetivos->modifyObjective($aDatos, true);
            break;
        case 'view':
            $cRegreso = $oObjetivos->selectObjectives();
            break;
        default:
            $aRegreso = [
                'status' => 'error',
            ];
            $cRegreso = json_encode($aRegreso);
            break;
    }
    echo $cRegreso;
// }
