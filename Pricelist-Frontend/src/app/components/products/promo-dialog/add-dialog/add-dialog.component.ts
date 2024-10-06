import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { PromoService } from '../../../../services/promo.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Promo } from '../../../../models/models/promo';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  promoType!: string;
  moq!: number;
  promoPrice!: number;
  additionalProductId: number | null = null;  // Keep null for initial state
  additionalProductQuantity: number = 1;  // Initialize to 1
  giftProductId: number | null = null;  // Keep null for initial state
  description: string = '';
  descriptionLabel: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  myControl = new FormControl();
  additionalProductControl = new FormControl();
  searchTerm: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private productService: ProductService,
    private promoService: PromoService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA to access passed data

  ) {}

  ngOnInit(): void {
    console.log('Product ID received:', this.data.productId); // Log the product ID received

    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filteredProducts = [...this.products];
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );

    this.myControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.searchTerm = value;
      this.filterProducts();
    });

    this.additionalProductControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.searchTerm = value;
      this.filterProducts();
    });

    this.additionalProductControl.valueChanges.subscribe(() => {
      this.generateDescription();
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

  isValidForm(): boolean {
    if (this.promoType === 'Gift Promo') {
      return !!this.promoType && !!this.giftProductId;
    } else {
      return !!this.promoType && this.promoPrice !== undefined && this.promoPrice !== null;
    }
  }

  savePromo(): void {
    // Get the selected additional product by its name
    const selectedAdditionalProduct = this.products.find(product => product.name === this.additionalProductControl.value);
    // Get the selected gift product by its ID
    const selectedGiftProduct = this.products.find(product => product.id === this.giftProductId);

    // Create the promo data object
    const promoData: Promo = {
      promoType: this.promoType,
      moq: this.moq,
      promoPrice: this.promoPrice,
      additionalProductId: selectedAdditionalProduct ? selectedAdditionalProduct.id : null,
      additionalProductQuantity: this.additionalProductQuantity,
      giftProductId: this.giftProductId,
      description: this.description,
      id: undefined, // Optional field, initialize as undefined
      productId: this.data.productId // Assign the product ID received from dialog data
    };

    // Call promo service to save the promo data
    this.promoService.createPromo(promoData).subscribe(
      response => {
        console.log('Promo saved successfully:', response);
        this.dialogRef.close(promoData); // Close dialog and pass promo data back if needed
      },
      error => {
        console.error('Error saving promo:', error);
      }
    );
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  onGiftProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    const selectedProduct = this.products.find(product => product.name === selectedProductName);
    this.giftProductId = selectedProduct ? selectedProduct.id : null;
    this.generateDescription();
  }

  onAdditionalProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    const selectedProduct = this.products.find(product => product.name === selectedProductName);
    this.additionalProductId = selectedProduct ? selectedProduct.id : null;
    this.generateDescription();
  }

  generateDescription(): void {
    if (this.promoType === 'Retail Promo' && this.additionalProductControl.value && this.additionalProductQuantity !== undefined && this.promoPrice) {
      let quantityString = this.additionalProductQuantity === 1 ? '' : `${this.additionalProductQuantity} `;
      this.description = `Buy it with ${quantityString}${this.additionalProductControl.value} for ${this.promoPrice} $`;
      this.descriptionLabel = this.description;
    } else if (this.promoType === 'Combo Promo' && this.additionalProductControl.value && this.additionalProductQuantity !== undefined && this.promoPrice) {
      let quantityString = this.additionalProductQuantity === 1 ? '' : `${this.additionalProductQuantity} `;
      this.description = `Buy it with ${quantityString}${this.additionalProductControl.value} for ${this.promoPrice} $`;
      this.descriptionLabel = this.description;
    } else {
      this.description = '';
      this.descriptionLabel = '';
    }
  }
}
