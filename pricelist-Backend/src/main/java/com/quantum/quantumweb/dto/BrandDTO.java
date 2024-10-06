package com.quantum.quantumweb.dto;

import jakarta.validation.constraints.NotEmpty;
 
public class BrandDTO {
	private int id;

	@NotEmpty
	private String name;

	@NotEmpty
	private String brandImage;

	 

	public BrandDTO() {
	}

	// Getters and Setters
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

	public String getBrandImage() {
		return brandImage;
	}

	public void setBrandImage(String brandImage) {
		this.brandImage = brandImage;
	}

	 
}
