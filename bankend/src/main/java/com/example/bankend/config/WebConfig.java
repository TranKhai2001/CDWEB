package com.example.bankend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Cho phép yêu cầu từ domain này
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Cho phép các phương thức này
                .allowedHeaders("*"); // Cho phép tất cả các tiêu đề
    }
}
