package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.ProductImage;
import com.quantum.quantumweb.repositories.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;

    @Autowired
    public ProductImageServiceImpl(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }
    @Override
    public ProductImage getProductImageById(int id) {
        return productImageRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductImage> getAllProductImages() {
        return productImageRepository.findAll();
    }

    @Override
    public List<ProductImage> getProductImagesByProductId(int productId) {
        return productImageRepository.getProductImagesByProductId(productId);
    }
    @Override
    public ProductImage updateProductImage(int id, ProductImage updatedProductImage) {
        Optional<ProductImage> existingProductImageOptional = productImageRepository.findById(id);
        if (existingProductImageOptional.isPresent()) {
            ProductImage existingProductImage = existingProductImageOptional.get();
            existingProductImage.setImagePath(updatedProductImage.getImagePath());
            existingProductImage.setProductId(updatedProductImage.getProductId());
            // You can update other fields if needed

            return productImageRepository.save(existingProductImage);
        } else {
            // Product image with the given ID not found
            return null;
        }
    }

    @Override
    public ProductImage saveProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    @Override
    public void deleteProductImage(int id) {
        productImageRepository.deleteById(id);
    }
    
}
