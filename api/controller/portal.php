<?php 
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/portal.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cToken = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';
$oAutentica->validarCookie($cToken);
$oPortal = new Portal($oConexionMandos, $oAutentica);
switch($cAction)
{
    case 'menu':
    $cRegreso = $oPortal->getMenu();
    break;
    default: 
    break;
}
echo $cRegreso;