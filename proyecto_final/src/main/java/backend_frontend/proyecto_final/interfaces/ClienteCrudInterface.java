package backend_frontend.proyecto_final.interfaces;

import backend_frontend.proyecto_final.entidades.Cliente;
import java.util.List;

public interface ClienteCrudInterface {

    // Métodos CRUD básicos
    List<Cliente> obtenerTodos();

    Cliente obtenerPorId(int id);

    Cliente crear(Cliente cliente);

    Cliente actualizar(int id, Cliente cliente);

    void eliminar(int id);

    // Métodos adicionales
    Cliente buscarPorCorreo(String correo);

    List<Cliente> buscarPorNombre(String nombre);
}
