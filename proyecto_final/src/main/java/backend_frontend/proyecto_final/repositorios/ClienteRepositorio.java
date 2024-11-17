package backend_frontend.proyecto_final.repositorios;

import backend_frontend.proyecto_final.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepositorio extends JpaRepository<Cliente, Integer> {

    // Método para buscar cliente por correo
    Cliente findByCorreo(String correo);

    // Método para buscar clientes por nombre (parcial)
    List<Cliente> findByNombreContaining(String nombre);

    // Método para eliminar cliente por ID
    void deleteById(int id);
}
