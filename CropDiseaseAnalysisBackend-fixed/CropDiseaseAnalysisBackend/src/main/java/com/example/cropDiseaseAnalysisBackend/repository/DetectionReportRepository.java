package com.example.cropDiseaseAnalysisBackend.repository;

import com.example.cropDiseaseAnalysisBackend.domain.DetectionReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DetectionReportRepository extends JpaRepository<DetectionReport, Long> {
    List<DetectionReport> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    List<DetectionReport> findAllByOrderByCreatedAtDesc();
}

