package com.example.cropDiseaseAnalysisBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.cropDiseaseAnalysisBackend.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class CropShieldApplication {
    public static void main(String[] args) {
        SpringApplication.run(CropShieldApplication.class, args);
    }
}

