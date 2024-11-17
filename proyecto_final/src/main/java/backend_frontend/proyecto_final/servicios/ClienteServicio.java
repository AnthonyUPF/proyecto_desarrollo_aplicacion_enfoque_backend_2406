package backend_frontend.proyecto_final.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend_frontend.proyecto_final.entidades.Cliente;
import backend_frontend.proyecto_final.repositorios.ClienteRepositorio;
import backend_frontend.proyecto_final.interfaces.ClienteCrudInterface;

import java.util.List;

@Service
public class ClienteServicio implements ClienteCrudInterface {

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Override
    public List<Cliente> obtenerTodos() {
        return clienteRepositorio.findAll();
    }

    @Override
    public Cliente obtenerPorId(int id) {
        return clienteRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente con ID " + id + " no encontrado."));
    }

    @Override
    public Cliente crear(Cliente cliente) {
        // Verificar si ya existe un cliente con ese correo
        if (clienteRepositorio.findByCorreo(cliente.getCorreo()) != null) {
            throw new RuntimeException("Ya existe un cliente con el correo: " + cliente.getCorreo());
        }
        return clienteRepositorio.save(cliente);
    }

    @Override
    public Cliente actualizar(int id, Cliente cliente) {
        if (!clienteRepositorio.existsById(id)) {
            throw new RuntimeException("Cliente con ID " + id + " no encontrado.");
        }
        cliente.setId(id);
        return clienteRepositorio.save(cliente);
    }

    @Override
    public void eliminar(int id) {
        if (!clienteRepositorio.existsById(id)) {
            throw new RuntimeException("Cliente con ID " + id + " no encontrado.");
        }
        clienteRepositorio.deleteById(id);
    }

    @Override
    public Cliente buscarPorCorreo(String correo) {
        Cliente cliente = clienteRepositorio.findByCorreo(correo);
        if (cliente == null) {
            throw new RuntimeException("Cliente con correo " + correo + " no encontrado.");
        }
        return cliente;
    }

    @Override
    public List<Cliente> buscarPorNombre(String nombre) {
        return clienteRepositorio.findByNombreContaining(nombre);
    }
}
