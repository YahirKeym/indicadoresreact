<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cId = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$cToken = $_REQUEST['token'];
switch ($cAction) {
    case 'close':
    $aRegreso = $oAutentica->closeSession();
    break;
    case 'valida':
    $aRegreso = $oAutentica->validarLogin($cAction,$cToken);
    break;
    case 'selectForMandos':
    $oAutentica->validarCookie($cToken);
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
