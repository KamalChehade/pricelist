package com.quantum.quantumweb.repositories;

import com.quantum.quantumweb.models.Promo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PromoRepository extends JpaRepository<Promo, Integer> {
    List<Promo> findByProductId(int productId);

 }