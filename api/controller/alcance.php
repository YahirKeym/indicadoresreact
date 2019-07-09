<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/alcance.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$aDatos = json_decode($cDatos, true);
$oAlcance = new Alcance();
switch($cAction)
{
    case 'view':
    $cRegreso = $oAlcance->viewAlcance();
    break;
    case 'add':
    $cRegreso = $oAlcance->addAlcance($aDatos);
    break;
}
echo $cRegreso;
?>