package backend_frontend.proyecto_final.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend_frontend.proyecto_final.entidades.Pedido;
import backend_frontend.proyecto_final.servicios.PedidoServicio;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoControlador {

    @Autowired
    private PedidoServicio pedidoServicio;

    // Obtener todos los pedidos
    @GetMapping("/todos")
    public ResponseEntity<List<Pedido>> obtenerTodos() {
        List<Pedido> pedidos = pedidoServicio.obtenerTodos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    // Obtener pedido por ID
    @GetMapping("/pedido/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable int id) {
        try {
            Pedido pedido = pedidoServicio.obtenerPorId(id);
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo pedido
    @PostMapping("/crear")
    public ResponseEntity<Pedido> crear(@RequestBody Pedido pedido) {
        try {
            Pedido nuevoPedido = pedidoServicio.crear(pedido);
            return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Actualizar pedido existente
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable int id, @RequestBody Pedido pedido) {
        try {
            Pedido pedidoActualizado = pedidoServicio.actualizar(id, pedido);
            return new ResponseEntity<>(pedidoActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar pedido
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        try {
            pedidoServicio.eliminar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Buscar pedidos por estado
    @GetMapping("/buscar/estado/{estado}")
    public ResponseEntity<List<Pedido>> buscarPorEstado(@PathVariable String estado) {
        List<Pedido> pedidos = pedidoServicio.buscarPorEstado(estado);
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    // Buscar pedidos por clienteId
    @GetMapping("/buscar/cliente/{clienteId}")
    public ResponseEntity<List<Pedido>> buscarPorClienteId(@PathVariable int clienteId) {
        List<Pedido> pedidos = pedidoServicio.buscarPorClienteId(clienteId);
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
}
