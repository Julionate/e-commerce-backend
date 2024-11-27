<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permite solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas


$conn = include('../conexion.php');


$idUsuario = isset($_GET['idUsuario']) ? strval($_GET['idUsuario']) : null;
$idProducto = isset($_GET['idProducto']) ? intval($_GET['idProducto']) : null;


$sql = "CALL removeCarrito(?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error preparando la consulta: " . $conn->error]);
    exit;
}

// Bind de los parámetros
$stmt->bind_param("si", $idUsuario, $idProducto);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Verificar si el procedimiento afectó filas
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => "Producto eliminado exitosamente"]);
    } else {
        http_response_code(404); // No encontrado
        echo json_encode(["error" => "No se encontró el producto para eliminar"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error ejecutando la consulta: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

