package com.quantum.quantumweb.services;

import java.util.List;
import java.util.Optional;

import com.quantum.quantumweb.models.Category;

public interface CategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(int id);
    List<Category> getCategoriesByBrandId(int brandId);
    int getBrandIdByCategoryId(int categoryId); // Existing method
    String getCategoryNameById(int categoryId); // New method
    Category createCategory(Category category);
    Category updateCategory(int id, Category category);
    void deleteCategory(int id);
    Optional<Category> getCategoryByNameAndBrandId(String name, int brandId);

}