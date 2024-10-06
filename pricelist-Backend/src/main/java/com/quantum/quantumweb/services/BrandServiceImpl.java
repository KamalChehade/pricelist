package com.quantum.quantumweb.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantum.quantumweb.models.Brand;
import com.quantum.quantumweb.repositories.BrandRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getBrandById(int id) {
        Optional<Brand> optionalBrand = brandRepository.findById(id);
        return optionalBrand.orElse(null);
    }

    @Override
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brand updateBrand(int id, Brand brand) {
        if (brandRepository.existsById(id)) {
            brand.setId(id);
            return brandRepository.save(brand);
        }
        return null;
    }
    @Override
    public String getBrandNameById(int id) {
        Optional<Brand> optionalBrand = brandRepository.findById(id);
        return optionalBrand.map(Brand::getName).orElse(null);
    }
    @Override
    public void deleteBrand(int id) {
        brandRepository.deleteById(id);
    }
}
