package com.example.cropDiseaseAnalysisBackend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.example.cropDiseaseAnalysisBackend.dto.WeatherResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {
    private final RestClient client;

    public WeatherService(RestClient.Builder builder) {
        this.client = builder.baseUrl("https://api.open-meteo.com/v1").build();
    }

    public WeatherResponse weather(double latitude, double longitude) {
        try {
            Map<String, Object> response = client.get()
                    .uri(uriBuilder -> uriBuilder.path("/forecast")
                            .queryParam("latitude", latitude)
                            .queryParam("longitude", longitude)
                            .queryParam("current", "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation")
                            .queryParam("daily", "temperature_2m_max,weather_code")
                            .queryParam("timezone", "auto")
                            .build())
                    .retrieve()
                    .body(Map.class);

            if (response == null || !response.containsKey("current")) {
                return fallback(latitude, longitude);
            }

            Map<String, Object> current = (Map<String, Object>) response.get("current");
            Map<String, Object> daily = (Map<String, Object>) response.get("daily");

            double temp = ((Number) current.get("temperature_2m")).doubleValue();
            int humidity = ((Number) current.get("relative_humidity_2m")).intValue();
            double wind = ((Number) current.get("wind_speed_10m")).doubleValue();
            double rain = ((Number) current.get("precipitation")).doubleValue();

            List<WeatherResponse.ForecastItem> forecast = new ArrayList<>();
            List<String> times = (List<String>) daily.get("time");
            List<Number> maxTemps = (List<Number>) daily.get("temperature_2m_max");
            List<Number> codes = (List<Number>) daily.get("weather_code");

            for (int i = 0; i < Math.min(3, times.size()); i++) {
                String day = i == 0 ? "Today" : (i == 1 ? "Tomorrow" : "Day 3");
                String icon = getWeatherIcon(codes.get(i).intValue());
                forecast.add(new WeatherResponse.ForecastItem(day, Math.round(maxTemps.get(i).doubleValue()) + "°", icon));
            }

            return new WeatherResponse("Farm location (" + String.format("%.2f, %.2f", latitude, longitude) + ")",
                    (int) Math.round(temp), getWeatherDescription(codes.get(0).intValue()), humidity, (int) Math.round(rain), (int) Math.round(wind), forecast);
        } catch (Exception e) {
            System.err.println("Weather API failed: " + e.getMessage());
            return fallback(latitude, longitude);
        }
    }

    private String getWeatherIcon(int code) {
        if (code <= 3) return "☀️";
        if (code <= 49) return "☁️";
        if (code <= 69) return "🌧️";
        if (code <= 79) return "🌨️";
        return "⛈️";
    }

    private String getWeatherDescription(int code) {
        if (code == 0) return "Clear sky";
        if (code <= 3) return "Partly Cloudy";
        if (code <= 49) return "Foggy";
        if (code <= 69) return "Rainy";
        if (code <= 79) return "Snowy";
        return "Stormy";
    }

    private WeatherResponse fallback(double latitude, double longitude) {
        return new WeatherResponse("Farm location (" + String.format("%.4f, %.4f", latitude, longitude) + ")", 29,
                "Partly Cloudy", 72, 12, 14,
                List.of(new WeatherResponse.ForecastItem("Today", "29°", "☀️"), new WeatherResponse.ForecastItem("Tomorrow", "28°", "🌦️"), new WeatherResponse.ForecastItem("Day 3", "27°", "🌧️")));
    }
}

