<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/alcance.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$iId = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
$aDatos = json_decode($cDatos, true);
$oAlcance = new Alcance($oConexionMandos);
switch($cAction)
{
    case 'view':
    $cRegreso = $oAlcance->viewAlcance();
    break;
    case 'add':
    $cRegreso = $oAlcance->addAlcance($aDatos);
    break;
    case 'edit':
    $cRegreso = $oAlcance->edit($aDatos);
    break;
    case 'delete':
    $cRegreso = $oAlcance->delete($iId);
    break;
    case 'select':
    $cRegreso = $oAlcance->select($iId);
    break;
}
echo $cRegreso;
?>