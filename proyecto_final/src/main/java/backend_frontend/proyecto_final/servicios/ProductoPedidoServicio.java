package backend_frontend.proyecto_final.servicios;

import backend_frontend.proyecto_final.entidades.ProductoPedido;
import backend_frontend.proyecto_final.repositorios.ProductoPedidoRepositorio;
import backend_frontend.proyecto_final.interfaces.ProductoPedidoCrudInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoPedidoServicio implements ProductoPedidoCrudInterface {

    @Autowired
    private ProductoPedidoRepositorio productoPedidoRepositorio;

    @Override
    public List<ProductoPedido> obtenerTodos() {
        return productoPedidoRepositorio.findAll();
    }

    @Override
    public ProductoPedido obtenerPorId(int id) {
        return productoPedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductoPedido con ID " + id + " no encontrado."));
    }

    @Override
    public ProductoPedido crear(ProductoPedido productoPedido) {
        validarCantidad(productoPedido.getCantidad());
        return productoPedidoRepositorio.save(productoPedido);
    }

    @Override
    public ProductoPedido actualizar(int id, ProductoPedido productoPedido) {
        if (!productoPedidoRepositorio.existsById(id)) {
            throw new RuntimeException("ProductoPedido con ID " + id + " no encontrado.");
        }
        productoPedido.setId(id);
        validarCantidad(productoPedido.getCantidad());
        return productoPedidoRepositorio.save(productoPedido);
    }

    @Override
    public void eliminar(int id) {
        if (!productoPedidoRepositorio.existsById(id)) {
            throw new RuntimeException("ProductoPedido con ID " + id + " no encontrado.");
        }
        productoPedidoRepositorio.deleteById(id);
    }

    @Override
    public List<ProductoPedido> buscarPorProductoId(int productoId) {
        return productoPedidoRepositorio.findByProductoId(productoId);
    }

    @Override
    public List<ProductoPedido> buscarPorPedidoId(int pedidoId) {
        return productoPedidoRepositorio.findByPedidoId(pedidoId);
    }

    private void validarCantidad(int cantidad) {
        if (cantidad <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que 0.");
        }
    }
}
