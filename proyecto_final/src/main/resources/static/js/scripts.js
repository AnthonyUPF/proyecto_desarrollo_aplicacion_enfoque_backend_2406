document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const productoForm = document.getElementById('productoForm');
    const clientesDiv = document.getElementById('clientes');
    const productosDiv = document.getElementById('productos');
    const mensajeClienteDiv = document.getElementById('mensajeCliente');
    const mensajeProductoDiv = document.getElementById('mensajeProducto');

    let clienteEdicion = null;
    let productoEdicion = null;

    // Función para obtener los productos desde la API
    function obtenerProductos() {
        fetch('/api/productos')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar productos');
                return response.json();
            })
            .then(productos => {
                productosDiv.innerHTML = '';
                productos.forEach(producto => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <p>${producto.nombre} - $${producto.precio}</p>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        <button onclick="editarProducto(${producto.id})">Editar</button>
                    `;
                    productosDiv.appendChild(div);
                });
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeProductoDiv));
    }

    // Función para obtener los clientes desde la API
    function obtenerClientes() {
        fetch('/api/clientes')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar clientes');
                return response.json();
            })
            .then(clientes => {
                clientesDiv.innerHTML = '';
                clientes.forEach(cliente => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <p>${cliente.nombre} - ${cliente.correo}</p>
                        <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                    `;
                    clientesDiv.appendChild(div);
                });
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeClienteDiv));
    }

    // Función para mostrar mensajes de éxito o error
    function mostrarMensaje(mensaje, tipo, contenedor) {
        contenedor.textContent = mensaje;
        contenedor.className = `message ${tipo}`;
        contenedor.style.display = 'block';
        setTimeout(() => contenedor.style.display = 'none', 3000);
    }

    // Manejo de envío del formulario de clientes
    clienteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreCliente').value;
        const correo = document.getElementById('correoCliente').value;

        const url = clienteEdicion ? `/api/clientes/${clienteEdicion.id}` : '/api/clientes';
        const method = clienteEdicion ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    mostrarMensaje('Error: El correo ya está registrado.', 'error', mensajeClienteDiv);
                } else {
                    throw new Error('Error al guardar cliente.');
                }
            } else {
                obtenerClientes();
                clienteForm.reset();
                clienteEdicion = null;
                mostrarMensaje('Cliente guardado con éxito.', 'success', mensajeClienteDiv);
            }
        })
        .catch(error => mostrarMensaje(error.message, 'error', mensajeClienteDiv));
    });

    // Manejo de envío del formulario de productos
    productoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreProducto').value;
        const precio = parseFloat(document.getElementById('precioProducto').value);

        // Validación de campos antes de enviar la solicitud
        if (!nombre || isNaN(precio) || precio <= 0) {
            mostrarMensaje('El nombre y el precio del producto son obligatorios y el precio debe ser un número positivo.', 'error', mensajeProductoDiv);
            return; // No enviar si los datos no son válidos
        }

        const url = productoEdicion ? `/api/productos/${productoEdicion.id}` : '/api/productos';
        const method = productoEdicion ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.json().then(data => {
                        mostrarMensaje(data.message || 'Error al guardar producto.', 'error', mensajeProductoDiv);
                    });
                } else {
                    throw new Error('Error al guardar producto.');
                }
            } else {
                obtenerProductos();
                productoForm.reset();
                productoEdicion = null;
                mostrarMensaje('Producto guardado con éxito.', 'success', mensajeProductoDiv);
            }
        })
        .catch(error => mostrarMensaje(error.message, 'error', mensajeProductoDiv));
    });

    // Funciones para eliminar y editar clientes
    window.eliminarCliente = (id) => {
        fetch(`/api/clientes/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Error al eliminar cliente.');
                obtenerClientes();
                mostrarMensaje('Cliente eliminado.', 'success', mensajeClienteDiv);
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeClienteDiv));
    };

    window.editarCliente = (id) => {
        fetch(`/api/clientes/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar cliente.');
                return response.json();
            })
            .then(cliente => {
                document.getElementById('nombreCliente').value = cliente.nombre;
                document.getElementById('correoCliente').value = cliente.correo;
                clienteEdicion = cliente;
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeClienteDiv));
    };

    // Funciones para eliminar y editar productos
    window.eliminarProducto = (id) => {
        fetch(`/api/productos/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Error al eliminar producto.');
                obtenerProductos();
                mostrarMensaje('Producto eliminado.', 'success', mensajeProductoDiv);
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeProductoDiv));
    };

    window.editarProducto = (id) => {
        fetch(`/api/productos/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar producto.');
                return response.json();
            })
            .then(producto => {
                document.getElementById('nombreProducto').value = producto.nombre;
                document.getElementById('precioProducto').value = producto.precio;
                productoEdicion = producto;
            })
            .catch(error => mostrarMensaje(error.message, 'error', mensajeProductoDiv));
    };

    // Inicializar las listas de productos y clientes
    obtenerClientes();
    obtenerProductos();
});
