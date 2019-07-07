<?php
$cRuta = "/indicadoresweb";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/sources/class/dependencias.php";
$cDatos = $_REQUEST['datos'];
switch ($cDatos) {
    case 'close':
        $aRegreso = $oAutentica->closeSession();
        break;
    default:
        $aRegreso = $oAutentica->validarLogin($cDatos);
        break;
}
$cRegreso = json_encode($aRegreso);
echo $cRegreso;
