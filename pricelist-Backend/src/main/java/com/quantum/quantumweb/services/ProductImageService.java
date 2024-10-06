package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.ProductImage;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ProductImageService {
	ProductImage getProductImageById(int id);

	List<ProductImage> getAllProductImages();

	List<ProductImage> getProductImagesByProductId(int productId);

	ProductImage updateProductImage(int id, ProductImage updatedProductImage);

	ProductImage saveProductImage(ProductImage productImage);

	void deleteProductImage(int id);

}
