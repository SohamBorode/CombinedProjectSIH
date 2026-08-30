package com.example.cropDiseaseAnalysisBackend.service;

import com.example.cropDiseaseAnalysisBackend.config.AppProperties;
import com.example.cropDiseaseAnalysisBackend.dto.MlPrediction;
import com.example.cropDiseaseAnalysisBackend.web.ApiException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import java.io.IOException;

@Service
public class MlInferenceClient {
    private final AppProperties properties;
    private final RestClient client;

    public MlInferenceClient(AppProperties properties, RestClient.Builder builder) {
        this.properties = properties;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getMl().getConnectTimeoutMs());
        factory.setReadTimeout(properties.getMl().getReadTimeoutMs());
        this.client = builder.baseUrl(properties.getMl().getBaseUrl()).requestFactory(factory).build();
    }

    public MlPrediction predict(MultipartFile file, String crop, String cropStage, double latitude, double longitude) {
        if (!properties.getMl().isEnabled()) {
            return new MlPrediction("Development prediction", 0, "Unknown", "ML inference is disabled. Configure ML_ENABLED=true to use the trained model.");
        }

        try {
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", new NamedByteArrayResource(file.getBytes(), safeFileName(file)));
            body.add("crop", crop);
            body.add("cropStage", cropStage);
            body.add("latitude", String.valueOf(latitude));
            body.add("longitude", String.valueOf(longitude));
            MlPrediction response = client.post()
                    .uri(properties.getMl().getPredictPath())
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .body(MlPrediction.class);
            if (response == null || response.diseaseName() == null || response.diseaseName().isBlank() || response.confidence() < 0 || response.confidence() > 100) {
                throw new ApiException(502, "The ML service returned an invalid prediction.");
            }
            return response;
        } catch (IOException exception) {
            throw new ApiException(500, "Unable to read crop image for model inference.");
        } catch (RestClientException exception) {
            throw new ApiException(502, "The ML inference service is unavailable.");
        }
    }

    private String safeFileName(MultipartFile file) {
        String name = file.getOriginalFilename();
        return name == null || name.isBlank() ? "crop-image" : name.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    private static class NamedByteArrayResource extends ByteArrayResource {
        private final String filename;
        NamedByteArrayResource(byte[] byteArray, String filename) { super(byteArray); this.filename = filename; }
        @Override public String getFilename() { return filename; }
    }
}

