package com.quantum.quantumweb.dto;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProductDto {

    @NotEmpty(message = "Product name is required")
    private String name;

    @NotEmpty(message = "Product description is required")
    private String description;

    @NotNull(message = "Product price is required")
    @PositiveOrZero(message = "Product price must be a positive number or zero")
    private double price;

    @Nullable
    private Integer subcategoryId; // Change type to Integer to allow null values

    private String thumbnailImagePath; 
    private String AdvertismentImagePath; 

    private Boolean isNew; // Add isNew property

    private int categoryId ;
    // Getters and setters
    
    
    public String getName() {
        return name;
    }

    public String getAdvertismentImagePath() {
		return AdvertismentImagePath;
	}

	public void setAdvertismentImagePath(String advertismentImagePath) {
		AdvertismentImagePath = advertismentImagePath;
	}

	public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    

    public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Integer subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getThumbnailImagePath() {
        return thumbnailImagePath;
    }

    public void setThumbnailImagePath(String thumbnailImagePath) {
        this.thumbnailImagePath = thumbnailImagePath;
    }
    public Boolean getIsNew() {
        return isNew;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }
}
