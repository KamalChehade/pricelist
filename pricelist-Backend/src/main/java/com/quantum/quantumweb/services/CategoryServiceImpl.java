package com.quantum.quantumweb.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantum.quantumweb.models.Category;
import com.quantum.quantumweb.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getCategoriesByBrandId(int brandId) {
        return categoryRepository.findByBrandId(brandId);
    }

    @Override
    public int getBrandIdByCategoryId(int categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.map(Category::getBrandId).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int id, Category category) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            return categoryRepository.save(category);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

    @Override
    public void deleteCategory(int id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

    @Override
    public String getCategoryNameById(int categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.map(Category::getName).orElseThrow(() -> new RuntimeException("Category not found"));
    }
    @Override
    public Optional<Category> getCategoryByNameAndBrandId(String name, int brandId) {
        return categoryRepository.findByNameAndBrandId(name, brandId);
    }
}