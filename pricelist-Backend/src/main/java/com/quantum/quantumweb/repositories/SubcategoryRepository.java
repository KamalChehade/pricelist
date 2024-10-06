package com.quantum.quantumweb.repositories;

import com.quantum.quantumweb.models.Subcategory;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
	
    @Query("SELECT s FROM Subcategory s INNER JOIN s.category c WHERE c.id = :categoryId")
    List<Subcategory> findByCategoryId(@Param("categoryId") int categoryId);
    
}
