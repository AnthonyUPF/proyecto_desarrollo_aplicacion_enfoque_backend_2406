package backend_frontend.proyecto_final.interfaces;

import backend_frontend.proyecto_final.entidades.Pedido;
import java.util.List;

public interface PedidoCrudInterface {

    // Métodos CRUD básicos
    List<Pedido> obtenerTodos();

    Pedido obtenerPorId(int id);

    Pedido crear(Pedido pedido);

    Pedido actualizar(int id, Pedido pedido);

    void eliminar(int id);

    // Métodos adicionales
    List<Pedido> buscarPorEstado(String estado);

    List<Pedido> buscarPorClienteId(int clienteId);
}
