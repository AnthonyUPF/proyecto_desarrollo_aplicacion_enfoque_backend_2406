package backend_frontend.proyecto_final.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend_frontend.proyecto_final.entidades.Producto;
import backend_frontend.proyecto_final.repositorios.ProductoRepositorio;
import backend_frontend.proyecto_final.interfaces.ProductoCrudInterface;

import java.util.List;

@Service
public class ProductoServicio implements ProductoCrudInterface {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Override
    public List<Producto> obtenerTodos() {
        return productoRepositorio.findAll();
    }

    @Override
    public Producto obtenerPorId(int id) {
        return productoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado."));
    }

    @Override
    public Producto crear(Producto producto) {
        // Verificar si ya existe un producto con ese código
        if (productoRepositorio.findByCodigo(producto.getCodigo()) != null) {
            throw new RuntimeException("Ya existe un producto con el código: " + producto.getCodigo());
        }
        return productoRepositorio.save(producto);
    }

    @Override
    public Producto actualizar(int id, Producto producto) {
        if (!productoRepositorio.existsById(id)) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado.");
        }
        producto.setId(id);
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminar(int id) {
        if (!productoRepositorio.existsById(id)) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado.");
        }
        productoRepositorio.deleteById(id);
    }

    @Override
    public Producto buscarPorCodigo(String codigo) {
        Producto producto = productoRepositorio.findByCodigo(codigo);
        if (producto == null) {
            throw new RuntimeException("Producto con código " + codigo + " no encontrado.");
        }
        return producto;
    }

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepositorio.findByNombreContaining(nombre);
    }
}
