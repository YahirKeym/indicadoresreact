<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/rango.php";
    $cAccion = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';   
    $cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
    $iId = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
    $aDatos = json_decode($cDatos);
    $oRangos = new Rango($oAutentica, $oConexionUsers);
    $aDatos = json_decode($cDatos, true);
    switch ($cAccion) {
        case 'add':
            $cRegreso = $oRangos->add($aDatos);
            break;
        case 'edit':
            $cRegreso = $oRangos->modify($aDatos);
            break;
        case 'deleted':
            $cRegreso = $oRangos->delete($aDatos, true);
            break;
        case 'view':
            $cRegreso = $oRangos->view();
            break;
        case 'select':
            $cRegreso = $oRangos->select($iId);
            break;
        case 'selectForMandos':
            $cRegreso = $oRangos->selectForMandos($iId);
        break;
        default:
            $aRegreso = [
                'status' => 'error',
            ];
            $cRegreso = json_encode($aRegreso);
            break;
        }
    echo $cRegreso;