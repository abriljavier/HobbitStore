$(document).ready(function () {

    if (sessionStorage.getItem("remembered")) {
        $('#usernameInput').val(sessionStorage.getItem("username"));
        $('#passwordInput').val(sessionStorage.getItem("password"));
    }

    //LA LÓGICA DEL FORMULARIO
    $('input[type="submit"]').on("click", function (event) {
        event.preventDefault();

        let name = $('#usernameInput').val();
        let password = $('#passwordInput').val();
        let loginHelp = $('#loginHelp');

        if (name.length < 4) {
            $(loginHelp).css({ "color": "red" });
            $(loginHelp).text("Su nombre de usuario no puede ser menor de 4 carácteres");
            $('#usernameInput').val('');
            return;
        }

        $.ajax({
            type: "POST",
            url: "php/users.php",
            data: {
                "username": name,
                "password": password,
                action: "login",
            },
            success: function (res) {
                if (res === "Contraseña incorrecta" || res === "El usuario no existe") {
                    $(loginHelp).css({ "color": "red" });
                    $(loginHelp).text("Nombre de usuario o contraseña incorrectos");
                    $('#usernameInput').val('');
                    return;
                } else {
                    sessionStorage.setItem("rol", JSON.parse(res).rol);
                    sessionStorage.setItem("username", $('#usernameInput').val());
                    sessionStorage.setItem("password", $('#passwordInput').val());
                    sessionStorage.setItem("email", JSON.parse(res).email);
                    sessionStorage.setItem("id", JSON.parse(res).id);
                    if ($('input[type="checkbox"]').prop("checked")) {
                        sessionStorage.setItem("remembered", true)
                    }
                    location.href = 'private.html';
                }
            },
            error: function (err) {
                console.log("Error en la solicitud AJAX");
            }
        });
    });
});