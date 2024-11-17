# Proyecto Final: Backend con Spring Boot

Este proyecto, denominado `proyecto_final`, es una aplicación web enfocada en el desarrollo backend utilizando **Java** y **Spring Boot**. A continuación, se detallan los pasos iniciales para la creación y configuración del proyecto en **Visual Studio Code** utilizando Spring Initializr y el archivo `pom.xml`.

## Creación del Proyecto en Visual Studio Code

1. **Abrir el Comando de Spring Initializr**:
   - En Visual Studio Code, presiona `Ctrl + Shift + P` para abrir la paleta de comandos.
   - Escribe `Spring Initializr` y selecciona la opción **Spring Initializr: Generate a Maven Project**.

2. **Configurar el Proyecto con Spring Initializr**:
   - **Lenguaje**: Selecciona `Java`.
   - **Group ID**: Ingresa `backend_frontend`.
   - **Artifact ID**: Ingresa `proyecto_final`.
   - **Versión**: Selecciona la versión deseada o deja la opción por defecto.
   - **Packaging**: Selecciona `WAR` para generar un archivo WAR para despliegue en un servidor web.
   - **Java Version**: Elige `17` como versión de Java.

3. **Seleccionar Dependencias**:
   - En el asistente de Spring Initializr, selecciona las siguientes dependencias:
     - **Spring Web**: Para desarrollar servicios REST y manejar peticiones HTTP.
     - **Spring Security**: Para agregar funcionalidades de seguridad y autorización.
     - **Spring Web Services**: Para manejar servicios web basados en SOAP si es necesario.
     - **Spring Data JPA**: Para la persistencia de datos con Hibernate.
     - **MySQL Driver**: Para conectar la aplicación con una base de datos MySQL.
     - **Spring Boot Starter Tomcat**: Configurado como `provided` en el archivo `pom.xml`, para el despliegue en un servidor externo.
     - **Spring Boot Starter Test** y **Spring Security Test**: Para pruebas unitarias y de seguridad (configuradas con `scope` de `test` en `pom.xml`).

4. **Generar el Proyecto**:
   - Visual Studio Code generará el proyecto con la estructura y archivos necesarios, incluyendo `pom.xml`, donde estará especificado el empaquetado como `WAR`.

5. **Configurar el archivo `pom.xml`**:
   - Verifica que el archivo `pom.xml` incluya la línea `<packaging>war</packaging>`:
     ```xml
     <packaging>war</packaging>
     ```

6. **Ejecutar el Proyecto**:
   - Abre la terminal en Visual Studio Code (`Ctrl + Shift + `) y ejecuta el siguiente comando para iniciar la aplicación:
     ```bash
     mvn spring-boot:run
     ```

## Dependencias del Proyecto

El archivo `pom.xml` está configurado con las siguientes dependencias esenciales:

- **Spring Boot Starter Data JPA**: Para la interacción con bases de datos relacionales.
- **Spring Boot Starter Security**: Para implementar autenticación y autorización.
- **Spring Boot Starter Web**: Para desarrollar aplicaciones web y servicios REST.
- **Spring Boot Starter Web Services**: Para soporte de servicios SOAP.
- **MySQL Connector**: Para conexión con la base de datos MySQL.
- **Spring Boot Starter Tomcat**: Configurado como `provided` para despliegue en servidores externos.
- **Spring Boot Starter Test** y **Spring Security Test**: Para pruebas de aplicación, ambos configurados con `scope` de `test`.

## Resumen de Configuración

- **Nombre del Proyecto**: `proyecto_final`
- **Grupo**: `backend_frontend`
- **Tipo de Empaquetado**: `WAR`
- **Lenguaje**: `Java`
- **Java Version**: `17`
- **Dependencias Principales**: Spring Web, Spring Security, Spring Data JPA, MySQL Driver, Spring Web Services, Spring Boot Starter Tomcat, Spring Boot Starter Test, Spring Security Test

Con estos pasos, el proyecto `proyecto_final` estará listo para comenzar su desarrollo con el enfoque en backend.

---

## Estructura del Proyecto Backend

El diseño propuesto para la estructura del backend sigue un enfoque basado en capas, que asegura una correcta separación de responsabilidades y facilita la escalabilidad y el mantenimiento del proyecto. A continuación, se detallan las principales capas y su propósito:

### Capas del Proyecto:

1. **Entidades**: 
   - Representan los modelos de datos (clases de dominio) que se mapean a las tablas de la base de datos utilizando JPA (Java Persistence API).
   - Estas clases contienen las anotaciones necesarias de JPA y, en caso necesario, atributos para claves foráneas.

2. **Enums**: 
   - Se utilizan para definir enumeraciones que representan valores constantes o estados específicos en el sistema.
   - Mantienen valores consistentes a lo largo de toda la aplicación.

3. **Interfaces**:
   - Declararán las interfaces para el CRUD básico de cada entidad y cualquier método adicional necesario, como búsquedas avanzadas o filtros.
   - Estas interfaces actúan como contratos, guiando la implementación en las capas de repositorios, servicios y controladores.

