<?php
    error_reporting(E_ALL);
    $cRuta = "/api";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/conexion.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/portal.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/autenticacion.php";
    $cToken = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';
    $oConexionMandos = new Conexion(['host'=>'172.16.100.184','db'=>'indicadores_generales','user'=>'indicadores','password'=>'dOQAxEli']);
    $oConexionUsers = new Conexion(['host'=>'172.16.100.184','db'=>'catalogos_generales','user'=>'indicadores','password'=>'dOQAxEli']);
    $oAutentica = new Autenticacion($oConexionUsers,$oConexionMandos);
?>