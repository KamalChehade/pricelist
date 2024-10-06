import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Promo } from '../../../../models/models/promo';
import { PromoService } from '../../../../services/promo.service';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-edit-promo-dialog',
  templateUrl: './edit-promo-dialog.component.html',
  styleUrls: ['./edit-promo-dialog.component.scss']
})
export class EditPromoDialogComponent implements OnInit {
  promo: Promo;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  myControl = new FormControl();
  additionalProductControl = new FormControl();
  searchTerm: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditPromoDialogComponent>,
    private promoService: PromoService,
    private productService: ProductService
  ) {
    this.promo = this.data.promo; // Initialize promo from MAT_DIALOG_DATA

    // If additionalProductId is already set in the promo data, initialize it
    if (this.promo.additionalProductId) {
      this.additionalProductControl.setValue(this.promo.additionalProductName);
    }

    // If giftProductId is already set in the promo data, initialize it
    if (this.promo.giftProductId) {
      const selectedProduct = this.products.find(product => product.id === this.promo.giftProductId);
      if (selectedProduct) {
        this.myControl.setValue(selectedProduct.name);
      }
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filteredProducts = [...this.products]; // Initialize filteredProducts with products
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );

    this.myControl.valueChanges.subscribe(value => {
      this.searchTerm = value;
      this.filterProducts();
    });

    this.additionalProductControl.valueChanges.subscribe(value => {
      this.searchTerm = value;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTermLowerCase)
      );
    }
  }

  generateDescription(): void {
    // Replace with your actual logic for generating description
  }

  savePromo(): void {
    if (this.promo.id) {
      this.updatePromo();
    } else {
      this.createPromo();
    }
  }

  createPromo(): void {
    this.promoService.createPromo(this.promo).subscribe(
      (response) => {
        console.log('Promo created successfully:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating promo:', error);
      }
    );
  }

  updatePromo(): void {
    this.promoService.updatePromo(this.promo).subscribe(
      (response) => {
        console.log('Promo updated successfully:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating promo:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onAdditionalProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    const selectedProduct = this.products.find(product => product.name === selectedProductName);
    this.promo.additionalProductId = selectedProduct ? selectedProduct.id : null;
  }

  onGiftProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    const selectedProduct = this.products.find(product => product.name === selectedProductName);
    this.promo.giftProductId = selectedProduct ? selectedProduct.id : null;
  }

  isValidForm(): boolean {
    // Replace with your actual form validation logic
    return true; // Placeholder
  }
}