4. **Repositorios**:
   - Clases o interfaces que interactúan con la base de datos y exponen métodos para CRUD.
   - Si se necesitan consultas personalizadas, es posible definir métodos adicionales en estas interfaces o usar `@Query`.

5. **Servicios**:
   - Contienen la lógica de negocio, invocando métodos de los repositorios para realizar operaciones con los datos.
   - Cada servicio implementa una interfaz específica que define los métodos que expone.
   - La lógica de presentación está separada, ya que los métodos de los servicios solo invocan las interfaces de los controladores.

6. **Controladores**:
   - Definen los endpoints que exponen la API REST de la aplicación.
   - Cada controlador implementa una interfaz que define los métodos accesibles por los usuarios.
   - Los controladores interactúan con los servicios a través de sus interfaces, proporcionando una capa de presentación.

### Interfaces Únicas para Servicios y Controladores

- **Servicios y controladores** tendrán cada uno su propia interfaz, que se utilizará en su implementación.
- Esto asegura que ambos cumplan con un contrato común y proporciona una capa de abstracción, permitiendo aplicar cambios sin afectar a otras capas del sistema.

### Separación de Responsabilidades

- **Lógica de presentación**: Reside exclusivamente en los controladores, que interactúan directamente con los clientes.
- **Servicios**: Se limitan a invocar los métodos de los controladores, delegando acciones, manteniendo la lógica de negocio independiente de la lógica de presentación.

### Ejemplo de Estructura de Archivos

Con esta estructura en mente, los directorios y clases del proyecto quedarán organizados de la siguiente manera:

```
src/main/java/backend_frontend/proyecto_final
├── entidades/
│   └── [Entidades representando las tablas de la base de datos]
├── enums/
│   └── [Enumeraciones para estados o valores constantes]
├── interfaces/
│   ├── I[NombreServicio].java     // Interfaces para servicios
│   ├── I[NombreControlador].java  // Interfaces para controladores
│   └── I[NombreRepositorio].java  // Interfaces para repositorios
├── repositorios/
│   └── [Repositorios que extienden JpaRepository e implementan I[NombreRepositorio]]
├── servicios/
│   └── [Implementaciones de I[NombreServicio], invocando métodos de I[NombreControlador]]
└── controladores/
    └── [Implementaciones de I[NombreControlador], exponiendo la API]
```

### Beneficios de la Estructura

- **Separación clara de responsabilidades**: La lógica de negocio, datos y presentación están claramente separadas.
- **Escalabilidad y mantenimiento**: Al seguir este enfoque, se facilita la expansión y el mantenimiento del proyecto a medida que crece.
- **Flexibilidad y facilidad de modificación**: Cambios en una capa no afectan directamente a las demás, ya que las capas se comunican a través de interfaces.

Con esta estructura de capas y el uso de interfaces, se proporciona una base sólida para la implementación del proyecto, permitiendo la evolución del sistema de manera ordenada y mantenible.

---

## Estructura del Proyecto Frontend

Para el desarrollo del frontend, se utilizará la carpeta `static` del proyecto de Spring Boot, que permitirá integrar los recursos estáticos necesarios para la interfaz de usuario. Se organizarán los archivos en subcarpetas como `css`, `html`, y `js` para separar las distintas partes del frontend de manera clara y estructurada.

### Capas y Estructura del Proyecto Frontend:

1. **HTML (Estructura de la página):**
   - Los archivos HTML estarán ubicados en la carpeta `static/html/`.
   - Se encargan de definir la estructura de la interfaz de usuario, incluyendo las páginas principales como la de inicio, catálogo de productos, carrito de compras, y formularios de registro e inicio de sesión.
   - Los archivos HTML estarán conectados con los archivos CSS y JavaScript para la parte de estilo y funcionalidades interactivas.

2. **CSS (Estilos de la página):**
   - Los archivos CSS se almacenarán en la carpeta `static/css/`.
   - Los archivos CSS controlarán la apariencia visual del sitio web, asegurando que sea atractivo y responsive, adaptándose a distintos dispositivos y tamaños de pantalla.
   - El objetivo será proporcionar una interfaz intuitiva y accesible, siguiendo las buenas prácticas de diseño web.

3. **JavaScript (Interactividad de la página):**
   - Los archivos JavaScript estarán ubicados en la carpeta `static/js/`.
   - Se encargan de agregar la interactividad necesaria en la tienda virtual, como la gestión del carrito de compras, filtros de productos, validación de formularios, y la comunicación con el backend a través de AJAX o Fetch API.
   - Los archivos JavaScript permitirán que el sitio sea dinámico, proporcionando una experiencia de usuario más fluida sin recargar la página constantemente.

### Estructura de Archivos:

Con esta organización, los directorios y archivos del proyecto frontend quedarán organizados de la siguiente manera:

