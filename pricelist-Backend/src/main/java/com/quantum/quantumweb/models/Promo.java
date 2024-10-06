package com.quantum.quantumweb.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "promo")
public class Promo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "product_id", nullable = false)
    private int productId;

    @Column(name = "promo_type", nullable = false)
    private String promoType;

    @Column(name = "moq")
    private Integer moq;

    @Column(name = "promo_price")
    private BigDecimal promoPrice;

    @Column(name = "additional_product_id")
    private Integer additionalProductId;

    @Column(name = "additional_product_quantity")
    private Integer additionalProductQuantity;

    @Column(name = "gift_product_id")
    private Integer giftProductId;

    @Column(name = "description")
    private String description; // New field for description

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getPromoType() {
        return promoType;
    }

    public void setPromoType(String promoType) {
        this.promoType = promoType;
    }

    public Integer getMoq() {
        return moq;
    }

    public void setMoq(Integer moq) {
        this.moq = moq;
    }

    public BigDecimal getPromoPrice() {
        return promoPrice;
    }

    public void setPromoPrice(BigDecimal promoPrice) {
        this.promoPrice = promoPrice;
    }

    public Integer getAdditionalProductId() {
        return additionalProductId;
    }

    public void setAdditionalProductId(Integer additionalProductId) {
        this.additionalProductId = additionalProductId;
    }

    public Integer getAdditionalProductQuantity() {
        return additionalProductQuantity;
    }

    public void setAdditionalProductQuantity(Integer additionalProductQuantity) {
        this.additionalProductQuantity = additionalProductQuantity;
    }

    public Integer getGiftProductId() {
        return giftProductId;
    }

    public void setGiftProductId(Integer giftProductId) {
        this.giftProductId = giftProductId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
