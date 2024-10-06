package com.quantum.quantumweb.controllers;

import com.quantum.quantumweb.dto.SubcategoryDto;
import com.quantum.quantumweb.models.Subcategory;
import com.quantum.quantumweb.services.SubcategoryService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

 import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/subcategories")
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping
    public ResponseEntity<List<Subcategory>> getAllSubcategories() {
        List<Subcategory> subcategories = subcategoryService.getAllSubcategories();
        return ResponseEntity.ok(subcategories);
    }
    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<List<SubcategoryDto>> getSubcategoriesByCategoryId(@PathVariable int categoryId) {
        List<Subcategory> subcategories = subcategoryService.getSubcategoriesByCategoryId(categoryId);
        List<SubcategoryDto> subcategoryDtos = subcategories.stream()
                .map(SubcategoryDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(subcategoryDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subcategory> getSubcategoryById(@PathVariable int id) {
        Subcategory subcategory = subcategoryService.getSubcategoryById(id);
        if (subcategory != null) {
            return ResponseEntity.ok(subcategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Subcategory> createSubcategory(@Valid @RequestBody Subcategory subcategory) {
        Subcategory createdSubcategory = subcategoryService.createSubcategory(subcategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubcategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subcategory> updateSubcategory(@PathVariable int id, @Valid @RequestBody Subcategory subcategory) {
        Subcategory updatedSubcategory = subcategoryService.updateSubcategory(id, subcategory);
        if (updatedSubcategory != null) {
            return ResponseEntity.ok(updatedSubcategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubcategory(@PathVariable int id) {
        subcategoryService.deleteSubcategory(id);
        return ResponseEntity.noContent().build();
    }
}
