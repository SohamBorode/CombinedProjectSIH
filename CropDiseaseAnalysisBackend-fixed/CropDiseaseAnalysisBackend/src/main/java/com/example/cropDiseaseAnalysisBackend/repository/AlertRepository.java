package com.example.cropDiseaseAnalysisBackend.repository;

import com.example.cropDiseaseAnalysisBackend.domain.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
}

