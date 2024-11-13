<?php
// src/db/connection.php

$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "stock_db";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Devuelve la conexión para que se use en otros archivos
return $conn;
?>