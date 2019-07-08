<?php
    error_reporting(E_ALL);
    $cRuta = "/indicadoresreact/api";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/conexion.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/portal.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/autenticacion.php";
    $cToken = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';
    $oConexion = new Conexion();          
    $oAutentica = new Autenticacion();
    $oPortal = new Portal($oAutentica);
?>