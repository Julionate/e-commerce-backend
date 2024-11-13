<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permite solicitudes de cualquier origen
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas

$conn = include('../conexion.php');

if (!$conn) {
    die(json_encode(['error' => 'Error en la conexión: ' . mysqli_connect_error()]));
}

// Verifica si la solicitud es de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);

    // Manejo de errores en el formato JSON
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Error en el formato JSON: ' . json_last_error_msg()]);
        exit;
    }

    // Extrae los parámetros necesarios
    $InputIdUsuario = $input['idUsuario'] ?? null;  
    $InputIdProducto = $input['idProducto'] ?? null;
    $InputCritica = $input['critica'] ?? null;
    $InputValoracion = $input['valoracion'] ?? null;

    // Verifica que todos los parámetros estén presentes
    if ($InputIdUsuario && $InputIdProducto && $InputCritica && $InputValoracion) {
        // Prepara la llamada al procedimiento almacenado
        $sql = "CALL postReview(?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Verifica si la preparación fue exitosa
        if (!$stmt) {
            echo json_encode(['error' => 'Error al preparar la consulta: ' . $conn->error]);
            exit;
        }

        // Asocia los parámetros a la declaración
        $stmt->bind_param("sisi", $InputIdUsuario, $InputIdProducto, $InputCritica, $InputValoracion);

        // Ejecuta la declaración
        if ($stmt->execute()) {
            // Si la inserción fue exitosa, devuelve una respuesta exitosa
            echo json_encode(['message' => 'Reseña agregada exitosamente.']);
        } else {
            // En caso de error al ejecutar el procedimiento
            echo json_encode(['error' => 'Error al agregar la reseña: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        // Respuesta si faltan parámetros
        echo json_encode(['error' => 'Faltan parámetros necesarios.']);
    }
} else {
    // Respuesta si la solicitud no es de tipo POST
    echo json_encode(['error' => 'Método no permitido.']);
}

$conn->close();
?>
