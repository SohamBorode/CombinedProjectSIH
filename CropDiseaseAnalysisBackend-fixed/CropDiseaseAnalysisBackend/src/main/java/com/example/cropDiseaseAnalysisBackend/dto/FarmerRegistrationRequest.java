package com.example.cropDiseaseAnalysisBackend.dto;

import jakarta.validation.constraints.NotBlank;

public record FarmerRegistrationRequest(
        @NotBlank String name,
        @NotBlank String email,
        @NotBlank String password,
        @NotBlank String phno,
        @NotBlank String district,
        @NotBlank String village
) {
}
