const API_URL = "http://localhost:8080/api/clientes";

// Función para obtener todos los clientes
function obtenerClientes() {
    fetch(API_URL + "/todos")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los clientes');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el cuerpo de la tabla
            const clientesBody = document.getElementById("clientesBody");
            clientesBody.innerHTML = ''; // Limpiar tabla antes de llenarla

            // Llenar la tabla con los clientes
            data.forEach(cliente => {
                const row = document.createElement("tr");
                row.setAttribute("data-id", cliente.id); // Guardar el id del cliente en el atributo data-id

                row.innerHTML = `
                    <td><span class="editable" data-field="nombre">${cliente.nombre}</span></td>
                    <td><span class="editable" data-field="correo">${cliente.correo}</span></td>
                    <td><span class="editable" data-field="direccion">${cliente.direccion || 'N/A'}</span></td>
                    <td><span class="editable" data-field="telefono">${cliente.telefono}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="activarEdicion(this)">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                    </td>
                `;
                clientesBody.appendChild(row);
            });
        })
        .catch(error => {
            mostrarMensaje("Error al obtener los clientes", "alert-danger");
        });
}

// Función para activar la edición de los datos en la tabla
function activarEdicion(button) {
    const row = button.closest('tr'); // Obtener la fila que contiene el botón
    const cells = row.querySelectorAll('td .editable');

    // Ocultar el botón de eliminar
    const deleteButton = row.querySelector('.btn-danger');
    deleteButton.style.display = 'none';

    // Guardar los valores originales
    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        const currentValue = cell.textContent;

        // Guardar el valor original en el atributo "data-original-value"
        cell.setAttribute('data-original-value', currentValue);

        // Reemplazar el contenido con un campo de entrada
        cell.innerHTML = `<input type="text" class="form-control" value="${currentValue}" data-field="${field}" />`;
    });

    // Reemplazar el botón "Editar" por los botones de "Guardar" y "Cancelar"
    button.innerHTML = "Guardar";
    button.setAttribute("onclick", "guardarEdicion(this)");

    // Crear y añadir el botón "Cancelar"
    const cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-secondary";
    cancelButton.textContent = "Cancelar";
    cancelButton.onclick = function() {
        cancelarEdicion(row);
    };
    button.parentNode.appendChild(cancelButton);
}

// Función para guardar la edición
function guardarEdicion(button) {
    const row = button.closest('tr');
    const id = row.getAttribute("data-id");
    const updatedClient = {};

    // Obtener los nuevos valores de la fila
    const cells = row.querySelectorAll('td .editable input');
    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        updatedClient[field] = cell.value;
    });

    fetch(API_URL + "/actualizar/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        return response.json();
    })
    .then(cliente => {
        mostrarMensaje("Cliente actualizado correctamente", "alert-success");
        obtenerClientes(); // Actualizamos la lista de clientes
    })
    .catch(error => {
        mostrarMensaje("Error al actualizar cliente: " + error.message, "alert-danger");
    });
}

// Función para cancelar la edición
function cancelarEdicion(row) {
    const cells = row.querySelectorAll('td .editable');

    // Restaurar los valores originales
    cells.forEach(cell => {
        const originalValue = cell.getAttribute('data-original-value'); // Recuperar el valor original
        cell.textContent = originalValue; // Restaurar el valor original
    });

    // Restaurar los botones de "Editar"
    const editButton = row.querySelector('.btn-warning');
    editButton.innerHTML = "Editar";
    editButton.setAttribute("onclick", "activarEdicion(this)");

    // Mostrar el botón de eliminar nuevamente
    const deleteButton = row.querySelector('.btn-danger');
    deleteButton.style.display = 'inline-block';

    // Eliminar el botón "Cancelar"
    const cancelButton = row.querySelector('.btn-secondary');
    cancelButton.remove();
}

// Función para eliminar un cliente
function eliminarCliente(id) {
    fetch(API_URL + "/eliminar/" + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
        mostrarMensaje("Cliente eliminado correctamente", "alert-success");
        obtenerClientes(); // Actualizamos la lista de clientes
    })
    .catch(error => {
        mostrarMensaje("Error al eliminar cliente: " + error.message, "alert-danger");
    });
}

// Función para agregar un nuevo cliente
document.getElementById("clienteForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe por defecto

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    const nuevoCliente = {
        nombre: nombre,
        correo: correo,
        direccion: direccion,
        telefono: telefono
    };

    fetch(API_URL + "/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoCliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar cliente");
        }
        return response.json();
    })
    .then(cliente => {
        mostrarMensaje("Cliente agregado correctamente", "alert-success");
        document.getElementById("clienteForm").reset(); // Limpiar el formulario
        obtenerClientes(); // Actualizar la lista de clientes
    })
    .catch(error => {
        mostrarMensaje("Error al agregar cliente: " + error.message, "alert-danger");
    });
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensajeCliente");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `alert ${tipo}`;
    mensajeDiv.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}

// Inicializar la aplicación cargando todos los clientes al cargar la página
document.addEventListener("DOMContentLoaded", obtenerClientes);
