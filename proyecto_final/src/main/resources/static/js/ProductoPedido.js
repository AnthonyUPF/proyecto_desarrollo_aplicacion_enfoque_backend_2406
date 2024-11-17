const API_URL = "http://localhost:8080/api/productos-pedidos";

// Función para obtener todos los productos en pedidos
function obtenerProductosPedidos() {
    fetch(API_URL + "/todos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los productos en pedidos");
            }
            return response.json();
        })
        .then(data => {
            const productosPedidosBody = document.getElementById("productosPedidosBody");
            productosPedidosBody.innerHTML = ''; // Limpiar tabla antes de llenarla

            // Llenar la tabla con los productos en pedidos
            data.forEach(productoPedido => {
                const row = document.createElement("tr");
                row.setAttribute("data-id", productoPedido.id);

                row.innerHTML = `
                    <td><span class="editable" data-field="producto_id">${productoPedido.producto_id}</span></td>
                    <td><span class="editable" data-field="pedido_id">${productoPedido.pedido_id}</span></td>
                    <td><span class="editable" data-field="cantidad">${productoPedido.cantidad}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="activarEdicion(this)">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarProductoPedido(${productoPedido.id})">Eliminar</button>
                    </td>
                `;
                productosPedidosBody.appendChild(row);
            });
        })
        .catch(error => {
            mostrarMensaje("Error al obtener los productos en pedidos: " + error.message, "alert-danger");
        });
}

// Función para activar la edición de los datos en la tabla
function activarEdicion(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td .editable');

    const deleteButton = row.querySelector('.btn-danger');
    deleteButton.style.display = 'none';

    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        const originalValue = cell.textContent;
        cell.setAttribute('data-original-value', originalValue);
        cell.innerHTML = `<input type="text" class="form-control" value="${originalValue}" data-field="${field}" />`;
    });

    button.innerHTML = "Guardar";
    button.setAttribute("onclick", "guardarEdicion(this)");

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-secondary";
    cancelButton.textContent = "Cancelar";
    cancelButton.onclick = () => cancelarEdicion(row);
    button.parentNode.appendChild(cancelButton);
}

// Función para guardar la edición
function guardarEdicion(button) {
    const row = button.closest('tr');
    const id = row.getAttribute("data-id");
    const updatedData = {};

    const cells = row.querySelectorAll('td .editable input');
    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        updatedData[field] = cell.value;
    });

    fetch(`${API_URL}/actualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar el producto en pedido");
            }
            return response.json();
        })
        .then(() => {
            mostrarMensaje("Producto en pedido actualizado correctamente", "alert-success");
            obtenerProductosPedidos();
        })
        .catch(error => {
            mostrarMensaje("Error al actualizar producto en pedido: " + error.message, "alert-danger");
        });
}

// Función para cancelar la edición
function cancelarEdicion(row) {
    const cells = row.querySelectorAll('td .editable');

    cells.forEach(cell => {
        const originalValue = cell.getAttribute('data-original-value');
        cell.textContent = originalValue;
    });

    const editButton = row.querySelector('.btn-warning');
    editButton.innerHTML = "Editar";
    editButton.setAttribute("onclick", "activarEdicion(this)");

    const deleteButton = row.querySelector('.btn-danger');
    deleteButton.style.display = 'inline-block';

    const cancelButton = row.querySelector('.btn-secondary');
    cancelButton.remove();
}

// Función para eliminar un producto en pedido
function eliminarProductoPedido(id) {
    fetch(`${API_URL}/eliminar/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar producto en pedido");
            }
            mostrarMensaje("Producto eliminado del pedido correctamente", "alert-success");
            obtenerProductosPedidos();
        })
        .catch(error => {
            mostrarMensaje("Error al eliminar producto en pedido: " + error.message, "alert-danger");
        });
}

// Función para agregar un nuevo producto a un pedido
document.getElementById("productoPedidoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const productoId = document.getElementById("productoId").value;
    const pedidoId = document.getElementById("pedidoId").value;
    const cantidad = document.getElementById("cantidad").value;

    const nuevoProductoPedido = { producto_id: productoId, pedido_id: pedidoId, cantidad };

    fetch(`${API_URL}/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProductoPedido)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al agregar producto a pedido");
            }
            return response.json();
        })
        .then(() => {
            mostrarMensaje("Producto agregado al pedido correctamente", "alert-success");
            document.getElementById("productoPedidoForm").reset();
            obtenerProductosPedidos();
        })
        .catch(error => {
            mostrarMensaje("Error al agregar producto a pedido: " + error.message, "alert-danger");
        });
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensajeProductoPedido");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `alert ${tipo}`;
    mensajeDiv.style.display = 'block';

    setTimeout(() => { mensajeDiv.style.display = 'none'; }, 5000);
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", obtenerProductosPedidos);
