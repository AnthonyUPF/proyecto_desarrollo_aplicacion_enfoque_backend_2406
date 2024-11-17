package backend_frontend.proyecto_final.configuracion;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Configuración de recursos estáticos para CSS
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/static/css/");

        // Configuración de recursos estáticos para JS
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:/static/js/");

        // Configuración de recursos estáticos para HTML
        registry.addResourceHandler("/html/**")
                .addResourceLocations("classpath:/static/html/");

        // Configuración para servir el archivo index.html desde la raíz
        registry.addResourceHandler("/")
                .addResourceLocations("classpath:/static/index.html");
    }
}
