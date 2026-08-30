package com.example.cropDiseaseAnalysisBackend.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "detection_reports")
public class DetectionReport {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) private Farmer farmer;
    @Column(nullable = false) private String crop;
    @Column(nullable = false) private String cropStage;
    @Column(nullable = false) private String diseaseName;
    @Column(nullable = false) private double confidence;
    @Column(nullable = false) private String severity;
    @Column(length = 1000) private String warning;
    @Column(nullable = false) private double latitude;
    @Column(nullable = false) private double longitude;
    @Column(nullable = false) private String imagePath;
    private String originalFileName;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ReportStatus status = ReportStatus.PENDING;
    @Column(length = 2000) private String review;
    @Column(nullable = false) private Instant createdAt = Instant.now();

    protected DetectionReport() { }
    public DetectionReport(Farmer farmer, String crop, String cropStage, String diseaseName, double confidence, String severity, String warning, double latitude, double longitude, String imagePath, String originalFileName) {
        this.farmer = farmer; this.crop = crop; this.cropStage = cropStage; this.diseaseName = diseaseName; this.confidence = confidence;
        this.severity = severity; this.warning = warning; this.latitude = latitude; this.longitude = longitude; this.imagePath = imagePath; this.originalFileName = originalFileName;
    }
    public Long getId() { return id; }
    public Farmer getFarmer() { return farmer; }
    public String getCrop() { return crop; }
    public String getCropStage() { return cropStage; }
    public String getDiseaseName() { return diseaseName; }
    public double getConfidence() { return confidence; }
    public String getSeverity() { return severity; }
    public String getWarning() { return warning; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public String getImagePath() { return imagePath; }
    public String getOriginalFileName() { return originalFileName; }
    public ReportStatus getStatus() { return status; }
    public String getReview() { return review; }
    public Instant getCreatedAt() { return createdAt; }
    public void review(ReportStatus status, String review) { this.status = status; this.review = review; }
}

