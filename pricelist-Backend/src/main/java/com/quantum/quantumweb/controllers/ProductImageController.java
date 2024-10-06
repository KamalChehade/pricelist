package com.quantum.quantumweb.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import com.quantum.quantumweb.config.FTPUtil;
import com.quantum.quantumweb.models.Product;
import com.quantum.quantumweb.models.ProductImage;
import com.quantum.quantumweb.services.ProductImageService;
import com.quantum.quantumweb.services.ProductService;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/product-images")
public class ProductImageController {

    @Value("${ftp.server}")
    private String ftpServer;

    @Value("${ftp.port}")
    private int ftpPort;

    @Value("${ftp.user}")
    private String ftpUser;

    @Value("${ftp.pass}")
    private String ftpPass;

    @Value("${ftp.uploadDir}")
    private String ftpUploadDir;

    private final ProductImageService productImageService;
    private final ProductService productService;

    public ProductImageController(ProductImageService productImageService, ProductService productService) {
        this.productImageService = productImageService;
        this.productService = productService;
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<ProductImage> getProductImageById(@PathVariable int id) {
        ProductImage productImage = productImageService.getProductImageById(id);
        if (productImage != null) {
            return ResponseEntity.ok(productImage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductImage>> getProductImagesByProductId(@PathVariable int productId) {
        List<ProductImage> productImages = productImageService.getProductImagesByProductId(productId);
        if (productImages.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(productImages);
    }

    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<Object> uploadProductImage(@PathVariable("id") int id,
                                                      @RequestParam("files") MultipartFile[] files) {
        List<String> uploadedFilePaths = new ArrayList<>();

        try {
            Product product = productService.getProductById(id);
            if (product == null) {
                return ResponseEntity.notFound().build();
            }

            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                InputStream inputStream = file.getInputStream();
                boolean uploaded = FTPUtil.uploadFile(ftpServer, ftpPort, ftpUser, ftpPass, ftpUploadDir, fileName, inputStream);

                if (uploaded) {
                    String relativeImagePath = "uploads/images/" + fileName; // Adjusted relative path
                    ProductImage productImage = new ProductImage(relativeImagePath, id);
                    productImageService.saveProductImage(productImage);
                    uploadedFilePaths.add(relativeImagePath);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file to FTP server.");
                }
            }

            return ResponseEntity.ok().body(Map.of("productImages", uploadedFilePaths));

        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload files: " + ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductImage> updateProductImage(@PathVariable("id") int id,
                                                           @RequestBody ProductImage updatedProductImage) {
        ProductImage existingProductImage = productImageService.getProductImageById(id);
        if (existingProductImage != null) {
            updatedProductImage.setId(id); // Set the ID of the updated product image
            ProductImage updatedImage = productImageService.updateProductImage(id, updatedProductImage);
            return ResponseEntity.ok(updatedImage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductImage(@PathVariable("id") int id) {
        productImageService.deleteProductImage(id);
        return ResponseEntity.noContent().build();
    }
}
