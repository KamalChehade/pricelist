package com.quantum.quantumweb.controllers;

import com.quantum.quantumweb.models.Promo;
import com.quantum.quantumweb.services.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/promos")
public class PromoController {

    @Autowired
    private PromoService promoService;

    @GetMapping
    public List<Promo> getAllPromos() {
        return promoService.getAllPromos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promo> getPromoById(@PathVariable int id) {
        return promoService.getPromoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Promo createPromo(@RequestBody Promo promo) {
        return promoService.createPromo(promo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promo> updatePromo(@PathVariable int id, @RequestBody Promo promoDetails) {
        Optional<Promo> promoOptional = promoService.getPromoById(id);
        if (!promoOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Promo promo = promoOptional.get();
        promo.setPromoType(promoDetails.getPromoType());
        promo.setMoq(promoDetails.getMoq());
        promo.setPromoPrice(promoDetails.getPromoPrice());
        promo.setAdditionalProductId(promoDetails.getAdditionalProductId());
        promo.setAdditionalProductQuantity(promoDetails.getAdditionalProductQuantity());
        promo.setGiftProductId(promoDetails.getGiftProductId());
        promo.setDescription(promoDetails.getDescription()); // Set description

        Promo updatedPromo = promoService.saveOrUpdatePromo(promo);
        return ResponseEntity.ok(updatedPromo);
    }
    
    @GetMapping("/products/{productId}")
    public ResponseEntity<List<Promo>> getPromosForProduct(@PathVariable int productId) {
        List<Promo> promos = promoService.getPromosForProduct(productId);
        if (promos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(promos);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromo(@PathVariable int id) {
        promoService.deletePromo(id);
        return ResponseEntity.noContent().build();
    }
}
