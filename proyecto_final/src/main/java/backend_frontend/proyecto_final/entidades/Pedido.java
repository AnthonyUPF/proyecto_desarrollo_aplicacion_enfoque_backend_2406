package backend_frontend.proyecto_final.entidades;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "El clienteId no puede ser nulo.")
    private int clienteId;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    @Positive(message = "El total debe ser mayor a 0.")
    private double total;

    @NotBlank(message = "El estado no puede estar vacío.")
    private String estado;

    // Constructor vacío requerido por JPA
    public Pedido() {}

    // Constructor con parámetros
    public Pedido(int clienteId, LocalDate fecha, double total, String estado) {
        this.clienteId = clienteId;
        this.fecha = fecha;
        this.total = total;
        this.estado = estado;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClienteId() {
        return clienteId;
    }

    public void setClienteId(int clienteId) {
        this.clienteId = clienteId;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Pedido{id=" + id + ", clienteId=" + clienteId + ", fecha=" + fecha + ", total=" + total + ", estado='" + estado + "'}";
    }
}
