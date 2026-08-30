package com.example.cropDiseaseAnalysisBackend.service;

import com.example.cropDiseaseAnalysisBackend.dto.*;
import com.example.cropDiseaseAnalysisBackend.domain.DetectionReport;
import com.example.cropDiseaseAnalysisBackend.domain.Farmer;
import com.example.cropDiseaseAnalysisBackend.domain.ReportStatus;
import com.example.cropDiseaseAnalysisBackend.dto.DetectionResponse;
import com.example.cropDiseaseAnalysisBackend.dto.MlPrediction;
import com.example.cropDiseaseAnalysisBackend.dto.ReportResponse;
import com.example.cropDiseaseAnalysisBackend.dto.ReviewRequest;
import com.example.cropDiseaseAnalysisBackend.repository.DetectionReportRepository;
import com.example.cropDiseaseAnalysisBackend.repository.FarmerRepository;
import com.example.cropDiseaseAnalysisBackend.web.ApiException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class DetectionService {
    private final FarmerRepository farmers;
    private final DetectionReportRepository reports;
    private final StorageService storage;
    private final MlInferenceClient ml;

    public DetectionService(FarmerRepository farmers, DetectionReportRepository reports, StorageService storage, MlInferenceClient ml) {
        this.farmers = farmers; this.reports = reports; this.storage = storage; this.ml = ml;
    }

    public DetectionResponse detect(Long farmerId, MultipartFile file, String crop, String cropStage, double latitude, double longitude) {
        validate(crop, cropStage, latitude, longitude);
        Farmer farmer = farmer(farmerId);
        MlPrediction prediction = ml.predict(file, crop, cropStage, latitude, longitude);
        String imagePath = storage.store(file);
        DetectionReport saved = reports.save(new DetectionReport(farmer, crop, cropStage, prediction.diseaseName(), prediction.confidence(), prediction.severity(), prediction.warning(), latitude, longitude, imagePath, file.getOriginalFilename()));
        return detection(saved);
    }

    public List<ReportResponse> reportsForFarmer(Long farmerId) { return reports.findByFarmerIdOrderByCreatedAtDesc(farmerId).stream().map(this::report).toList(); }
    public List<ReportResponse> allReports() { return reports.findAllByOrderByCreatedAtDesc().stream().map(this::report).toList(); }
    public ReportResponse reportById(Long id) { return report(entity(id)); }
    public ReportResponse review(Long id, ReviewRequest request) {
        ReportStatus status;
        try { status = ReportStatus.valueOf(request.status().trim().toUpperCase()); }
        catch (IllegalArgumentException exception) { throw ApiException.badRequest("Status must be Pending, Verified, or Rejected."); }
        DetectionReport report = entity(id); report.review(status, request.review()); return report(reports.save(report));
    }

    public Farmer farmer(Long id) { return farmers.findById(id).orElseThrow(() -> ApiException.notFound("Farmer not found.")); }
    private DetectionReport entity(Long id) { return reports.findById(id).orElseThrow(() -> ApiException.notFound("Report not found.")); }

    private void validate(String crop, String cropStage, double latitude, double longitude) {
        if (crop == null || crop.isBlank() || cropStage == null || cropStage.isBlank()) throw ApiException.badRequest("Crop and cropStage are required.");
        if (!Double.isFinite(latitude) || latitude < -90 || latitude > 90) throw ApiException.badRequest("Latitude must be between -90 and 90.");
        if (!Double.isFinite(longitude) || longitude < -180 || longitude > 180) throw ApiException.badRequest("Longitude must be between -180 and 180.");
    }

    private DetectionResponse detection(DetectionReport r) { return new DetectionResponse(r.getId(), r.getDiseaseName(), r.getConfidence(), r.getSeverity(), r.getCrop(), r.getCropStage(), r.getWarning(), r.getStatus().name(), r.getLatitude(), r.getLongitude(), r.getCreatedAt()); }
    private ReportResponse report(DetectionReport r) { return new ReportResponse(r.getId(), r.getFarmer().getName(), r.getCrop(), r.getCropStage(), r.getDiseaseName(), r.getConfidence(), r.getSeverity(), title(r.getStatus()), r.getWarning(), r.getLatitude(), r.getLongitude(), DATE_FORMAT.format(r.getCreatedAt()), r.getCreatedAt(), "/api/images/" + r.getImagePath(), r.getReview()); }
    private String title(ReportStatus status) { String n = status.name().toLowerCase(); return Character.toUpperCase(n.charAt(0)) + n.substring(1); }
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd MMM uuuu").withZone(ZoneId.of("Asia/Kolkata"));
}

