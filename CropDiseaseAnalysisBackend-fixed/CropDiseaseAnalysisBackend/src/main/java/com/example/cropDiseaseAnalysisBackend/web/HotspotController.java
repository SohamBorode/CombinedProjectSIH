package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.dto.ReportResponse;
import com.example.cropDiseaseAnalysisBackend.service.DetectionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/hotspots")
public class HotspotController {
    private final DetectionService detections;
    public HotspotController(DetectionService detections) { this.detections = detections; }

    @GetMapping
    public List<Map<String, Object>> hotspots() {
        return detections.allReports().stream().map(this::hotspot).toList();
    }
    private Map<String, Object> hotspot(ReportResponse report) {
        String risk = switch (report.severity().toLowerCase()) { case "high" -> "High"; case "moderate", "medium" -> "Medium"; default -> "Low"; };
        return Map.of("id", report.id(), "district", "Reported location", "latitude", report.latitude(), "longitude", report.longitude(), "risk", risk, "diseaseName", report.disease(), "affectedPercent", Math.round(report.confidence()));
    }
}

