<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/mandos.php";
$cAccion = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';   
$cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$iIdMando = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
$aDatos = json_decode($cDatos, true);
$oAutentica->validarCookie($cToken);
$oMandos = new Mandos($oAutentica);
if ($oAutentica->lAutenticado) {
switch ($cAccion) {
    case 'add':
        $cRegreso = $oMandos->add($aDatos);
        break;
    case 'edit':
        $cRegreso = $oMandos->modify($aDatos, $cDatos);
        break;
    case 'delete':
        $cRegreso = $oMandos->delete($iIdMando, true);
        break;
    case 'view':
        $cRegreso = $oMandos->view();
        break;
    case 'select':
        $cRegreso = $oMandos->select($iIdMando);
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