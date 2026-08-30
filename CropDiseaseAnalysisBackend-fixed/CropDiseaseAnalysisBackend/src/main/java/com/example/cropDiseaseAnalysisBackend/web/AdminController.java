package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.dto.ReportResponse;
import com.example.cropDiseaseAnalysisBackend.dto.ReviewRequest;
import com.example.cropDiseaseAnalysisBackend.service.DetectionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/reports")
public class AdminController {
    private final DetectionService detections;
    public AdminController(DetectionService detections) { this.detections = detections; }

    @GetMapping
    public List<ReportResponse> reports() { return detections.allReports(); }
    @GetMapping("/{id}")
    public ReportResponse report(@PathVariable Long id) { return detections.reportById(id); }
    @PostMapping("/{id}/status")
    public ReportResponse updateStatus(@PathVariable Long id, @Valid @RequestBody ReviewRequest request) { return detections.review(id, request); }
}

