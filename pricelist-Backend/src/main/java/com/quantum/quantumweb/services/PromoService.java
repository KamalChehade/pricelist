package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.Promo;

import java.util.List;
import java.util.Optional;

public interface PromoService {
    List<Promo> getAllPromos();
    Optional<Promo> getPromoById(int id);
    Promo createPromo(Promo promo);
    Promo saveOrUpdatePromo(Promo promo);
    void deletePromo(int id);
    List<Promo> getPromosForProduct(int productId);
}