```
src/main/resources/static/
├── html/
│   └── index.html             // Página principal
│   └── catalogo.html          // Catálogo de productos
│   └── login.html             // Formulario de inicio de sesión
│   └── registro.html          // Formulario de registro
│   └── carrito.html           // Página del carrito de compras
├── css/
│   └── estilo.css             // Estilos generales del sitio
│   └── carrito.css            // Estilos para la página del carrito
│   └── login.css              // Estilos para la página de login
├── js/
│   └── carrito.js             // Lógica de carrito de compras
│   └── filtros.js             // Lógica para filtros de productos
│   └── login.js               // Funcionalidad para el formulario de inicio de sesión
│   └── registro.js            // Funcionalidad para el formulario de registro
│   └── api.js                 // Funciones para interactuar con el backend
```

### Descripción de las Funcionalidades en el Frontend:

1. **Página Principal:**
   - Mostrará un resumen de la tienda, destacando los productos populares y las categorías.
   - Tendrá un buscador para que los usuarios encuentren medicamentos rápidamente.

2. **Catálogo de Productos:**
   - Los usuarios podrán ver una lista de productos con detalles como nombre, descripción, precio y disponibilidad.
   - Los productos estarán organizados por categorías, y los usuarios podrán aplicar filtros (por precio, disponibilidad, etc.) para facilitar la búsqueda.

3. **Formulario de Registro e Inicio de Sesión:**
   - Los usuarios podrán registrarse proporcionando su información personal y de contacto.
   - También podrán iniciar sesión utilizando sus credenciales previamente registradas.

4. **Carrito de Compras:**
   - El carrito permitirá agregar, eliminar y actualizar la cantidad de productos.
   - Los usuarios podrán ver un resumen de su compra antes de proceder al pago.
   - Una vez realizada la compra, se mostrará una notificación de confirmación.

5. **Interacción con el Backend:**
   - Se utilizarán llamadas AJAX o Fetch API para obtener datos de productos, procesar pagos y manejar el inicio de sesión sin recargar la página.

### Beneficios de esta Estructura:

- **Modularidad y mantenibilidad**: Al separar los archivos en diferentes carpetas (`html`, `css`, `js`), se facilita el mantenimiento y la ampliación de la aplicación.
- **Escalabilidad**: La estructura organizada permite agregar nuevas funcionalidades o páginas de manera sencilla a medida que el proyecto crece.
- **Desempeño mejorado**: Al mantener los archivos de estilo y scripts organizados, se mejora la carga y rendimiento del sitio.

Con esta estructura frontend, se asegura una experiencia de usuario fluida, interactiva y bien organizada, manteniendo una separación clara entre la estructura, estilo y lógica de la aplicación.

---

## Planificación del Proyecto de Tienda Virtual de Medicamentos

## 1. Objetivos del Proyecto

- Crear una tienda virtual de medicamentos donde los usuarios puedan explorar, buscar y comprar productos farmacéuticos.
- Permitir la compra con y sin registro: los usuarios podrán registrarse para obtener beneficios adicionales (historial de pedidos, seguimiento de envíos) o comprar como invitados.
- Implementar una arquitectura backend sólida que soporte la gestión de productos, categorías, usuarios y pedidos.
- Asegurar que la aplicación sea fácil de mantener y escalable, con una estructura clara de capas que permita futuras mejoras y expansiones.

## 2. Alcance del Proyecto

### Funcionalidades del Usuario:
- **Registro e inicio de sesión:** Los usuarios podrán registrarse y autenticarse para acceder a funcionalidades adicionales, como el historial de pedidos.
- **Compra como invitado:** Los usuarios no registrados también podrán hacer compras.
- **Catálogo de productos:** Visualización de productos con detalles como nombre, descripción, precio y disponibilidad.
- **Búsqueda y filtrado de productos:** Funcionalidades para buscar y filtrar medicamentos por categoría, precio y disponibilidad.
- **Carrito de compras:** Gestión del carrito de compras, con la opción de agregar, eliminar y actualizar la cantidad de productos.
- **Procesamiento de pagos:** Funcionalidad para realizar pagos (simulado en este proyecto).
- **Notificación de confirmación:** Envío de una notificación al usuario después de cada compra exitosa.

### Funcionalidades Administrativas:
- **Gestión de productos:** CRUD (Crear, Leer, Actualizar, Eliminar) de productos, categorías y precios.
- **Gestión de usuarios:** Administración de cuentas de usuario (suspensión o eliminación de cuentas si es necesario).
- **Gestión de pedidos:** Visualización de pedidos y estados de procesamiento.

### Seguridad:
- **Implementación de roles de usuario** (Cliente y Administrador) con autorización para acceder a funciones específicas.
- **Uso de HTTPS** para asegurar la transmisión de datos entre el frontend y el backend.
- **Opcional:** Autenticación básica y seguridad de las rutas.

## 3. Requisitos del Proyecto

### Requisitos Funcionales:
- Registro de usuarios y autenticación.
- Búsqueda, filtrado y visualización de productos.
- Carrito de compras y proceso de pago.
- Funcionalidades CRUD para administración de productos y pedidos.
- Roles de usuario para diferenciar entre clientes y administradores.
