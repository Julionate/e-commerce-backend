<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permite solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas


$conn = include('../conexion.php');

$idUsuario = isset($_GET['idUsuario']) ? htmlspecialchars($_GET['idUsuario']) : '';

// Prepara la consulta SQL para llamar al procedimiento almacenado
$sql = "CALL getCarrito(?)";
$stmt = $conn->prepare($sql);

// Enlaza los parámetros (página, límite, búsqueda y marcas)
$stmt->bind_param("s", $idUsuario); // 'iiss' indica dos enteros y dos cadenas
$stmt->execute();

$result = $stmt->get_result(); // Obtén el resultado

if (!$result) {
    die("Error en la consulta SQL: " . $conn->error);}

if ($result->num_rows > 0) {
    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} else {
    echo json_encode([]);
}

$conn->close();
?>