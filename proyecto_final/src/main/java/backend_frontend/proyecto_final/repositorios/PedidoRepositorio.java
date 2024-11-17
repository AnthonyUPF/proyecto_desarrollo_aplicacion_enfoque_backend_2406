package backend_frontend.proyecto_final.repositorios;

import backend_frontend.proyecto_final.entidades.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepositorio extends JpaRepository<Pedido, Integer> {

    // Buscar pedidos por estado
    List<Pedido> findByEstado(String estado);

    // Buscar pedidos por clienteId
    List<Pedido> findByClienteId(int clienteId);

    // Eliminar pedido por ID
    void deleteById(int id);
}
