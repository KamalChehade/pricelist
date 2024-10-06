package com.quantum.quantumweb.models;

import java.time.LocalDateTime;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;
    
    @Column(name = "item_code", unique = true, nullable = true)
    private String itemCode;
   
    @Column(name = "price")
    private double price;

    @Column(name = "subcategory_id")
    private Integer subcategoryId;

    @Column(name = "thumbnail_image")
    private String thumbnailImage;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "dealer_price", nullable = true)
    private Double dealerPrice;

    @Column(name = "on_discount")
    @Nullable
    private Boolean onDiscount;

    @Column(name = "discount_price", nullable = true)
    @Nullable
    private Double discountPrice;

    @Column(name = "moq")
    @Nullable
    private Boolean moq;

    @Column(name = "moq_quantity")
    @Nullable
    private Integer moqQuantity;

    @Column(name = "moq_price", nullable = true)
    @Nullable
    private Double moqPrice;
   
    @Column(name = "update_price_flag")
    private boolean updatePriceFlag;

    @Column(name = "price_update_time")
    private LocalDateTime priceUpdateTime;

    @Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean status; // New column added

    @Column(name = "show_advertisement_button", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean isAdvertised;
    
    @Column(name = "additional_description", columnDefinition = "TEXT")
    private String additionalDescription;

    @Column(name = "youtube_link")
    private String youtubeLink;
   
    @Column(name = "qty", nullable = true)
    private Integer qty;

    @Column(name = "verify", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean verify; 

    public Product() {
    }

    public Product(String name, String description, double price, Integer subcategoryId, String thumbnailImage,
            Boolean isNew, int categoryId, Double dealerPrice,
            Boolean onDiscount, Double discountPrice, Boolean moq, Integer moqQuantity, Double moqPrice,
            boolean status, boolean isAdvertised, String additionalDescription, String youtubeLink,
            String itemCode, Integer qty, boolean verify) { // Updated constructor
        this.name = name;
        this.description = description;
        this.price = price;
        this.subcategoryId = subcategoryId;
        this.thumbnailImage = thumbnailImage;
        this.isNew = isNew;
        this.categoryId = categoryId;
        this.dealerPrice = dealerPrice;
        this.onDiscount = onDiscount;
        this.discountPrice = discountPrice;
        this.moq = moq;
        this.moqQuantity = moqQuantity;
        this.moqPrice = moqPrice;
        this.status = status;
        this.isAdvertised = isAdvertised;
        this.additionalDescription = additionalDescription;
        this.youtubeLink = youtubeLink;
        this.itemCode = itemCode;
        this.qty = qty; // Initialize the new field
        this.verify = verify; // Initialize the new field
    }

    public boolean isVerify() {
        return verify;
    }

    public void setVerify(boolean verify) {
        this.verify = verify;
    }

    public String getAdditionalDescription() {
        return additionalDescription;
    }

    public void setAdditionalDescription(String additionalDescription) {
        this.additionalDescription = additionalDescription;
    }
    
    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }
    
    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getYoutubeLink() {
        return youtubeLink;
    }

    public void setYoutubeLink(String youtubeLink) {
        this.youtubeLink = youtubeLink;
    }
   
    public boolean isShowAdvertisementButton() {
        return isAdvertised;
    }

    public void setShowAdvertisementButton(boolean showAdvertisementButton) {
        this.isAdvertised = showAdvertisementButton;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getDealerPrice() {
        return dealerPrice;
    }

    public void setDealerPrice(Double dealerPrice) {
        this.dealerPrice = dealerPrice;
    }

    public Boolean getIsNew() {
        return isNew;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumbnailImage() {
        return thumbnailImage;
    }

    public void setThumbnailImage(String thumbnailImage) {
        this.thumbnailImage = thumbnailImage;
    }
       
    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Integer subcategoryId) {
        this.subcategoryId = subcategoryId;
    }
    
    public Boolean getOnDiscount() {
        return onDiscount;
    }

    public void setOnDiscount(Boolean onDiscount) {
        this.onDiscount = onDiscount;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public Boolean getMoq() {
        return moq;
    }

    public void setMoq(Boolean moq) {
        this.moq = moq;
    }

    public Integer getMoqQuantity() {
        return moqQuantity;
    }

    public void setMoqQuantity(Integer moqQuantity) {
        this.moqQuantity = moqQuantity;
    }

    public Double getMoqPrice() {
        return moqPrice;
    }

    public void setMoqPrice(Double moqPrice) {
        this.moqPrice = moqPrice;
    }

    public void setUpdatePriceFlag(boolean updatePriceFlag) {
        this.updatePriceFlag = updatePriceFlag;
    }

    public boolean isUpdatePriceFlag() {
        return updatePriceFlag;
    }

    public LocalDateTime getPriceUpdateTime() {
        return priceUpdateTime;
    }

    public void setPriceUpdateTime(LocalDateTime priceUpdateTime) {
        this.priceUpdateTime = priceUpdateTime;
    }

    // Method to check and reset updatePriceFlag after 2 minutes
    public void checkAndUpdatePriceFlag() {
        if (updatePriceFlag && priceUpdateTime != null && priceUpdateTime.plusMinutes(2).isBefore(LocalDateTime.now())) {
            updatePriceFlag = false;
        }
    }
    
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", description=" + description + ", additionalDescription=" + additionalDescription + ", youtubeLink=" + youtubeLink + ", price=" + price
                + ", subcategoryId=" + subcategoryId + ", thumbnailImage=" + thumbnailImage + ", isNew=" + isNew
                + ", categoryId=" + categoryId + ", dealerPrice=" + dealerPrice + ", onDiscount=" + onDiscount
                + ", discountPrice=" + discountPrice + ", moq=" + moq + ", moqQuantity=" + moqQuantity
                + ", moqPrice=" + moqPrice + ", updatePriceFlag=" + updatePriceFlag + ", priceUpdateTime="
                + priceUpdateTime + ", status=" + status + ", isAdvertised=" + isAdvertised + ", itemCode=" + itemCode
                + ", qty=" + qty + ", verify=" + verify + "]"; // Updated toString
    }
}
