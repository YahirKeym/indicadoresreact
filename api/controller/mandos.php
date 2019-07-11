<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/mandos.php";
    $cAccion = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';   
    $cDatos = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
    $iIdObjetive = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
    $aDatos = json_decode($cDatos);
    $oMandos = new Mandos($oAutentica);
    $aDatos = json_decode($cDatos, true);
    switch ($cAccion) {
        case 'add':
            $cRegreso = $oMandos->add($aDatos);
            break;
        case 'edit':
            $cRegreso = $oMandos->modify($aDatos);
            break;
        case 'deleted':
            $cRegreso = $oMandos->delete($aDatos, true);
            break;
        case 'view':
            $cRegreso = $oMandos->view();
            break;
        case 'select':
            $cRegreso = $oMandos->select($iIdObjetive);
            break;
        default:
            $aRegreso = [
                'status' => 'error',
            ];
            $cRegreso = json_encode($aRegreso);
            break;
        }
    echo $cRegreso;