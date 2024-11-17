package backend_frontend.proyecto_final.repositorios;

import backend_frontend.proyecto_final.entidades.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepositorio extends JpaRepository<Producto, Integer> {

    // Método para buscar producto por código
    Producto findByCodigo(String codigo);

    // Método para buscar productos por nombre (parcial)
    List<Producto> findByNombreContaining(String nombre);

    // Método para eliminar producto por ID
    void deleteById(int id);
}
