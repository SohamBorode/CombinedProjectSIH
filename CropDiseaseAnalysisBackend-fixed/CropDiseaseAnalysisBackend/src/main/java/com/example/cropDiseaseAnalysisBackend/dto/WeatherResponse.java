package com.example.cropDiseaseAnalysisBackend.dto;

import java.util.List;

public record WeatherResponse(String location, int currentTemp, String description, int humidity, int rainfall, int windSpeed, List<ForecastItem> forecast) {
    public record ForecastItem(String day, String temp, String icon) { }
}

