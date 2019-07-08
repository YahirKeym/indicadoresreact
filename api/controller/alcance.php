<?php
$cRuta = "/indicadoresreact/api";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/dependencias.php";
require_once $_SERVER["DOCUMENT_ROOT"] . $cRuta . "/class/alcance.php";
$cAction = "view";
$oAlcance = new Alcance();
switch($cAction)
{
    case 'view':
    $cRegreso = $oAlcance->viewAlcance();
    break;
    case 'add':
    break;
}
echo $cRegreso;
?>