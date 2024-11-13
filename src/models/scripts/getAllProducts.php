<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permite solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas


$conn = include('../conexion.php');


$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;


$sql = "CALL getProducts(?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $page, $limit); // Bind de los parámetros
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

