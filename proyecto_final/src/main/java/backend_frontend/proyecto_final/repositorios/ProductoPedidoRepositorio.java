package backend_frontend.proyecto_final.repositorios;

import backend_frontend.proyecto_final.entidades.ProductoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoPedidoRepositorio extends JpaRepository<ProductoPedido, Integer> {

    @Query("SELECT pp FROM ProductoPedido pp JOIN FETCH pp.producto JOIN FETCH pp.pedido WHERE pp.producto.id = :productoId")
    List<ProductoPedido> findByProductoId(int productoId);

    @Query("SELECT pp FROM ProductoPedido pp JOIN FETCH pp.producto JOIN FETCH pp.pedido WHERE pp.pedido.id = :pedidoId")
    List<ProductoPedido> findByPedidoId(int pedidoId);

    void deleteById(int id);
}
