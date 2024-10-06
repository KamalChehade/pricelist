package com.quantum.quantumweb.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ProductImageDTO {
    private int id;
    private String imagePath;
    private int productId;

    public ProductImageDTO() {
    }

    public ProductImageDTO(int id, String imagePath, int productId) {
        this.id = id;
        this.imagePath = imagePath;
        this.productId = productId;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
}