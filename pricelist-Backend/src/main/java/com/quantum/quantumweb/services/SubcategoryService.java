package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.Subcategory;
import java.util.List;

public interface SubcategoryService {
    List<Subcategory> getAllSubcategories();
    List<Subcategory> getSubcategoriesByCategoryId(int categoryId);
    Subcategory getSubcategoryById(int id);
    Subcategory createSubcategory(Subcategory subcategory);
    Subcategory updateSubcategory(int id, Subcategory subcategory);
    void deleteSubcategory(int id);
}
