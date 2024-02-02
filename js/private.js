$(document).ready(function () {
    if (!sessionStorage.getItem("rol")) {
        location.href = "login.html"
    }
    if (sessionStorage.getItem("rol") === "0") {

        // EL USUARIO ES UN ADMIN
        $('.mainContent').empty();
        $('.mainContentAdmin_container_top').css({ "display": "none" });

        //CREAR EL CONTENEDOR DEL SELECT-OPTION DEL FORMULARIO
        var articleSelectMap = new Map();

        //LOS BOTONES PARA MOSTRAR LAS TABLAS
        $('#gameTable').on("click", function () {
            $('.mainContentAdmin_container_top').css({ "display": "flex", "align-items": "center", "flex-direction": "column" });
            $('#articleForm').css({ "display": "block" });
            $('#categoryForm').css({ "display": "none" });
            $('#userForm').css({ "display": "none" });
            $.ajax({
                type: "GET",
                url: `php/articles.php`,
                data: {
                    action: "read",
                },
                success: function (res) {
                    localStorage.setItem("currentData", res);
                    printGamesTable(JSON.parse(res));
                },
                error: function (err) {
                    console.log("Error en la solicitud AJAX" + err);
                }
            });
        });
        function printGamesTable(rowData) {
            // VACIAR EL DIV ANTES DE PINTAR
            $('.mainContentAdmin_container_table').empty();

            // MONTAR LA TABLA
            var table = $('<table>').addClass('table');
            var thead = $('<thead>');
            var tbody = $('<tbody>');

            // ENCABEZADOS
            var headers = ['name', 'brand', 'stock', 'description', 'details', 'img', 'category'];
            var headerRow = $('<tr>');
            $.each(headers, function (_, header) {
                headerRow.append($('<th>').text(header));
            });
            thead.append(headerRow);

            // CREAR LAS FILAS
            $.each(rowData, function (_, row) {
                var dataRow = $('<tr>');
                $.each(headers, function (_, header) {
                    dataRow.append($('<td>').text(row[header]));
                });

                // Agregar las categorias al set para su uso
                articleSelectMap.set(row["id_category"], row['category']);

                // Agregar celda oculta
                var hiddenCell = $('<td>').attr('id', 'hidden').css('display', 'none').text(row["id_article"]);

                // Agregar celdas de botones a la fila
                var editButtonCell = $('<td>').append($('<button>', {
                    text: "Editar",
                    class: "editButton",
                    id: "ediGameBtn",
                }));
                var deleteButtonCell = $('<td>').append($('<button>', {
                    text: "Eliminar",
                    class: "deleteButton",
                    id: "delGameBtn",
                }));

                // Agregar celdas de botones a la fila
                dataRow.append(hiddenCell).append(editButtonCell).append(deleteButtonCell);

                tbody.append(dataRow);
            });

            // AGREGAR LOS DATOS
            table.append(thead).append(tbody);
            $('.mainContentAdmin_container_table').append(table);

            //PINTAR LOS OPTION DEL FORMULARIO
            for (const [index, valor] of articleSelectMap) {
                $('#categoryArticleInput').append($('<option>', {
                    value: index,
                    text: valor,
                }));
            }
        };

        $('#categoryTable').on("click", function () {
            $('.mainContentAdmin_container_top').css({ "display": "flex" });
            $('#categoryForm').css({ "display": "block" });
            $('#articleForm').css({ "display": "none" });
            $('#userForm').css({ "display": "none" });
            $.ajax({
                type: "GET",
                url: `php/categories.php`,
                data: {
                    action: "read",
                },
                success: function (res) {
                    localStorage.setItem("currentData", res);
                    printCategoriesTable(JSON.parse(res));
                },
                error: function (err) {
                    console.log("Error en la solicitud AJAX" + err);
                }
            });
        });
        function printCategoriesTable(rowData) {
            // VACIAR EL DIV ANTES DE PINTAR
            $('.mainContentAdmin_container_table').empty();

            // MONTAR LA TABLA
            var table = $('<table>').addClass('table');
            var thead = $('<thead>');
            var tbody = $('<tbody>');

            // ENCABEZADOS
            var headers = ['category'];
            var headerRow = $('<tr>');
            $.each(headers, function (_, header) {
                headerRow.append($('<th>').text(header));
            });
            thead.append(headerRow);

            // CREAR LAS FILAS
            $.each(rowData, function (_, row) {
                var dataRow = $('<tr>');
                $.each(headers, function (_, header) {
                    dataRow.append($('<td>').text(row[header]));
                });

                // Agregar celda oculta
                var hiddenCell = $('<td>').attr('id', 'hidden').css('display', 'none').text(row["id_category"]);

                // Agregar celdas de botones a la fila
                var editButtonCell = $('<td>').append($('<button>', {
                    text: "Editar",
                    class: "editButton",
                    id: "ediCategoryBtn",

                }));
                var deleteButtonCell = $('<td>').append($('<button>', {
                    text: "Eliminar",
                    class: "deleteButton",
                    id: "delCategoryBtn",

                }));

                // Agregar celdas de botones a la fila
                dataRow.append(hiddenCell).append(editButtonCell).append(deleteButtonCell);

                tbody.append(dataRow);
            });

            // AGREGAR LOS DATOS
            table.append(thead).append(tbody);
            $('.mainContentAdmin_container_table').append(table);
        };

        $('#usersTable').on("click", function () {
            $('.mainContentAdmin_container_top').css({ "display": "flex" });
            $('#userForm').css({ "display": "block" });
            $('#categoryForm').css({ "display": "none" });
            $('#articleForm').css({ "display": "none" });
            $.ajax({
                type: "GET",
                url: "php/users.php",
                data: {
                    action: "read",
                },
                success: function (res) {
                    localStorage.setItem("currentData", res);
                    printUsersTable(JSON.parse(res));
                },
                error: function (err) {
                    console.log("Error en la solicitud AJAX" + err);
                }
            });
        });
        function printUsersTable(rowData) {
            // VACIAR EL DIV ANTES DE PINTAR
            $('.mainContentAdmin_container_table').empty();

            // MONTAR LA TABLA
            var table = $('<table>').addClass('table');
            var thead = $('<thead>');
            var tbody = $('<tbody>');

            // ENCABEZADOS
            var headers = ['username', 'password', 'email', 'rol'];
            var headerRow = $('<tr>');
            $.each(headers, function (_, header) {
                headerRow.append($('<th>').text(header));
            });
            thead.append(headerRow);

            // CREAR LAS FILAS
            $.each(rowData, function (_, row) {
                var dataRow = $('<tr>');
                $.each(headers, function (_, header) {
                    dataRow.append($('<td>').text(row[header]));
                });

                // Agregar celda oculta
                var hiddenCell = $('<td>').attr('id', 'hidden').css('display', 'none').text(row["id_user"]);

                // Agregar celdas de botones a la fila
                var editButtonCell = $('<td>').append($('<button>', {
                    text: "Editar",
                    class: "editButton",
                    id: "ediUserBtn",

                }));
                var deleteButtonCell = $('<td>').append($('<button>', {
                    text: "Eliminar",
                    class: "deleteButton",
                    id: "delUserBtn",

                }));

                // Agregar celdas de botones a la fila
                dataRow.append(hiddenCell).append(editButtonCell).append(deleteButtonCell);

                tbody.append(dataRow);
            });

            // AGREGAR LOS DATOS
            table.append(thead).append(tbody);
            $('.mainContentAdmin_container_table').append(table);
        };

        // FUNCIÓN BORRAR ARTICLE
        $(document).on("click", "#delGameBtn", function () {
            if (confirm("¿Seguro que desea borrar ese artículo?")) {
                $.ajax({
                    type: "GET",
                    url: "php/articles.php",
                    data: {
                        action: "delete",
                        id: $(this).parent().parent().children('#hidden').text()
                    },
                    success: function (res) {
                        alert("El borrado del artículo se ha realizado con éxito");
                        location.href = "./private.html";
                    },
                    error: function (err) {
                        console.log("Error en la solicitud AJAX" + err);
                    }
                });
            }
        });
        // FUNCIÓN BORRAR USER
        $(document).on("click", "#delUserBtn", function () {
            if (confirm("¿Seguro que desea borrar ese usuario?")) {
                $.ajax({
                    type: "GET",
                    url: "php/users.php",
                    data: {
                        action: "delete",
                        id: $(this).parent().parent().children('#hidden').text()
                    },
                    success: function (res) {
                        if (res == "admin") {
                            alert("Ud. no puede borrar un administrador");
                        } else if (res == "success") {
                            alert("El borrado del usuario se ha realizado con éxito");
                            location.href = "./private.html";
                        }
                    },
                    error: function (err) {
                        console.log("Error en la solicitud AJAX" + err);
                    }
                });
            }
        });
        // FUNCIÓN BORRAR CATEGORY
        $(document).on("click", "#delCategoryBtn", function () {
            if (confirm("¿Seguro que desea borrar esa categoria?")) {
                $.ajax({
                    type: "GET",
                    url: "php/categories.php",
                    data: {
                        action: "delete",
                        id: $(this).parent().parent().children('#hidden').text()
                    },
                    success: function (res) {
                        console.log(res);
                        alert("El borrado de la categoria se ha realizado con éxito");
                        location.href = "./private.html";
                    },
                    error: function (err) {
                        console.log("Error en la solicitud AJAX" + err);
                    }
                });
            }
        });

        // FUNCIÓN PARA INSERTAR UN ARTICLE
        $(document).on("click", "#createArticleInput", function (event) {
            event.preventDefault();
            // LOS VALORES
            let nameNewArticle = $('#nameArticleInput').val()
            let brandArticleInput = $('#brandArticleInput').val()
            let stockArticleInput = $('#stockArticleInput').val()
            let priceArticleInput = $('#priceArticleInput').val()
            let descriptionArticleInput = $('#descriptionArticleInput').val()
            let detailsArticleInput = $('#detailsArticleInput').val()
            let imgArticleInput = $('#imgArticleInput').val()
            let selectedCategory = $('#categoryArticleInput').children('option:selected').val();
            let id_article = $('#hiddenIdArticleInput').val();
            console.log(id_article);
            // LAS VALIDACIONES
            if (nameNewArticle.length > 0 &&
                brandArticleInput.length > 0 &&
                descriptionArticleInput.length < 1000 &&
                detailsArticleInput.length < 1000
            ) {
                $('#articleInputHelper').text("");
                if ($('#hiddenIdArticleInput').val() == "" || $('#hiddenIdArticleInput').val() == undefined) {
                    let newArticle = [nameNewArticle, brandArticleInput, stockArticleInput, priceArticleInput, descriptionArticleInput, detailsArticleInput, imgArticleInput, selectedCategory]
                    console.log(selectedCategory);
                    $.ajax({
                        type: "GET",
                        url: `php/articles.php`,
                        data: {
                            action: "create",
                            data: newArticle,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                } else {
                    let updateArticle = [id_article, nameNewArticle, brandArticleInput, stockArticleInput, priceArticleInput, descriptionArticleInput, detailsArticleInput, imgArticleInput, selectedCategory]
                    console.log(selectedCategory);
                    $.ajax({
                        type: "GET",
                        url: `php/articles.php`,
                        data: {
                            action: "update",
                            data: updateArticle,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                }

            } else {
                $('#articleInputHelper').text("Ha introducido un elemento incorrectamente");
            }
        });

        // FUNCIÓN PARA CARGAR LOS DATOS DE UN ARTICLE PARA EDITAR
        $(document).on("click", "#ediGameBtn", function () {
            //VACIAR EL FORM
            $('#nameArticleInput').val("");
            $('#brandArticleInput').val("");
            $('#stockArticleInput').val("");
            $('#priceArticleInput').val("");
            $('#descriptionArticleInput').val("");
            $('#detailsArticleInput').val("");
            $('#imgArticleInput').val("");
            $('option[val="1"]').prop("selected");
            $('#hiddenIdArticleInput').val("");
            // EXTRAER LOS DATOS
            let currentArticle;
            for (const data of JSON.parse(localStorage.getItem("currentData"))) {
                if ($(this).parent().parent().children('#hidden').text() == data.id_article) {
                    currentArticle = data;
                    break;
                }
            }
            // LOS VALORES
            console.log(currentArticle);
            $('#nameArticleInput').val(currentArticle.name);
            $('#brandArticleInput').val(currentArticle.brand);
            $('#stockArticleInput').val(currentArticle.stock);
            $('#priceArticleInput').val(currentArticle.price);
            $('#descriptionArticleInput').val(currentArticle.description);
            $('#detailsArticleInput').val(currentArticle.details);
            $('#imgArticleInput').val(currentArticle.img);
            $('#hiddenIdArticleInput').val(currentArticle.id_article);
            $('select option').each(function () {
                if ($(this).val() == currentArticle.id_category) {
                    $(this).prop('selected', true);
                    return false;
                }
            });

        });

        // FUNCIÓN PARA INSERTAR UNA CATEGORY
        $(document).on("click", "#createCategoryInput", function (event) {
            event.preventDefault();
            // LOS VALORES
            let nameNewCategory = $('#categroyCategoryInput').val()
            let id_category = $('#hiddenIdCategoryInput').val();
            // LAS VALIDACIONES
            if (nameNewCategory.length > 0) {
                $('#categoryInputHelper').text("");
                if (id_category == "" || id_category == undefined) {
                    let newCategory = [nameNewCategory];
                    $.ajax({
                        type: "GET",
                        url: `php/categories.php`,
                        data: {
                            action: "create",
                            data: newCategory,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                } else {
                    let updateCategory = [id_category, nameNewCategory];
                    console.log(updateCategory);
                    $.ajax({
                        type: "GET",
                        url: `php/categories.php`,
                        data: {
                            action: "update",
                            data: updateCategory,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                }

            } else {
                $('#categoryInputHelper').text("Ha introducido un elemento incorrectamente");
            }
        });

        // FUNCIÓN PARA CARGAR LOS DATOS DE UN ARTICLE PARA EDITAR
        $(document).on("click", "#ediCategoryBtn", function () {
            //VACIAR EL FORM
            $('#categroyCategoryInput').val("");
            $('#hiddenIdCategoryInput').val("");
            // EXTRAER LOS DATOS
            let currentCategory;
            for (const data of JSON.parse(localStorage.getItem("currentData"))) {
                if ($(this).parent().parent().children('#hidden').text() == data.id_category) {
                    currentCategory = data;
                    break;
                }
            }
            // LOS VALORES
            $('#categroyCategoryInput').val(currentCategory.category);
            $('#hiddenIdCategoryInput').val(currentCategory.id_category);

        });

        // FUNCIÓN PARA INSERTAR UN USER
        $(document).on("click", "#createuserInput", function (event) {
            event.preventDefault();
            // LOS VALORES
            let nameNewuser = $('#userUsernameInput').val()
            let passwordNewuser = $('#userPasswordInput').val()
            let emailNewuser = $('#userEmailInput').val()
            let id_user = $('#hiddenIdUserInput').val();
            // LAS VALIDACIONES
            if (nameNewuser.length > 0) {
                $('#userInputHelper').text("");
                if (id_user == "" || id_user == undefined) {
                    $.ajax({
                        type: "POST",
                        url: `php/users.php`,
                        data: {
                            action: "create",
                            username: nameNewuser,
                            password: passwordNewuser,
                            email: emailNewuser,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        url: `php/users.php`,
                        data: {
                            action: "update",
                            username: nameNewuser,
                            password: passwordNewuser,
                            email: emailNewuser,
                            id: id_user,
                        },
                        success: function (res) {
                            location.href = "./private.html";
                        },
                        error: function (err) {
                            console.log("Error en la solicitud AJAX" + err);
                        }
                    });
                }

            } else {
                $('#userInputHelper').text("Ha introducido un elemento incorrectamente");
            }
        });

        // FUNCIÓN PARA CARGAR LOS DATOS DE UN USER PARA EDITAR
        $(document).on("click", "#ediUserBtn", function () {
            //VACIAR EL FORM
            $('#userUsernameInput').val("");
            $('#userPasswordInput').val("");
            $('#userEmailInput').val("");
            $('#userRolInput').val("");
            $('#hiddenIdUserInput').val("");
            // EXTRAER LOS DATOS
            let currentUser;
            for (const data of JSON.parse(localStorage.getItem("currentData"))) {
                if ($(this).parent().parent().children('#hidden').text() == data.id_user) {
                    currentUser = data;
                    break;
                }
            }
            console.log(currentUser);
            // LOS VALORES
            $('#userUsernameInput').val(currentUser.username);
            $('#userPasswordInput').val(currentUser.password);
            $('#userEmailInput').val(currentUser.email);
            $('#userRolInput').val(currentUser.rol);
            $('#hiddenIdUserInput').val(currentUser.id_user);

        });
    } else {

        // EL USUARIO ES UN USER
        $('.mainContentAdmin').empty();

        //MENSAJE DE BIENVENIDA
        $('h5').text("Bienvenido  " + sessionStorage.getItem("username"));

        //RELLENAR EL FORMULARIO CON SUS DATOS
        $('input[id="username"]').val(sessionStorage.getItem("username"));
        $('input[id="password"]').val(sessionStorage.getItem("password"));
        $('input[id="email"]').val(sessionStorage.getItem("email"));

        //MODIFICAR SUS DATOS
        $('#updateUserDataBtn').on("click", function (event) {
            event.preventDefault();
            if (confirm("¿Va a realizar cambios en los datos de su perfil, ¿Continuar?")) {
                $.ajax({
                    type: "POST",
                    url: "php/users.php",
                    data: {
                        id: sessionStorage.getItem("id"),
                        username: $('input[id="username"]').val(),
                        password: $('input[id="password"]').val(),
                        email: $('input[id="email"]').val(),
                        action: "update",
                    },
                    success: function (res) {
                        $('#updateHelper').text("Usuario modificado correctamente");
                        sessionStorage.setItem("username", $('input[id="username"]').val());
                        sessionStorage.setItem("email", $('input[id="email"]').val());
                        sessionStorage.setItem("password", $('input[id="password"]').val());
                        alert("Usuario modificado correctamente");
                        setTimeout(function () {
                            location.href = "private.html";
                        }, 2000);
                    },
                    error: function (err) {
                        console.log("Error en la solicitud AJAX" + err);
                    }
                });
            }
        });
    }
});