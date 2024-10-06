package com.quantum.quantumweb.dto;

import jakarta.validation.constraints.NotEmpty;

public class CategoryDto {

    @NotEmpty(message = "Category name is required")
    private String name;
    
    @NotEmpty(message ="brand Id is required")
    private int brandId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}
    
    
}
