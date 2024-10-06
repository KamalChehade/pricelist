package com.quantum.quantumweb.services;

import java.util.List;

import com.quantum.quantumweb.models.Brand;

public interface BrandService {
    List<Brand> getAllBrands();
    Brand getBrandById(int id);
    Brand createBrand(Brand brand);
    Brand updateBrand(int id, Brand brand);
    void deleteBrand(int id);
   String getBrandNameById(int id);
}