<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
$cDatos = isset($_REQUEST['datos']) ? $_REQUEST['datos'] : '';
$cToken = $_REQUEST['token'];
switch ($cDatos) {
    case 'close':
    $aRegreso = $oAutentica->closeSession();
    break;
    case 'valida':
    $aRegreso = $oAutentica->validarLogin($cDatos,$cToken);
    break;
    default:
    $aRegreso = $oAutentica->validarCookie($cToken);
        break;
}
$cRegreso = json_encode($aRegreso);
echo $cRegreso;
