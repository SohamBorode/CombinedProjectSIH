package com.example.cropDiseaseAnalysisBackend.dto;

import java.time.Instant;

public record ReportResponse(Long id, String farmer, String crop, String cropStage, String disease, double confidence, String severity, String status, String warning, double latitude, double longitude, String date, Instant createdAt, String imageUrl, String review) { }

