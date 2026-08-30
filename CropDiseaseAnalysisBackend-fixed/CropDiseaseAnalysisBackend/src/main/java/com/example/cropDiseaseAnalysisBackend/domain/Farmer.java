package com.example.cropDiseaseAnalysisBackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "farmers")
public class Farmer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String email;
    @Column(nullable = false) private String password;
    @Column(nullable = false) private String phno;
    private String village;
    private String district;
    private String crop;
    private String area;
    private String cropStage;

    protected Farmer() { }
    public Farmer(String name, String email, String password, String village, String district, String crop, String area, String cropStage) {
        this.name = name; this.email = email; this.password = password; this.village = village; this.district = district;
        this.crop = crop; this.area = area; this.cropStage = cropStage;
    }
    public Farmer(String name, String email, String password, String village, String district, String crop, String area, String cropStage, String phno) {
        this(name, email, password, village, district, crop, area, cropStage);
        this.phno = phno;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getPhno() { return phno; }
    public String getVillage() { return village; }
    public String getDistrict() { return district; }
    public String getCrop() { return crop; }
    public String getArea() { return area; }
    public String getCropStage() { return cropStage; }
}

