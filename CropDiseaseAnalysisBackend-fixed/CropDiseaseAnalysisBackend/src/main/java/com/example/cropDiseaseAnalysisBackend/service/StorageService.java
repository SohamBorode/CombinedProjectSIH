package com.example.cropDiseaseAnalysisBackend.service;

import com.example.cropDiseaseAnalysisBackend.config.AppProperties;
import com.example.cropDiseaseAnalysisBackend.web.ApiException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class StorageService {
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
    private final Path root;

    public StorageService(AppProperties properties) {
        this.root = Path.of(properties.getStorage().getDirectory()).toAbsolutePath().normalize();
        try { Files.createDirectories(root); }
        catch (IOException exception) { throw new IllegalStateException("Unable to create upload directory", exception); }
    }

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) throw ApiException.badRequest("A crop image is required.");
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) throw ApiException.badRequest("Only JPG, PNG, and WebP images are accepted.");

        String extension = switch (file.getContentType()) { case "image/png" -> ".png"; case "image/webp" -> ".webp"; default -> ".jpg"; };
        String storedName = UUID.randomUUID() + extension;
        Path target = root.resolve(storedName).normalize();
        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return storedName;
        } catch (IOException exception) {
            throw new ApiException(500, "Unable to store crop image.");
        }
    }

    public Path resolve(String storedName) {
        Path file = root.resolve(storedName).normalize();
        if (!file.startsWith(root) || !Files.exists(file)) throw ApiException.notFound("Image not found.");
        return file;
    }
}

