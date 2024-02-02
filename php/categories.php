<?php
include("./includes/conexion.php");
$conexion->set_charset('utf8');

// SI ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $action = isset($_POST['action']) ? $_POST['action'] : '';
} else {
    // SI ES GET
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($action) {
        case 'create':
            $data = $_GET['data'];
            if ($sql = $conexion->query("INSERT INTO categories (id_category, category) VALUES (NULL, '$data[0]')")) {
                echo "success";
            } else {
                echo "error";
            }
            break;
        case 'read':
            $sql = $conexion->query("SELECT * FROM categories");

            $jsonData = array();

            while ($row = mysqli_fetch_assoc($sql)) {
                $jsonData[] = $row;
            }

            echo json_encode($jsonData);
            break;
        case 'update':
            $data = $_GET['data'];
            if ($sql = $conexion->query("UPDATE categories SET category='$data[1]' WHERE id_category=$data[0];")) {
                echo "success";
            } else {
                echo "error";
            }
            break;
        case 'delete':
            $id = $_GET['id'];
            if ($sql = $conexion->query("DELETE FROM categories WHERE id_category = '$id'")) {
                echo "borrado ok";
            } else {
                echo "error";
            }
        default:
            break;
    }
}

$conexion->close();
