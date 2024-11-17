package backend_frontend.proyecto_final.controladores;

import backend_frontend.proyecto_final.entidades.ProductoPedido;
import backend_frontend.proyecto_final.servicios.ProductoPedidoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos-pedidos")
@CrossOrigin(origins = "*")
public class ProductoPedidoControlador {

    @Autowired
    private ProductoPedidoServicio productoPedidoServicio;

    @GetMapping("/todos")
    public ResponseEntity<List<ProductoPedido>> obtenerTodos() {
        List<ProductoPedido> productosPedidos = productoPedidoServicio.obtenerTodos();
        return new ResponseEntity<>(productosPedidos, HttpStatus.OK);
    }

    @GetMapping("/producto-pedido/{id}")
    public ResponseEntity<ProductoPedido> obtenerPorId(@PathVariable int id) {
        try {
            ProductoPedido productoPedido = productoPedidoServicio.obtenerPorId(id);
            return new ResponseEntity<>(productoPedido, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<ProductoPedido> crear(@RequestBody ProductoPedido productoPedido) {
        try {
            ProductoPedido nuevoProductoPedido = productoPedidoServicio.crear(productoPedido);
            return new ResponseEntity<>(nuevoProductoPedido, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProductoPedido> actualizar(@PathVariable int id, @RequestBody ProductoPedido productoPedido) {
        try {
            ProductoPedido productoPedidoActualizado = productoPedidoServicio.actualizar(id, productoPedido);
            return new ResponseEntity<>(productoPedidoActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        try {
            productoPedidoServicio.eliminar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/buscar/producto/{productoId}")
    public ResponseEntity<List<ProductoPedido>> buscarPorProductoId(@PathVariable int productoId) {
        List<ProductoPedido> productosPedidos = productoPedidoServicio.buscarPorProductoId(productoId);
        return new ResponseEntity<>(productosPedidos, HttpStatus.OK);
    }

    @GetMapping("/buscar/pedido/{pedidoId}")
    public ResponseEntity<List<ProductoPedido>> buscarPorPedidoId(@PathVariable int pedidoId) {
        List<ProductoPedido> productosPedidos = productoPedidoServicio.buscarPorPedidoId(pedidoId);
        return new ResponseEntity<>(productosPedidos, HttpStatus.OK);
    }
}
