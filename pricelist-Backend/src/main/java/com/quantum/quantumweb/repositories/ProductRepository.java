package com.quantum.quantumweb.repositories;

import com.quantum.quantumweb.models.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
   
	List<Product> findBySubcategoryId(int subcategoryId);

    String findThumbnailImageById(@Param("id") int id);
    
    List<Product> findByCategoryId(int categoryId);
 
    Optional<Product> findByItemCode(String itemCode);

}
