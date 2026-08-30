package com.example.cropDiseaseAnalysisBackend.dto;

import java.time.Duration;
import java.time.Instant;

public record AlertResponse(Long id, String title, String message, String risk, String time, String icon) {
    public static String timeAgo(Instant createdAt) {
        long minutes = Math.max(0, Duration.between(createdAt, Instant.now()).toMinutes());
        if (minutes < 60) return minutes + " minutes ago";
        long hours = minutes / 60;
        if (hours < 24) return hours + " hours ago";
        return (hours / 24) + " days ago";
    }
}

