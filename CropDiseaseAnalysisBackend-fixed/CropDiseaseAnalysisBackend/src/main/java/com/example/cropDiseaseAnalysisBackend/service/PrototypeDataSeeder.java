package com.example.cropDiseaseAnalysisBackend.service;

import com.example.cropDiseaseAnalysisBackend.domain.Alert;
import com.example.cropDiseaseAnalysisBackend.domain.Farmer;
import com.example.cropDiseaseAnalysisBackend.repository.AlertRepository;
import com.example.cropDiseaseAnalysisBackend.repository.FarmerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrototypeDataSeeder {
    @Bean
    CommandLineRunner seed(FarmerRepository farmers, AlertRepository alerts) {
        return args -> {
            if (farmers.count() > 0) return;
            Farmer farmer = farmers.save(new Farmer("Rahul Patil", "farmer@cropshield.local", "farmer123", "Darwha", "Yavatmal", "Cotton", "3.5 Acres", "Vegetative"));
            alerts.save(new Alert(farmer, "Cotton Pest Risk", "Increased pest activity detected in your area.", "Medium", "⚠️"));
            alerts.save(new Alert(farmer, "Disease Risk", "Weather conditions may increase fungal disease risk.", "High", "🔴"));
        };
    }
}

