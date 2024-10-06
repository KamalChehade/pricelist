package com.quantum.quantumweb.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.quantum.quantumweb.models.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    // You can add custom query methods if needed
}
