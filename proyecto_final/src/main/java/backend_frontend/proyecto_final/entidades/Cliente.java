package backend_frontend.proyecto_final.entidades;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres.")
    private String nombre;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "El correo no puede estar vacío.")
    @Email(message = "El correo no tiene un formato válido.")
    private String correo;

    @Column(nullable = false)
    @NotBlank(message = "La dirección no puede estar vacía.")
    private String direccion;

    @Column(nullable = false)
    @NotBlank(message = "El teléfono no puede estar vacío.")
    @Size(max = 15, message = "El teléfono no puede exceder 15 caracteres.")
    private String telefono;

    // Constructor vacío requerido por JPA
    public Cliente() {}

    // Constructor con parámetros
    public Cliente(String nombre, String correo, String direccion, String telefono) {
        this.nombre = nombre;
        this.correo = correo;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Cliente{id=" + id + ", nombre='" + nombre + "', correo='" + correo + "', direccion='" + direccion + "', telefono='" + telefono + "'}";
    }
}
