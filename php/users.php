<?php
include("./includes/conexion.php");
$conexion->set_charset('utf8');

// MANEJAR LAS PETICIONES DE USUARIOS

// SI ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {

            //CREAR UN USUARIO
        case 'create':
            $username = $_POST["username"];
            $password = $_POST["password"];
            $email = $_POST["email"];

            $check_query = $conexion->query("SELECT * FROM users WHERE username='$username'");
            if ($num = mysqli_num_rows($check_query) > 0) {
                echo "El usuario ya existe";
            } else {
                $insert_query = $conexion->query("INSERT INTO users (username, password, email, rol) VALUES ('$username', '$password', '$email', 1)");
                if ($insert_query) {
                    echo "Usuario creado exitosamente";
                } else {
                    echo "Error al crear usuario";
                }
            }
            break;

            //LOGEAR UN USUARIO
        case 'login':
            $username = $_POST["username"];
            $password = $_POST["password"];
            $sql = $conexion->query("SELECT * FROM users WHERE username='$username'");
            if (mysqli_num_rows($sql) > 0) {
                $row = mysqli_fetch_assoc($sql);
                if ($row['password'] == $password) {
                    $rol = $row['rol'];
                    $email = $row['email'];
                    $id = $row['id_user'];
                    echo json_encode(array("status" => "success", "rol" => $rol, "email" => $email, "id" => $id));
                } else {
                    echo "Contraseña incorrecta";
                }
            } else {
                echo "El usuario no existe";
            }
            break;

            //MODIFICAR UN USUARIO
        case 'update':
            $username = $_POST["username"];
            $password = $_POST["password"];
            $email = $_POST["email"];
            $id = $_POST["id"];

            $update_query = $conexion->query("UPDATE users SET password='$password', email='$email', username='$username' WHERE id_user=$id");
            if ($update_query) {
                echo "Usuario creado exitosamente";
            } else {
                echo "Error al crear usuario";
            }
            break;

        default:
            echo "Acción no válida";
            break;
    }
} else {

    // SI ES GET
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($action) {
        case 'read':
            if (isset($_GET['id_user'])) {
                $codigo = $_GET['id_user'];
                $sql = $conexion->query("SELECT * FROM users WHERE codigo=$codigo ORDER BY id_user");
            } else {
                $sql = $conexion->query("SELECT * FROM users");
            }
            $jsonData = array();
            while ($row = mysqli_fetch_assoc($sql)) {
                $jsonData[] = $row;
            }
            echo json_encode($jsonData);
            break;
        case 'delete':
            $id = $_GET['id'];
            $sql = $conexion->query("SELECT * FROM users WHERE id_user='$id'");
            if (mysqli_num_rows($sql) > 0) {
                $row = mysqli_fetch_assoc($sql);
                if ($row['rol'] == 0) {
                    echo "admin";
                } else {
                    if ($sql = $conexion->query("DELETE FROM users WHERE id_user = '$id'")) {
                        echo "success";
                    } else {
                        echo "error";
                    }
                }
            }
        default:
            break;
    }
}

$conexion->close();
