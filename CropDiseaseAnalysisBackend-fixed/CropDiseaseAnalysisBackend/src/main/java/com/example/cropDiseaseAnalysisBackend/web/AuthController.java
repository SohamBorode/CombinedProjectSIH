package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.dto.*;
import com.example.cropDiseaseAnalysisBackend.domain.Farmer;
import com.example.cropDiseaseAnalysisBackend.dto.LoginRequest;
import com.example.cropDiseaseAnalysisBackend.dto.LoginResponse;
import com.example.cropDiseaseAnalysisBackend.dto.UserDto;
import com.example.cropDiseaseAnalysisBackend.repository.FarmerRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final FarmerRepository farmers;
    public AuthController(FarmerRepository farmers) { this.farmers = farmers; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody FarmerRegistrationRequest request) {
        if (farmers.existsByEmailIgnoreCase(request.email())) {
            throw new ApiException(409, "A farmer with this email already exists.");
        }

        Farmer saved = farmers.save(new Farmer(
                request.name(),
                request.email(),
                request.password(),
                request.village(),
                request.district(),
                null,
                null,
                null,
                request.phno()
        ));

        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDto(saved.getId(), saved.getName(), saved.getEmail(), "farmer"));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        if ("admin".equalsIgnoreCase(request.role())) {
            if (!"admin@cropshield.local".equalsIgnoreCase(request.email()) || !"admin123".equals(request.password())) throw new ApiException(401, "Invalid administrator credentials.");
            return new LoginResponse("dev-admin-" + UUID.randomUUID(), new UserDto(0L, "CropShield Admin", request.email(), "admin"));
        }
        Farmer farmer = farmers.findByEmailIgnoreCase(request.email()).orElseThrow(() -> new ApiException(401, "Invalid farmer credentials."));
        if (!farmer.getPassword().equals(request.password())) throw new ApiException(401, "Invalid farmer credentials.");
        return new LoginResponse("dev-farmer-" + UUID.randomUUID(), new UserDto(farmer.getId(), farmer.getName(), farmer.getEmail(), "farmer"));
    }
}

