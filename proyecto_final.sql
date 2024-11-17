-- Borrar el esquema si ya existe y crear uno nuevo
DROP SCHEMA IF EXISTS proyecto_final_uf2406;
CREATE SCHEMA IF NOT EXISTS proyecto_final_uf2406;
USE proyecto_final_uf2406;

-- Crear la tabla Cliente
CREATE TABLE IF NOT EXISTS clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- Insertar 10 registros en la tabla Cliente
INSERT INTO clientes (nombre, correo, direccion, telefono) VALUES
('Juan Pérez', 'juan.perez@mail.com', 'Calle Falsa 123', '123456789'),
('Ana Gómez', 'ana.gomez@mail.com', 'Av. Siempre Viva 456', '234567890'),
('Carlos López', 'carlos.lopez@mail.com', 'Calle 7 789', '345678901'),
('Marta Rodríguez', 'marta.rodriguez@mail.com', 'Calle 10 101', '456789012'),
('Luis Fernández', 'luis.fernandez@mail.com', 'Calle Principal 11', '567890123'),
('Elena Martínez', 'elena.martinez@mail.com', 'Calle Secundaria 12', '678901234'),
('Pedro Sánchez', 'pedro.sanchez@mail.com', 'Av. Libertad 13', '789012345'),
('Lucía Díaz', 'lucia.diaz@mail.com', 'Calle Mayor 14', '890123456'),
('Andrés Torres', 'andres.torres@mail.com', 'Calle 15 15', '901234567'),
('Isabel Castro', 'isabel.castro@mail.com', 'Av. Norte 16', '012345678');

-- Crear la tabla Producto
CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    precio DOUBLE NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    categoria VARCHAR(50),
    imagen_url VARCHAR(255)
);

-- Insertar 10 registros en la tabla Producto
INSERT INTO productos (nombre, precio, codigo, descripcion, categoria, imagen_url) VALUES
('Camiseta Roja', 15.99, 'C0001', 'Camiseta de algodón roja', 'Ropa', 'http://example.com/camiseta.jpg'),
('Laptop Dell', 899.99, 'P0002', 'Laptop Dell XPS 13', 'Electrónica', 'http://example.com/laptop.jpg'),
('Zapatos Deportivos', 49.99, 'Z0003', 'Zapatos deportivos para correr', 'Ropa', 'http://example.com/zapatos.jpg'),
('Smartphone Samsung', 799.99, 'S0004', 'Smartphone Samsung Galaxy S21', 'Electrónica', 'http://example.com/samsung.jpg'),
('Cámara Canon', 550.00, 'C0005', 'Cámara digital Canon EOS', 'Electrónica', 'http://example.com/camara.jpg'),
('Chaqueta de Cuero', 120.00, 'C0006', 'Chaqueta de cuero negra', 'Ropa', 'http://example.com/chaqueta.jpg'),
('Auriculares Bose', 199.99, 'A0007', 'Auriculares Bose QuietComfort 35', 'Electrónica', 'http://example.com/auriculares.jpg'),
('Reloj Rolex', 5000.00, 'R0008', 'Reloj Rolex Submariner', 'Accesorios', 'http://example.com/reloj.jpg'),
('Mochila North Face', 89.99, 'M0009', 'Mochila North Face', 'Accesorios', 'http://example.com/mochila.jpg'),
('Silla Gamer', 299.99, 'SG010', 'Silla ergonómica para gamers', 'Muebles', 'http://example.com/silla.jpg');

-- Crear la tabla Pedido
CREATE TABLE IF NOT EXISTS pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    fecha DATE NOT NULL,
    total DOUBLE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);

-- Insertar 10 registros en la tabla Pedido
INSERT INTO pedidos (cliente_id, fecha, total, estado) VALUES
(1, '2024-11-01', 150.00, 'Pendiente'),
(2, '2024-11-02', 220.00, 'Confirmado'),
(3, '2024-11-03', 50.00, 'Enviado'),
(4, '2024-11-04', 300.00, 'Pendiente'),
(5, '2024-11-05', 110.00, 'Confirmado'),
(6, '2024-11-06', 400.00, 'Pendiente'),
(7, '2024-11-07', 75.00, 'Enviado'),
(8, '2024-11-08', 250.00, 'Confirmado'),
(9, '2024-11-09', 500.00, 'Pendiente'),
(10, '2024-11-10', 120.00, 'Confirmado');

-- Crear la tabla ProductoPedido
CREATE TABLE IF NOT EXISTS productos_pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT,
    pedido_id INT,
    cantidad INT,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- Insertar 10 registros en la tabla ProductoPedido
INSERT INTO productos_pedidos (producto_id, pedido_id, cantidad) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 4),
(4, 4, 2),
(5, 5, 1),
(6, 6, 1),
(7, 7, 3),
(8, 8, 1),
(9, 9, 2),
(10, 10, 1);

-- Verificar los datos insertados
SELECT * FROM clientes;
SELECT * FROM productos;
SELECT * FROM pedidos;
SELECT * FROM productos_pedidos;
