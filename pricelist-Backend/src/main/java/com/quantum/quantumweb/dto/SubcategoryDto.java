package com.quantum.quantumweb.dto;

import com.quantum.quantumweb.models.Subcategory;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class SubcategoryDto {

    private int id;

    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Category ID cannot be null")
    private int categoryId;

    public SubcategoryDto() {
    }

    public SubcategoryDto(Subcategory subcategory) {
        this.id = subcategory.getId();
        this.name = subcategory.getName();
        this.categoryId = subcategory.getCategoryId();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategoryId() { 
        return categoryId;
    }

    public void setCategoryId(int categoryId) { 
        this.categoryId = categoryId;
    }
}
