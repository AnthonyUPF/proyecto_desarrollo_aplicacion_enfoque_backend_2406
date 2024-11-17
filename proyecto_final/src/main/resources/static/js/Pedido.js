const API_URL = "http://localhost:8080/api/pedidos";

// Función para obtener todos los pedidos
function obtenerPedidos() {
    fetch(API_URL + "/todos")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los pedidos');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el cuerpo de la tabla
            const pedidosBody = document.getElementById("pedidosBody");
            pedidosBody.innerHTML = ''; // Limpiar tabla antes de llenarla

            // Llenar la tabla con los pedidos
            data.forEach(pedido => {
                const row = document.createElement("tr");
                row.setAttribute("data-id", pedido.id); // Guardar el id del pedido en el atributo data-id

                row.innerHTML = `
                    <td><span class="editable" data-field="clienteId">${pedido.clienteId}</span></td>
                    <td><span class="editable" data-field="fecha">${pedido.fecha}</span></td>
                    <td><span class="editable" data-field="total">${pedido.total}</span></td>
                    <td><span class="editable" data-field="estado">${pedido.estado}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="activarEdicion(this)">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                    </td>
                `;
                pedidosBody.appendChild(row);
            });
        })
        .catch(error => {
            mostrarMensaje("Error al obtener los pedidos", "alert-danger");
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
    const updatedPedido = {};

    // Obtener los nuevos valores de la fila
    const cells = row.querySelectorAll('td .editable input');
    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        updatedPedido[field] = cell.value;
    });

    fetch(API_URL + "/actualizar/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPedido)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el pedido');
        }
        return response.json();
    })
    .then(pedido => {
        mostrarMensaje("Pedido actualizado correctamente", "alert-success");
        obtenerPedidos(); // Actualizamos la lista de pedidos
    })
    .catch(error => {
        mostrarMensaje("Error al actualizar pedido: " + error.message, "alert-danger");
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

// Función para eliminar un pedido
function eliminarPedido(id) {
    fetch(API_URL + "/eliminar/" + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el pedido');
        }
        mostrarMensaje("Pedido eliminado correctamente", "alert-success");
        obtenerPedidos(); // Actualizamos la lista de pedidos
    })
    .catch(error => {
        mostrarMensaje("Error al eliminar pedido: " + error.message, "alert-danger");
    });
}

// Función para agregar un nuevo pedido
document.getElementById("pedidoForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe por defecto

    const clienteId = document.getElementById("clienteId").value;
    const total = document.getElementById("total").value;
    const estado = document.getElementById("estado").value;

    const nuevoPedido = {
        clienteId: clienteId,
        total: total,
        estado: estado
    };

    fetch(API_URL + "/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPedido)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar pedido");
        }
        return response.json();
    })
    .then(pedido => {
        mostrarMensaje("Pedido agregado correctamente", "alert-success");
        document.getElementById("pedidoForm").reset(); // Limpiar el formulario
        obtenerPedidos(); // Actualizar la lista de pedidos
    })
    .catch(error => {
        mostrarMensaje("Error al agregar pedido: " + error.message, "alert-danger");
    });
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensajePedido");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `alert ${tipo}`;
    mensajeDiv.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}

// Inicializar la aplicación cargando todos los pedidos al cargar la página
document.addEventListener("DOMContentLoaded", obtenerPedidos);
