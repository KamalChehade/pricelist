package com.quantum.quantumweb.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quantum.quantumweb.config.FTPUtil;
import com.quantum.quantumweb.models.Brand;
import com.quantum.quantumweb.services.BrandService;

import jakarta.validation.Valid;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
@RestController
@CrossOrigin
@RequestMapping("/brands")
public class BrandController {

    @Value("${ftp.server}")
    private String ftpServer;

    @Value("${ftp.port}")
    private int ftpPort;

    @Value("${ftp.user}")
    private String ftpUser;

    @Value("${ftp.pass}")
    private String ftpPass;

    @Value("${ftp.brandDir}")
    private String ftpBrandDir;

    @Autowired
    private BrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable int id) {
        Brand brand = brandService.getBrandById(id);
        if (brand != null) {
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<String> getBrandNameById(@PathVariable int id) {
        String brandName = brandService.getBrandNameById(id);
        if (brandName != null) {
            return new ResponseEntity<>(brandName, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) {
        Brand createdBrand = brandService.createBrand(brand);
        return new ResponseEntity<>(createdBrand, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable int id, @Valid @RequestBody Brand brand) {
        Brand updatedBrand = brandService.updateBrand(id, brand);
        if (updatedBrand != null) {
            return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable int id) {
        brandService.deleteBrand(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<Object> uploadBrandImage(@PathVariable("id") int id,
                                                   @RequestParam("file") MultipartFile file) {
        try {
            // Get the brand
            Brand brand = brandService.getBrandById(id);
            if (brand == null) {
                return ResponseEntity.notFound().build();
            }

            // Generate unique filename
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Upload file to FTP
            boolean uploaded = FTPUtil.uploadFile(ftpServer, ftpPort, ftpUser, ftpPass, ftpBrandDir, fileName, file.getInputStream());

            if (uploaded) {
                // Update brand image path with relative FTP path
                String relativeImagePath = "/uploads/brandImages/" + fileName;
                brand.setBrandImage(relativeImagePath);
                brandService.updateBrand(id, brand);

                return ResponseEntity.ok().body(Map.of("brandImage", relativeImagePath));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file to FTP server.");
            }
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file: " + ex.getMessage());
        }
    }
}
