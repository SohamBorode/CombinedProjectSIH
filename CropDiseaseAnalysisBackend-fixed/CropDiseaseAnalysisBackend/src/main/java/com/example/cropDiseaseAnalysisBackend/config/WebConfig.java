package com.example.cropDiseaseAnalysisBackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final AppProperties properties;

    public WebConfig(AppProperties properties) {
        this.properties = properties;
    }

    @Bean
    public RestClient.Builder restClientBuilder() {
        return RestClient.builder();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String configured = properties.getCors().getAllowedOrigins();
        String[] origins = configured == null || configured.isBlank()
                ? new String[0]
                : Arrays.stream(configured.split(",")).map(String::trim).toArray(String[]::new);

        // NOTE: server.servlet.context-path=/api is stripped by Spring BEFORE
        // CORS registry patterns are matched, so a pattern of "/api/**" here
        // never matches any controller route (e.g. "/auth", "/detect") and no
        // Access-Control-Allow-Origin header is ever sent. Use "/**" instead.
        registry.addMapping("/**")
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}

