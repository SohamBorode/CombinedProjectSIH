package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.dto.DetectionResponse;
import com.example.cropDiseaseAnalysisBackend.service.DetectionService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class DetectionController {
    private final DetectionService detections;
    public DetectionController(DetectionService detections) { this.detections = detections; }

    @PostMapping(value = "/detect", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public DetectionResponse detect(
            @RequestParam("file") MultipartFile file,
            @RequestParam("crop") String crop,
            @RequestParam("cropStage") String cropStage,
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam(value = "farmerId", defaultValue = "1") Long farmerId) {
        return detections.detect(farmerId, file, crop, cropStage, latitude, longitude);
    }
}

