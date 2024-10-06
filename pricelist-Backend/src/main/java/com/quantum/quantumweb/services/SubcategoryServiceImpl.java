package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.Subcategory;
import com.quantum.quantumweb.repositories.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Override
    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }

    @Override
    public Subcategory getSubcategoryById(int id) {
        Optional<Subcategory> subcategoryOptional = subcategoryRepository.findById(id);
        return subcategoryOptional.orElse(null);
    }

    @Override
    public Subcategory createSubcategory(Subcategory subcategory) {
        return subcategoryRepository.save(subcategory);
    }

    @Override
    public Subcategory updateSubcategory(int id, Subcategory subcategory) {
        subcategory.setId(id);
        return subcategoryRepository.save(subcategory);
    }

    @Override
    public void deleteSubcategory(int id) {
        subcategoryRepository.deleteById(id);
    }

    @Override
    public List<Subcategory> getSubcategoriesByCategoryId(int categoryId) {
        return subcategoryRepository.findByCategoryId(categoryId);
    }
}
