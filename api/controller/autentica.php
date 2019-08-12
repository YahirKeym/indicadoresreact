<?php
$cRuta = "/indicadoresdev/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cId = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '{}';
$aDatos = json_decode($cDatos,true);
$cToken = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';
$oAutentica->validarCookie($cToken);
switch ($cAction) {
    case 'close':
    $aRegreso = $oAutentica->closeSession();
    break;
    case 'valida':
    $aRegreso = $oAutentica->validarLogin($aDatos);
    break;
    case 'view':
    if($oAutentica->lAutenticado){
        $aRegreso = $oAutentica->view();
    }
        break;
    case 'selectForMandos':
    if($oAutentica->lAutenticado){
        $aRegreso = $oAutentica->selectForMandos($cId);
    }
    break;
    default:
    $aRegreso = $oAutentica->validarCookie($cToken);
        break;
}
$cRegreso = json_encode($aRegreso);
echo $cRegreso;
