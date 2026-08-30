package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.dto.AlertResponse;
import com.example.cropDiseaseAnalysisBackend.dto.ReportResponse;
import com.example.cropDiseaseAnalysisBackend.dto.WeatherResponse;
import com.example.cropDiseaseAnalysisBackend.domain.Alert;
import com.example.cropDiseaseAnalysisBackend.domain.Farmer;
import com.example.cropDiseaseAnalysisBackend.repository.AlertRepository;
import com.example.cropDiseaseAnalysisBackend.service.DetectionService;
import com.example.cropDiseaseAnalysisBackend.service.WeatherService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class FarmerController {
    private final DetectionService detections;
    private final AlertRepository alerts;
    private final WeatherService weather;
    public FarmerController(DetectionService detections, AlertRepository alerts, WeatherService weather) { this.detections = detections; this.alerts = alerts; this.weather = weather; }

    @GetMapping("/farmer/dashboard")
    public Map<String, Object> dashboard(@RequestParam(value = "farmerId", defaultValue = "1") Long farmerId) {
        Farmer farmer = detections.farmer(farmerId);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("farmer", Map.of("id", farmer.getId(), "name", farmer.getName(), "village", farmer.getVillage(), "district", farmer.getDistrict(), "crop", farmer.getCrop(), "area", farmer.getArea(), "cropStage", farmer.getCropStage()));
        response.put("alerts", alertResponses(farmerId));
        response.put("reports", detections.reportsForFarmer(farmerId));
        response.put("weather", weather.weather(20.9374, 77.7796));
        return response;
    }

    @GetMapping("/reports")
    public List<ReportResponse> reports(@RequestParam(value = "farmerId", defaultValue = "1") Long farmerId) { return detections.reportsForFarmer(farmerId); }

    @GetMapping("/alerts")
    public List<AlertResponse> alerts(@RequestParam(value = "farmerId", defaultValue = "1") Long farmerId) { return alertResponses(farmerId); }

    @GetMapping("/weather")
    public WeatherResponse weather(@RequestParam("lat") double lat, @RequestParam("lng") double lng) {
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) throw ApiException.badRequest("Invalid latitude or longitude.");
        return weather.weather(lat, lng);
    }

    private List<AlertResponse> alertResponses(Long farmerId) {
        return alerts.findByFarmerIdOrderByCreatedAtDesc(farmerId).stream().map(this::response).toList();
    }
    private AlertResponse response(Alert alert) { return new AlertResponse(alert.getId(), alert.getTitle(), alert.getMessage(), alert.getRisk(), AlertResponse.timeAgo(alert.getCreatedAt()), alert.getIcon()); }
}

