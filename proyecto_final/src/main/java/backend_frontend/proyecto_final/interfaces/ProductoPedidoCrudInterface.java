package backend_frontend.proyecto_final.interfaces;

import backend_frontend.proyecto_final.entidades.ProductoPedido;
import java.util.List;

public interface ProductoPedidoCrudInterface {

    List<ProductoPedido> obtenerTodos();

    ProductoPedido obtenerPorId(int id);

    ProductoPedido crear(ProductoPedido productoPedido);

    ProductoPedido actualizar(int id, ProductoPedido productoPedido);

    void eliminar(int id);

    List<ProductoPedido> buscarPorProductoId(int productoId);

    List<ProductoPedido> buscarPorPedidoId(int pedidoId);
}
