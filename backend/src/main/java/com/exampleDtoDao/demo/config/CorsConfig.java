package com.exampleDtoDao.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost",          // <-- frontend con Nginx en :80
                        "http://localhost:3000",     // <-- dev CRA
                        "http://192.168.100.16:3000" // <-- dev por IP
                )
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
        // .allowCredentials(true); // si usas cookies/sesiones
    }
}
