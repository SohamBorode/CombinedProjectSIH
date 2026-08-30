package com.example.cropDiseaseAnalysisBackend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record MlPrediction(
        @NotBlank String diseaseName,
        @Min(0) @Max(100) double confidence,
        @NotBlank String severity,
        String warning
) { }

