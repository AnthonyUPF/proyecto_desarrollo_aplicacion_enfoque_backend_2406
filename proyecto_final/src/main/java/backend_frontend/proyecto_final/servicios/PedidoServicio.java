package backend_frontend.proyecto_final.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend_frontend.proyecto_final.entidades.Pedido;
import backend_frontend.proyecto_final.repositorios.PedidoRepositorio;
import backend_frontend.proyecto_final.interfaces.PedidoCrudInterface;

import java.util.List;

@Service
public class PedidoServicio implements PedidoCrudInterface {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Override
    public List<Pedido> obtenerTodos() {
        return pedidoRepositorio.findAll();
    }

    @Override
    public Pedido obtenerPorId(int id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido con ID " + id + " no encontrado."));
    }

    @Override
    public Pedido crear(Pedido pedido) {
        return pedidoRepositorio.save(pedido);
    }

    @Override
    public Pedido actualizar(int id, Pedido pedido) {
        if (!pedidoRepositorio.existsById(id)) {
            throw new RuntimeException("Pedido con ID " + id + " no encontrado.");
        }
        pedido.setId(id);
        return pedidoRepositorio.save(pedido);
    }

    @Override
    public void eliminar(int id) {
        if (!pedidoRepositorio.existsById(id)) {
            throw new RuntimeException("Pedido con ID " + id + " no encontrado.");
        }
        pedidoRepositorio.deleteById(id);
    }

    @Override
    public List<Pedido> buscarPorEstado(String estado) {
        return pedidoRepositorio.findByEstado(estado);
    }

    @Override
    public List<Pedido> buscarPorClienteId(int clienteId) {
        return pedidoRepositorio.findByClienteId(clienteId);
    }
}
