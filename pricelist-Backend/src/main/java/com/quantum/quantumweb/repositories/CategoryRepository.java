package com.quantum.quantumweb.repositories;

 import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quantum.quantumweb.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByBrandId(int brandId);

    Optional<Category> findByName(String name); // Add this method
    Optional<Category> findByNameAndBrandId(String name, int brandId); // Add this method


}
