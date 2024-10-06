package com.quantum.quantumweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import com.quantum.quantumweb.config.FTPUtil;
import com.quantum.quantumweb.models.Product;
import com.quantum.quantumweb.services.ProductService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

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

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query) {
        List<Product> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/byIds")
    public ResponseEntity<List<Product>> getProductsByIds(@RequestParam("ids") List<Integer> ids) {
        List<Product> products = productService.getProductsByIds(ids);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategoryId(@PathVariable("categoryId") int categoryId) {
        List<Product> products = productService.getProductsByCategoryId(categoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/bySubcategory/{subcategoryId}")
    public ResponseEntity<List<Product>> getProductsBySubcategoryId(@PathVariable("subcategoryId") int subcategoryId) {
        List<Product> products = productService.getProductsBySubcategoryId(subcategoryId);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @Valid @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/discountPrice")
    public ResponseEntity<?> updateProductDiscountPrice(@PathVariable int id, @RequestBody Double discountPrice) {
        try {
            productService.updateProductDiscountPrice(id, discountPrice);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update discountPrice property: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<Object> uploadProductImage(@PathVariable("id") int id, @RequestParam("file") MultipartFile file) {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            InputStream inputStream = file.getInputStream();
            boolean uploaded = FTPUtil.uploadFile(ftpServer, ftpPort, ftpUser, ftpPass, ftpUploadDir, fileName, inputStream);
            if (uploaded) {
                String relativeImagePath = ftpUploadDir + "/" + fileName;
                return ResponseEntity.ok().body(Map.of("productImage", relativeImagePath));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file to FTP server.");
            }
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file: " + ex.getMessage());
        }
    }

    @PutMapping("/{id}/isNew")
    public ResponseEntity<?> updateProductIsNew(@PathVariable("id") int id, @RequestBody Boolean isNew) {
        try {
            productService.updateProductIsNew(id, isNew);
            System.out.println("isNew changed to: " + isNew);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update isNew property: " + e.getMessage());
        }
    }
    @PutMapping("/{id}/isAdvertised")
    public ResponseEntity<?> updateProductIsAdvertised(@PathVariable("id") int id, @RequestBody Boolean isAdvertised) {
        try {
            productService.updateProductIsAdvertised(id, isAdvertised);
            System.out.println("isAdvertised changed to: " + isAdvertised);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update isAdvertised property: " + e.getMessage());
        }
    }


    @GetMapping("/{id}/dealerPrice")
    public ResponseEntity<Double> getProductDealerPrice(@PathVariable int id) {
        Double dealerPrice = productService.getProductDealerPrice(id);
        return ResponseEntity.ok(dealerPrice);
    }

    @PutMapping("/{id}/dealerPrice")
    public ResponseEntity<Product> updateProductDealerPrice(@PathVariable int id, @RequestBody Double dealerPrice) {
        Product updatedProduct = productService.updateProductDealerPrice(id, dealerPrice);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/moq")
    public ResponseEntity<?> updateProductMoq(@PathVariable int id, @RequestBody Map<String, Boolean> requestBody) {
        Boolean moq = requestBody.get("moq");
        if (moq != null) {
            try {
                productService.updateProductMoq(id, moq);
                System.out.println(id + " MOQ changed to: " + moq);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to update MOQ property: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid request body");
        }
    }

    @PutMapping("/{id}/onDiscount")
    public ResponseEntity<?> updateProductOnDiscount(@PathVariable int id, @RequestBody Map<String, Boolean> requestBody) {
        Boolean onDiscount = requestBody.get("onDiscount");
        if (onDiscount != null) {
            try {
                productService.updateProductIsOnDiscount(id, onDiscount);
                System.out.println(id + " onDiscount changed to: " + onDiscount);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to update onDiscount property: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid request body");
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateProductStatus(@PathVariable int id, @RequestBody boolean status) {
        try {
            productService.updateProductStatus(id, status);
            System.out.println("Status changed to: " + status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update status property: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Boolean> getProductStatus(@PathVariable int id) {
        Boolean status = productService.getProductStatus(id);
        if (status != null) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<Product>> getSuggestions(@RequestParam("query") String query) {
        List<Product> suggestions = productService.getSuggestions(query);
        return new ResponseEntity<>(suggestions, HttpStatus.OK);
    }

    @GetMapping("/{productId}/category")
    public ResponseEntity<String> getCategoryByProductId(@PathVariable int productId) {
        String categoryName = productService.getCategoryByProductId(productId);
        return ResponseEntity.ok(categoryName);
    }
    @GetMapping("/{id}/brand-id")
    public ResponseEntity<Integer> getBrandIdByProductId(@PathVariable int id) {
        int brandId = productService.getBrandIdByProductId(id);
        return new ResponseEntity<>(brandId, HttpStatus.OK);
    }
    @GetMapping("/{id}/name")
    public ResponseEntity<String> getProductNameById(@PathVariable("id") int id) {
        String productName = productService.getProductNameById(id);
        if (productName != null) {
            return ResponseEntity.ok(productName);
        } else {
            return ResponseEntity.notFound().build();
       }
    }
    
 //new Description and youtube link 
    
    
    
    
    @PutMapping("/{id}/additionalDescription")
    public ResponseEntity<?> updateProductAdditionalDescription(@PathVariable int id, @RequestBody String additionalDescription) {
        try {
            productService.updateProductAdditionalDescription(id, additionalDescription);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update additional description: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/additionalDescription")
    public ResponseEntity<String> getProductAdditionalDescription(@PathVariable int id) {
        String additionalDescription = productService.getProductAdditionalDescription(id);
        if (additionalDescription != null) {
            return ResponseEntity.ok(additionalDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   @PutMapping("/{id}/youtubeLink")
public ResponseEntity<String> updateProductYoutubeLink(@PathVariable int id, @RequestBody Map<String, String> requestBody) {
    String youtubeLink = requestBody.get("youtubeLink");

    // Handle the case where the youtubeLink might be empty
    if (youtubeLink != null && !youtubeLink.trim().isEmpty()) {
        if (!isValidYouTubeLink(youtubeLink)) {
            return ResponseEntity.badRequest().body("Invalid YouTube link.");
        }
    } else {
        // Set to null if empty or null
        youtubeLink = null;
    }

    try {
        if (youtubeLink != null) {
            String iframeEmbedCode = generateIframeEmbedCode(youtubeLink);
            productService.updateProductYoutubeLink(id, youtubeLink);
            return ResponseEntity.ok(iframeEmbedCode);
        } else {
            productService.updateProductYoutubeLink(id, youtubeLink);
            return ResponseEntity.ok("YouTube link cleared.");
        }
    } catch (Exception e) {
        // Log the exception (optional)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to update YouTube link: " + e.getMessage());
    }
}

    private String generateIframeEmbedCode(String youtubeLink) {
        String videoId = extractVideoIdFromUrl(youtubeLink);
        if (videoId != null) {
            return String.format("<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/%s\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>", videoId);
        }
        return "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
    }

    private String extractVideoIdFromUrl(String url) {
        if (url != null && url.contains("v=")) {
            String[] params = url.split("v=");
            return params[1].split("&")[0];
        }
        return null;
    }

    private boolean isValidYouTubeLink(String url) {
        // Basic validation for YouTube URL
        return url != null && url.startsWith("https://www.youtube.com/watch?v=");
    }

    @GetMapping("/{id}/youtubeLink")
    public ResponseEntity<String> getProductYoutubeLink(@PathVariable int id) {
        String youtubeLink = productService.getProductYoutubeLink(id);
        if (youtubeLink != null) {
            return ResponseEntity.ok(youtubeLink);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/verify")
    public ResponseEntity<?> updateProductVerify(@PathVariable("id") int id, @RequestBody Boolean verify) {
        try {
            productService.updateverify(id, verify);
            System.out.println("Verification status changed to: " + verify);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update verify status: " + e.getMessage());
        }
    }
}