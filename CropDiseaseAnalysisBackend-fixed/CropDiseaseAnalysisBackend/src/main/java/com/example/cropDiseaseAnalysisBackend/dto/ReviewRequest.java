package com.example.cropDiseaseAnalysisBackend.dto;

import jakarta.validation.constraints.NotBlank;

public record ReviewRequest(@NotBlank String status, String review) { }

