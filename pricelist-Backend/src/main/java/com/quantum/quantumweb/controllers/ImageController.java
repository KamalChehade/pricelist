package com.quantum.quantumweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quantum.quantumweb.models.Product;
import com.quantum.quantumweb.services.ProductImageServiceImpl;
import com.quantum.quantumweb.services.ProductService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
 public class ImageController {
//	@Autowired
//    private ProductService productService;
//
//	 private final String uploadDir = "C:/Users/kamal/git/repository/quantumweb/src/main/resources/static/images/";
//	    private final String brandDir = "C:/Users/kamal/git/repository/quantumweb/src/main/resources/static/brandImages/";
//	    @GetMapping("/{type}/{filename:.+}") // Define the URL pattern to include the type (images or brands)
//	    public ResponseEntity<Resource> serveImage(@PathVariable String type, @PathVariable String filename) {
//	        Path imagePath;
//	        if (type.equals("images")) {
//	            imagePath = Paths.get(uploadDir).resolve(filename);
//	        } else if (type.equals("brandImages")) {
//	            imagePath = Paths.get(brandDir).resolve(filename);
//	        } else {
//	            return ResponseEntity.notFound().build(); // Handle invalid type
//	        }
//
//	        Resource resource;
//	        try {
//	            resource = new UrlResource(imagePath.toUri());
//	            if (!resource.exists() || !resource.isReadable()) {
//	                return ResponseEntity.notFound().build();
//	            }
//	            
//	            MediaType mediaType = getMediaType(filename);
//	            
//	            return ResponseEntity.ok().contentType(mediaType).body(resource);
//	        } catch (IOException e) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//	        }
//	    }
//
//    private MediaType getMediaType(String filename) {
//        String extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
//        switch (extension) {
//            case "png":
//                return MediaType.IMAGE_PNG;
//            case "jpg":
//            case "jpeg":
//                return MediaType.IMAGE_JPEG;
//            case "webp":
//                return MediaType.valueOf("image/webp");
//            default:
//                return MediaType.APPLICATION_OCTET_STREAM;
//        }
//    }
   
}

