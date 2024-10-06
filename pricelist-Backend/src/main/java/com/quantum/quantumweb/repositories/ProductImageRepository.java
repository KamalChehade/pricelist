package com.quantum.quantumweb.repositories;

import com.quantum.quantumweb.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    @Query("SELECT pi FROM ProductImage pi WHERE pi.productId = :productId")
    List<ProductImage> getProductImagesByProductId(@Param("productId") int productId);
}