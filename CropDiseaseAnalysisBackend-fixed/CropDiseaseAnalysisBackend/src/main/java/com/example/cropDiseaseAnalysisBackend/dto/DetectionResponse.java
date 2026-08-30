package com.example.cropDiseaseAnalysisBackend.dto;

import java.time.Instant;

public record DetectionResponse(Long id, String diseaseName, double confidence, String severity, String crop, String cropStage, String warning, String status, double latitude, double longitude, Instant createdAt) { }

