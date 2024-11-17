package backend_frontend.proyecto_final.interfaces;

import backend_frontend.proyecto_final.entidades.Producto;
import java.util.List;

public interface ProductoCrudInterface {

    // Métodos CRUD básicos
    List<Producto> obtenerTodos();

    Producto obtenerPorId(int id);

    Producto crear(Producto producto);

    Producto actualizar(int id, Producto producto);

    void eliminar(int id);

    // Métodos adicionales
    Producto buscarPorCodigo(String codigo);

    List<Producto> buscarPorNombre(String nombre);
}
