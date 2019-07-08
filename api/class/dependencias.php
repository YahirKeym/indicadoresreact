<?php
    $cRuta = "/indicadores/api";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/conexion.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/portal.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/class/autenticacion.php";
    $oConexion = new Conexion();          
    $oAutentica = new Autenticacion();
    $oPortal = new Portal($oAutentica);
?>