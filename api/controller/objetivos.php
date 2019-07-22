<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/objetivos.php";
$cToken = isset($_REQUEST['token']) ? $_REQUEST['token'] :'';
$oAutentica->validarCookie($cToken);
if ($oAutentica->lAutenticado) {
    $cAccion = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    $cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
    $iIdObjetive = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
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
        case 'delete':
            $cRegreso = $oObjetivos->modifyObjective($iIdObjetive, true);
            break;
        case 'view':
            $cRegreso = $oObjetivos->selectObjectives();
            break;
        case 'select':
            $cRegreso = $oObjetivos->selectoneObjetive($iIdObjetive);
            break;
        default:
            $aRegreso = [
                'status' => 'error',
            ];
            $cRegreso = json_encode($aRegreso);
            break;
    }
}else{
    $cRegreso = "Página no encontrada";
}
echo $cRegreso;
