<?php
include 'datos_conexion.php';

$conexion = new mysqli($server, $user, $pass, $bd);
if ($conexion->connect_error)
	die('No se pudo conectar a la base de datos');
