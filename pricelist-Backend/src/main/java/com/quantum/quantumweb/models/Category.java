package com.quantum.quantumweb.models;


import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;
 
    @Column(name = "brand_id") // Add the brandId column
    private int brandId; // Define the brandId field

    public Category() {
    }

    public Category(String name, int brandId) {
        this.name = name;
        this.brandId = brandId;
    }
     
 
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", brandId=" + brandId + // Include brandId in toString()
                '}';
    }
 
}
