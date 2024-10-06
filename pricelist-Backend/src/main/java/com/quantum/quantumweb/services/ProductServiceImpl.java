package com.quantum.quantumweb.services;

import com.quantum.quantumweb.config.NotFoundException;
import com.quantum.quantumweb.models.Category;
import com.quantum.quantumweb.models.Product;
import com.quantum.quantumweb.repositories.BrandRepository;
import com.quantum.quantumweb.repositories.CategoryRepository;
import com.quantum.quantumweb.repositories.ProductRepository;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsBySubcategoryId(Integer subcategoryId) {
        return productRepository.findBySubcategoryId(subcategoryId);
    }

    @Override
    public Product getProductById(int id) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.orElse(null);
    }
    
    @Override
    public List<Product> getProductsByCategoryId(int categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    
    @Override
    public byte[] getProductImage(int productId) throws IOException {
        Product product = getProductById(productId);
        if (product != null && product.getThumbnailImage() != null) {
            // Construct the absolute path to the image file
            String rootDirectory = "C:/Users/kamal/Downloads/QuantumDashboard/AdminPanel/src/";
            String relativeImagePath = product.getThumbnailImage();
            String absoluteImagePath = rootDirectory + relativeImagePath;

            // Read the image bytes from the file
            return Files.readAllBytes(Paths.get(absoluteImagePath));
        } else {
            throw new NotFoundException("Product image not found for product ID: " + productId);
        }
    }

    @Override
    @Transactional
    public Product createProduct(Product product) {
        product.setIsNew(true);
        product.setOnDiscount(false); // Default value for onDiscount
        product.setMoq(false); // Default value for moq
        product.setStatus(true);
        return productRepository.save(product);
    }
 @Override
 @Transactional
 public Product updateProduct(int id, Product product) {
     Optional<Product> optionalProduct = productRepository.findById(id);
     if (optionalProduct.isPresent()) {
         Product existingProduct = optionalProduct.get();
         
         // Check if the price is being updated
         if (existingProduct.getPrice() != product.getPrice()) {
             // Price is being updated, set updatePriceFlag to true
             existingProduct.setUpdatePriceFlag(true);
         }
       
         // Update existing fields
         existingProduct.setName(product.getName());
         existingProduct.setDescription(product.getDescription());
         existingProduct.setPrice(product.getPrice());
         existingProduct.setDealerPrice(product.getDealerPrice());
         existingProduct.setOnDiscount(false);
         existingProduct.setMoq(false);

         // Update new fields if provided
         if (product.getOnDiscount() != null) {
             existingProduct.setOnDiscount(product.getOnDiscount());
         }
         if (product.getDiscountPrice() != null) {
             existingProduct.setDiscountPrice(product.getDiscountPrice());
         }
         if (product.getMoq() != null) {
             existingProduct.setMoq(product.getMoq());
         }
         if (product.getMoqQuantity() != null) {
             existingProduct.setMoqQuantity(product.getMoqQuantity());
         }
         if (product.getMoqPrice() != null) {
             existingProduct.setMoqPrice(product.getMoqPrice());
         }
         if (product.isStatus() != existingProduct.isStatus()) {
             existingProduct.setStatus(product.isStatus());
         }
         
         // Update itemCode
         if (product.getItemCode() != null && !product.getItemCode().isEmpty()) {
             existingProduct.setItemCode(product.getItemCode());
         }

         // Update quantity
         if (product.getQty() != null) {
             existingProduct.setQty(product.getQty());
         }

         // Set price update time
         existingProduct.setPriceUpdateTime(LocalDateTime.now());
         
         // Check and reset updatePriceFlag after 2 minutes
         existingProduct.checkAndUpdatePriceFlag();
         
         // Save the updated product
         Product updatedProduct = productRepository.save(existingProduct);
         
         // Output updatedProduct to see if updatePriceFlag is true
         System.out.println("Updated Product: " + updatedProduct);
         
         return updatedProduct;
     } else {
         return null; // or throw an exception
     }
 }




    @Override
    @Transactional
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public String getProductNameById(int productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        return productOptional.map(Product::getName).orElse(null);
    }
    @Override
    public Boolean isNewProduct(int id) {
        Product product = getProductById(id);
        return product != null && product.getIsNew();
    }

    @Override
    @Transactional
    public void setNewProduct(int id, boolean isNew) {
        Product product = getProductById(id);
        if (product != null) {
            product.setIsNew(isNew);
        }
    }

    @Override
    @Transactional
    public void updateProductIsNew(int productId, boolean isNew) {
        Product product = getProductById(productId);
        if (product != null) {
            product.setIsNew(isNew);
        }
    }
  
    @Override
    @Transactional
    public Product updateProductDealerPrice(int id, Double dealerPrice) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setDealerPrice(dealerPrice);
            return productRepository.save(existingProduct);
        } else {
            return null; // or throw an exception
        }
    }
    @Override
    public Double getProductDealerPrice(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return product.getDealerPrice();
        } else {
            return 0.0; // or throw an exception
        }
        }
	@Override
	public String getProductThumbnailPathById(int productId) {
		// TODO Auto-generated method stub
		return null;
	}

	  @PersistenceContext
	    private EntityManager entityManager;

	    private static final Map<String, String> synonyms = new HashMap<>();

	    static {
	        synonyms.put("usb", "flash memory");
	        synonyms.put("flash memory", "usb");
	        // Add more synonyms as needed
	    }

	    @Override
	    public List<Product> searchProducts(String query) {
	        String normalizedQuery = query.toLowerCase();
	        String synonymQuery = synonyms.getOrDefault(normalizedQuery, normalizedQuery);
	        String queryString = "%" + normalizedQuery + "%";
	        String synonymQueryString = "%" + synonymQuery + "%";
	        String exactMatch = normalizedQuery;
	        String synonymExactMatch = synonymQuery;
	        String startsWithMatch = normalizedQuery + "%";
	        String synonymStartsWithMatch = synonymQuery + "%";

	        // JPQL query to search products based on name, price, category, and subcategory with prioritization
	        String jpql = "SELECT p FROM Product p " +
	                      "WHERE lower(p.name) LIKE :queryString " +
	                      "OR lower(p.name) LIKE :synonymQueryString " +
	                      "OR CAST(p.price AS string) LIKE :queryString " +
	                      "OR lower((SELECT c.name FROM Category c WHERE c.id = p.categoryId)) LIKE :queryString " +
	                      "OR lower((SELECT c.name FROM Category c WHERE c.id = p.categoryId)) LIKE :synonymQueryString " +
	                      "OR lower((SELECT s.name FROM Subcategory s WHERE s.id = p.subcategoryId)) LIKE :queryString " +
	                      "OR lower((SELECT s.name FROM Subcategory s WHERE s.id = p.subcategoryId)) LIKE :synonymQueryString " +
	                      "ORDER BY " +
	                      "   CASE " +
	                      "       WHEN lower(p.name) = :exactMatch THEN 1 " + // Exact name match has highest priority
	                      "       WHEN lower(p.name) = :synonymExactMatch THEN 1 " + // Synonym exact name match has highest priority
	                      "       WHEN lower(p.name) LIKE :startsWithMatch THEN 2 " + // Name starts with query
	                      "       WHEN lower(p.name) LIKE :synonymStartsWithMatch THEN 2 " + // Name starts with synonym query
	                      "       ELSE 3 " + // Default order for other matches
	                      "   END";

	        TypedQuery<Product> productQuery = entityManager.createQuery(jpql, Product.class);
	        productQuery.setParameter("queryString", queryString);
	        productQuery.setParameter("synonymQueryString", synonymQueryString);
	        productQuery.setParameter("exactMatch", exactMatch);
	        productQuery.setParameter("synonymExactMatch", synonymExactMatch);
	        productQuery.setParameter("startsWithMatch", startsWithMatch);
	        productQuery.setParameter("synonymStartsWithMatch", synonymStartsWithMatch);

	        return productQuery.getResultList();
	    }
	   @Override
	    public String getAdvertisementImageById(int advertisementId) {
	         
	        return "https://example.com/advertisement/" + advertisementId + "/image";
	    }
	   @Override
	   @Transactional
	   public void updateProductIsOnDiscount(int productId, boolean onDiscount) {
	       Product product = getProductById(productId);
	       if (product != null) {
	           product.setOnDiscount(onDiscount);
	       }
	   }

	   @Override
	   @Transactional
	   public void updateProductDiscountPrice(int productId, Double discountPrice) {
	       Product product = getProductById(productId);
	       if (product != null) {
	           product.setDiscountPrice(discountPrice);
	       }
	   }

	   @Override
	   @Transactional
	   public void updateProductMoq(int productId, boolean moq) {
	       Product product = getProductById(productId);
	       if (product != null) {
	           product.setMoq(moq);
	       }
	   }

	   @Override
	   @Transactional
	   public void updateProductMoqQuantity(int productId, Integer moqQuantity) {
	       Product product = getProductById(productId);
	       if (product != null) {
	           product.setMoqQuantity(moqQuantity);
	       }
	   }

	   @Override
	   @Transactional
	   public void updateProductMoqPrice(int productId, Double moqPrice) {
	       Product product = getProductById(productId);
	       if (product != null) {
	           product.setMoqPrice(moqPrice);
	       }
	   }
	    @Override
	    @Transactional
	    public void updateProductStatus(int id, boolean status) {
	        Optional<Product> optionalProduct = productRepository.findById(id);
	        optionalProduct.ifPresent(product -> {
	            product.setStatus(status);
	            productRepository.save(product);
	        });
	    }
	    @Override
	    public Boolean getProductStatus(int id) {
	        Product product = getProductById(id);
	        return product != null ? product.isStatus() : null;
	    }

	   @PostConstruct
	   @Scheduled(fixedDelay = 18000000) // Runs every 5 hours (5 * 60 * 60 * 1000 milliseconds)
	   public void checkAndUpdatePriceFlag() {
	       List<Product> products = getAllProducts();
	       LocalDateTime currentTime = LocalDateTime.now();
	       System.out.println("Scheduled task is running at: " + currentTime);

	       for (Product product : products) {
	           if (product.isUpdatePriceFlag() && product.getPriceUpdateTime() != null &&
	                   product.getPriceUpdateTime().plusHours(72).isBefore(currentTime)) {
	               product.setUpdatePriceFlag(false);
	               productRepository.save(product);
	           }
	       }
	   }
	   @Override
	    public List<Product> getSuggestions(String query) {
	        List<Product> allProducts = getAllProducts(); // Retrieve all products
	        List<Product> suggestions = new ArrayList<>();
	        
	        for (Product product : allProducts) {
	            if (product.getName().toLowerCase().contains(query.toLowerCase()) ||
	                product.getDescription().toLowerCase().contains(query.toLowerCase()) ||
	                String.valueOf(product.getPrice()).toLowerCase().contains(query.toLowerCase())) {
	                suggestions.add(product); // Add matching product to the list
	            }
	        }
	        
	        return suggestions; // Return the list of matching products
	    }
	    @Override
	    @Transactional
	    public String getCategoryByProductId(int productId) {
	        Product product = getProductById(productId);
	        if (product != null) {
	            int categoryId = product.getCategoryId(); // Get categoryId from Product entity
	            Category category = categoryRepository.findById(categoryId).orElse(null);
	            return category != null ? category.getName() : null;
	        } else {
	            throw new NotFoundException("Product not found with ID: " + productId);
	        }
	        
	       
	        
	    }	 
	    @Override
	    @Transactional
	    public void updateProductIsAdvertised(int productId, boolean isAdvertised) {
	        Product product = getProductById(productId);
	        if (product != null) {
	            product.setShowAdvertisementButton(isAdvertised);
	            productRepository.save(product);
	        }
	    }

	    @Override
	    public boolean getProductIsAdvertised(int productId) {
	        Product product = getProductById(productId);
	        return product != null && product.isShowAdvertisementButton();
	    }

		@Override
		public List<Product> getProductsByIds(List<Integer> ids) {
	        return productRepository.findAllById(ids);

		}
		@Override
	    @Transactional
	    public int getBrandIdByProductId(int productId) {
	        Product product = getProductById(productId);
	        if (product != null) {
	            int categoryId = product.getCategoryId();
	            return categoryService.getBrandIdByCategoryId(categoryId);
	        } else {
	            throw new NotFoundException("Product not found with ID: " + productId);
	        }
	    }
		   @Override
		    @Transactional
		    public void updateProductYoutubeLink(int productId, String youtubeLink) {
		        Product product = getProductById(productId);
		        if (product != null) {
		            product.setYoutubeLink(youtubeLink);
		            productRepository.save(product);
		        } else {
		            throw new NotFoundException("Product not found with ID: " + productId);
		        }
		    }
		   @Override
		    public String getProductYoutubeLink(int id) {
		        Product product = productRepository.findById(id).orElse(null);
		        return product != null ? product.getYoutubeLink() : null;
		    }
		    @Override
		    @Transactional
		    public void updateProductAdditionalDescription(int productId, String additionalDescription) {
		        Product product = getProductById(productId);
		        if (product != null) {
		            product.setAdditionalDescription(additionalDescription);
		            productRepository.save(product);
		        } else {
		            throw new NotFoundException("Product not found with ID: " + productId);
		        }
		    }
		    @Override
		    public String getProductAdditionalDescription(int id) {
		        Product product = productRepository.findById(id).orElse(null);
		        return product != null ? product.getAdditionalDescription() : null;
		    }
		    public Product updateProductQuantity(String itemCode, int qty) {
		        Optional<Product> optionalProduct = productRepository.findByItemCode(itemCode);
		        if (optionalProduct.isPresent()) {
		            Product product = optionalProduct.get();
		            product.setQty(qty);
		            return productRepository.save(product);
		        } else {
		            throw new RuntimeException("Product with itemCode " + itemCode + " not found.");
		        }
		    }
		    
		    @Override
		    @Transactional
		    public void updateverify(int id, boolean verify) {
		        Optional<Product> optionalProduct = productRepository.findById(id);
		        if (optionalProduct.isPresent()) {
		            Product product = optionalProduct.get();
		            product.setVerify(verify); // assuming Product class has a `setVerified` method
		            productRepository.save(product);
		        } else {
		            throw new NotFoundException("Product not found with ID: " + id);
		        }
		    }

		    @Override
		    public Boolean getverifystatus(int id) {
		        Optional<Product> optionalProduct = productRepository.findById(id);
		        return optionalProduct.map(Product::isVerify).orElse(null); // assuming Product class has an `isVerified` method
		    }
}