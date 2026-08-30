package com.example.cropDiseaseAnalysisBackend.web;

import com.example.cropDiseaseAnalysisBackend.service.StorageService;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final StorageService storage;
    public ImageController(StorageService storage) { this.storage = storage; }

    @GetMapping("/{storedName:.+}")
    public ResponseEntity<UrlResource> image(@PathVariable String storedName) throws MalformedURLException {
        Path image = storage.resolve(storedName);
        String type;
        try { type = Files.probeContentType(image); } catch (Exception ignored) { type = MediaType.APPLICATION_OCTET_STREAM_VALUE; }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(type == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : type)).body(new UrlResource(image.toUri()));
    }
}

