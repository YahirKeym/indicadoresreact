<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/paises.php";
$cAction = isset($_REQUEST['action']) ? $_REQUEST['action']:'';
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$aDatos = json_decode($cDatos, true);
$iId = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
$oPaises = new Paises();
switch($cAction)
{
    case 'view':
    $cRegreso = $oPaises->viewPaises();
    break;
    case 'add':
    $cRegreso = $oPaises->addPais($aDatos);
    break;
    case 'edit':
    $cRegreso = $oPaises->editPais($aDatos);
    break;
    case 'select':
    $cRegreso = $oPaises->selectOne($iId);
    break;
    case 'delete':
    $cRegreso = $oPaises->delete($aDatos);
    break;
}
echo $cRegreso;