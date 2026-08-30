package com.example.cropDiseaseAnalysisBackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Cors cors = new Cors();
    private final Storage storage = new Storage();
    private final Ml ml = new Ml();

    public Cors getCors() { return cors; }
    public Storage getStorage() { return storage; }
    public Ml getMl() { return ml; }

    public static class Cors {
        private String allowedOrigins;
        public String getAllowedOrigins() { return allowedOrigins; }
        public void setAllowedOrigins(String allowedOrigins) { this.allowedOrigins = allowedOrigins; }
    }

    public static class Storage {
        private String directory;
        public String getDirectory() { return directory; }
        public void setDirectory(String directory) { this.directory = directory; }
    }

    public static class Ml {
        private boolean enabled;
        private String baseUrl;
        private String predictPath;
        private int connectTimeoutMs;
        private int readTimeoutMs;
        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }
        public String getBaseUrl() { return baseUrl; }
        public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
        public String getPredictPath() { return predictPath; }
        public void setPredictPath(String predictPath) { this.predictPath = predictPath; }
        public int getConnectTimeoutMs() { return connectTimeoutMs; }
        public void setConnectTimeoutMs(int connectTimeoutMs) { this.connectTimeoutMs = connectTimeoutMs; }
        public int getReadTimeoutMs() { return readTimeoutMs; }
        public void setReadTimeoutMs(int readTimeoutMs) { this.readTimeoutMs = readTimeoutMs; }
    }
}

