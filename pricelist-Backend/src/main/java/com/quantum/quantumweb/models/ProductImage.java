package com.quantum.quantumweb.models;

import jakarta.persistence.*;

@Entity
@Table(name = "product_image")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "url")
    private String imagePath;

    @Column(name = "product_id")
    private int productId;
 

    public ProductImage() {
    }

    public ProductImage(String imagePath, int productId) {
        this.imagePath = imagePath;
        this.productId = productId;
     }

 
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	 

	@Override
    public String toString() {
        return "ProductImage{" +
                "id=" + id +
                ", url='" + imagePath + '\'' +
                ", productId=" + productId +
                ", isPrimaryImage=" +    
                '}';
    }
}
