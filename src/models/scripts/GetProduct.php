<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permite solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas

$conn = include('../conexion.php');

// Recoge los parámetros GET
$productId = isset($_GET['productId']) ? htmlspecialchars($_GET['productId']) : ''; // Marcas como una cadena separada por comas

// Prepara la consulta SQL para llamar al procedimiento almacenado
$sql = "CALL getProductInformation(?)";
$stmt = $conn->prepare($sql);

// Enlaza los parámetros (página, límite, búsqueda y marcas)
$stmt->bind_param("s", $productId); // 'iiss' indica dos enteros y dos cadenas
$stmt->execute();

$result = $stmt->get_result(); // Obtén el resultado de la consulta

if (!$result) {
    die("Error en la consulta SQL: " . $conn->error);
}

if ($result->num_rows > 0) {
    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products); // Devuelve los productos como JSON
} else {
    echo json_encode([]); // Si no hay resultados, devuelve un array vacío
}

$conn->close();
?>