<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/jerarquias.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$aDatos = json_decode($cDatos,true);
$oJerarquias = new Jerarquias($oConexionUsers);
switch($cAction)
{
    case 'view':
    $cRegreso = $oJerarquias->view();
    break;
    case 'add':
    $cRegreso = $oJerarquias->add($aDatos);
    break;
    case 'edit':
    break;
    case 'delete':
    break;
    case 'select':
    break;
    case 'updatemove':
    $cRegreso = $oJerarquias->updateMoves($aDatos);
    break;
}
echo $cRegreso;