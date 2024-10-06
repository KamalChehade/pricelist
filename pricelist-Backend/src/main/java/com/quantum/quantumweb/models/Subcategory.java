package com.quantum.quantumweb.models;

import jakarta.persistence.*;

@Entity
@Table(name = "subcategory")
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "category_id")
    private int categoryId;
    

    public Subcategory() {
    }

    public Subcategory(String name, int categoryId) {
        this.name = name;
        this.categoryId = categoryId;
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

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

	@Override
	public String toString() {
		return "Subcategory [id=" + id + ", name=" + name + ", categoryId=" + categoryId + "]";
	}
    
}
