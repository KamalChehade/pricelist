package com.quantum.quantumweb.services;
 
import com.quantum.quantumweb.models.Promo;
import com.quantum.quantumweb.repositories.PromoRepository;
import com.quantum.quantumweb.services.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromoServiceImpl implements PromoService {

    @Autowired
    private PromoRepository promoRepository;

    @Override
    public List<Promo> getAllPromos() {
        return promoRepository.findAll();
    }

    @Override
    public Optional<Promo> getPromoById(int id) {
        return promoRepository.findById(id);
    }

    @Override
    public Promo createPromo(Promo promo) {
        return promoRepository.save(promo);
    }

    @Override
    public Promo saveOrUpdatePromo(Promo promo) {
        return promoRepository.save(promo);
    }
    @Override
    public List<Promo> getPromosForProduct(int productId) {
        return promoRepository.findByProductId(productId);
    }
    @Override
    public void deletePromo(int id) {
        Promo promo = promoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promo not found with id " + id));
        promoRepository.delete(promo);
    }
}
