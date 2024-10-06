package com.quantum.quantumweb.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.FileNotFoundException;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${upload.dir}")
    private String uploadDir;

    @Value("${upload.brandDir}")
    private String brandDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        try {
            String imagesPath = ResourceUtils.getFile(uploadDir).toURI().toString();
            String brandImagesPath = ResourceUtils.getFile(brandDir).toURI().toString();
            registry.addResourceHandler("/uploads/images/**")
                    .addResourceLocations(imagesPath);
            registry.addResourceHandler("/uploads/brandImages/**")
                    .addResourceLocations(brandImagesPath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
