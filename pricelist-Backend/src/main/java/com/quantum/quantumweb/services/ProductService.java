package com.quantum.quantumweb.services;

import com.quantum.quantumweb.models.Product;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ProductService {
    List<Product> getAllProducts();

    List<Product> getProductsBySubcategoryId(Integer subcategoryId);

    Product getProductById(int id);

    List<Product> getProductsByCategoryId(int categoryId);

    Product createProduct(Product product);

    Product updateProduct(int id, Product product);

    Product updateProductDealerPrice(int id, Double dealerPrice);

    Double getProductDealerPrice(int id);

    void deleteProduct(int id);

    String getProductThumbnailPathById(int productId);

    byte[] getProductImage(int productId) throws IOException;

    Boolean isNewProduct(int id);

    void setNewProduct(int id, boolean isNew);

    void updateProductIsNew(int productId, boolean isNew);

    List<Product> searchProducts(String query);

    String getAdvertisementImageById(int advertisementId);

    void updateProductIsOnDiscount(int productId, boolean onDiscount);

    void updateProductDiscountPrice(int productId, Double discountPrice);

    void updateProductMoq(int productId, boolean moq);

    void updateProductMoqQuantity(int productId, Integer moqQuantity);

    void updateProductMoqPrice(int productId, Double moqPrice);

    void updateProductStatus(int id, boolean status);

    Boolean getProductStatus(int id);

    List<Product> getSuggestions(String query);

    void updateProductIsAdvertised(int productId, boolean isAdvertised);

    boolean getProductIsAdvertised(int productId);

    String getCategoryByProductId(int productId);

    List<Product> getProductsByIds(List<Integer> ids);

    // New method to get brand ID by product ID
    int getBrandIdByProductId(int productId);

    // New method to get product name by ID
    String getProductNameById(int productId);

    void updateProductAdditionalDescription(int id, String additionalDescription);
    
    String getProductAdditionalDescription(int id);
    
    void updateProductYoutubeLink(int id, String youtubeLink);
    
    String getProductYoutubeLink(int id);

    Product updateProductQuantity(String itemCode, int qty);
    
    void updateverify(int id, boolean verify);

    Boolean getverifystatus(int id);
}
