const API_URL = "http://localhost:8080/api/productos";

// Función para obtener todos los productos
function obtenerProductos() {
    fetch(API_URL + "/todos")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el cuerpo de la tabla
            const productosBody = document.getElementById("productosBody");
            productosBody.innerHTML = ''; // Limpiar tabla antes de llenarla

            // Llenar la tabla con los productos
            data.forEach(producto => {
                const row = document.createElement("tr");
                row.setAttribute("data-id", producto.id); // Guardar el id del producto en el atributo data-id

                row.innerHTML = `
                    <td><span class="editable" data-field="nombre">${producto.nombre}</span></td>
                    <td><span class="editable" data-field="precio">${producto.precio}</span></td>
                    <td><span class="editable" data-field="codigo">${producto.codigo}</span></td>
                    <td><span class="editable" data-field="categoria">${producto.categoria || 'N/A'}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="activarEdicion(this)">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </td>
                `;
                productosBody.appendChild(row);
            });
        })
        .catch(error => {
            mostrarMensaje("Error al obtener los productos", "alert-danger");
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
        const currentValue = cell.textContent;

        cell.setAttribute('data-original-value', currentValue);
        cell.innerHTML = `<input type="text" class="form-control" value="${currentValue}" data-field="${field}" />`;
    });

    button.innerHTML = "Guardar";
    button.setAttribute("onclick", "guardarEdicion(this)");

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
    const updatedProducto = {};

    const cells = row.querySelectorAll('td .editable input');
    cells.forEach(cell => {
        const field = cell.getAttribute('data-field');
        updatedProducto[field] = cell.value;
    });

    fetch(API_URL + "/actualizar/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProducto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        return response.json();
    })
    .then(producto => {
        mostrarMensaje("Producto actualizado correctamente", "alert-success");
        obtenerProductos();
    })
    .catch(error => {
        mostrarMensaje("Error al actualizar producto: " + error.message, "alert-danger");
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

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch(API_URL + "/eliminar/" + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        mostrarMensaje("Producto eliminado correctamente", "alert-success");
        obtenerProductos();
    })
    .catch(error => {
        mostrarMensaje("Error al eliminar producto: " + error.message, "alert-danger");
    });
}

// Función para agregar un nuevo producto
document.getElementById("productoForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const codigo = document.getElementById("codigoProducto").value;
    const categoria = document.getElementById("categoriaProducto").value;

    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        codigo: codigo,
        categoria: categoria
    };

    fetch(API_URL + "/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar producto");
        }
        return response.json();
    })
    .then(producto => {
        mostrarMensaje("Producto agregado correctamente", "alert-success");
        document.getElementById("productoForm").reset();
        obtenerProductos();
    })
    .catch(error => {
        mostrarMensaje("Error al agregar producto: " + error.message, "alert-danger");
    });
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensajeProducto");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `alert ${tipo}`;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}

// Inicializar la aplicación cargando todos los productos
document.addEventListener("DOMContentLoaded", obtenerProductos);
