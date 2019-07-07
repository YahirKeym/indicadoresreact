<?php
    $cRuta = "/indicadoresweb";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/sources/class/conexion.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/sources/class/portal.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$cRuta."/sources/class/autenticacion.php";
    $oConexion = new Conexion();          
    $oAutentica = new Autenticacion();
    $oPortal = new Portal($oAutentica);
?>