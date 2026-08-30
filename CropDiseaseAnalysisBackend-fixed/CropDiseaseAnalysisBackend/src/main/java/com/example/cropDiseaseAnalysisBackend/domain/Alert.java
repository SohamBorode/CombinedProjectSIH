package com.example.cropDiseaseAnalysisBackend.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "alerts")
public class Alert {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) private Farmer farmer;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String message;
    @Column(nullable = false) private String risk;
    @Column(nullable = false) private String icon;
    @Column(nullable = false) private Instant createdAt = Instant.now();
    protected Alert() { }
    public Alert(Farmer farmer, String title, String message, String risk, String icon) { this.farmer = farmer; this.title = title; this.message = message; this.risk = risk; this.icon = icon; }
    public Long getId() { return id; }
    public Farmer getFarmer() { return farmer; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public String getRisk() { return risk; }
    public String getIcon() { return icon; }
    public Instant getCreatedAt() { return createdAt; }
}

