$(document).ready(function () {

    //LAS BANDERA BOOLEANAS
    let acceptedUser = false;
    let acceptedEmail = false;
    let acceptedPass = false;
    $('#submitBtn').prop("disabled", true);

    //LAS VALIDACIONES EN JS
    $('#usernameInput').on("input", function () {
        let name = $('#usernameInput').val();
        let nameRegex = /^\S{5,15}$/;
        if (name.length > 0) {
            if (nameRegex.test(name)) {
                $('#usernameHelp').text("");
                acceptedUser = true;
            } else {
                if (name.length < 5 || name.length > 15) {
                    acceptedUser = false;
                    $('#usernameHelp').text("El nombre debe tener entre 5 y 15 caracteres.");
                } else {
                    acceptedUser = false;
                    $('#usernameHelp').text("El nombre no puede contener espacios en blanco.");
                }
            }
        }
        enableSubmitButton();
    });

    $('#emailInput').on("input", function () {
        let email = $('#emailInput').val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            acceptedEmail = true
            $('#emailHelp').text("");
        } else {
            acceptedEmail = false;
            $('#emailHelp').text("Ingrese una dirección de correo electrónico válida.");
        }
        enableSubmitButton();
    });

    $('#passwordInput').on("input", function () {
        let password = $('#passwordInput').val();
        let passwordRegex = /^\S{8,}$/;
        if (passwordRegex.test(password)) {
            acceptedPass = true;
            $('#passwordHelp').text("");
        } else {
            acceptedPass = false;
            $('#passwordHelp').text("La contraseña debe tener al menos 8 caracteres y no puede contener espacios en blanco.");
        }
        enableSubmitButton();
    });

    // Función para habilitar o deshabilitar el botón de envío
    function enableSubmitButton() {
        if (acceptedUser && acceptedEmail && acceptedPass) {
            $('#submitBtn').prop("disabled", false);
        } else {
            $('#submitBtn').prop("disabled", true);
        }
    }

    // Evento para crear el usuario
    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        event.preventDefault();
        let username = $('#usernameInput').val();
        let password = $('#passwordInput').val();
        let email = $('#emailInput').val();
        let action = 'create';

        $.ajax({
            type: "POST",
            url: "php/users.php",
            data: {
                action: action,
                username: username,
                password: password,
                email: email,
            },
            success: function (response) {
                if (response === "success") {
                    $('#loginHelp').text("Usuario creado correctamente, se le redirigirá al login");
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 2000);
                } else if (response === "El usuario ya existe") {
                    $('#loginHelp').text("Ese nombre no está disponible, por favor elija otro");
                } else {
                    $('#loginHelp').text("Error en la creación del usuario: " + response.statusText);
                }
            },
            error: function (xhr) {
                console.log("Error en la solicitud AJAX:", xhr.statusText);
                $('#loginHelp').text("Hubo un problema en la creación de su usuario")
            }
        });
    });
});
