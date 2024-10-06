import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { ProductImageService } from '../../../../services/product-image.service';
import { BrandService } from '../../../../services/brand-service.service';
import { environment } from '../../../../../environment/environment';
import { Observable } from 'rxjs';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component';

@Component({
  selector: 'app-product-description-dialog',
  templateUrl: './product-description-dialog.component.html',
  styleUrls: ['./product-description-dialog.component.scss']
})
export class ProductDescriptionDialogComponent implements OnInit {
  product: Product | undefined;
  brandName: string | undefined;
  isDealerLoggedIn: boolean = false;
  categoryName$: Observable<string> | undefined;
  categoryName: string | undefined;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    private productService: ProductService,
    private productImageService: ProductImageService,
    private sanitizer: DomSanitizer,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.data.productId).subscribe(
      product => {
        this.product = product;
        this.getBrandName();
        this.fetchProductImages();
        this.getProductCategory();

      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }
  getProductCategory(): void {
    if (this.product && this.product.id) {
      this.categoryName$ = this.productService.getCategoryByProductId(this.product.id);
      this.categoryName$.subscribe(
        categoryName => {
          this.categoryName = categoryName;
        },
        error => {
          console.error('Error fetching category name:', error);
        }
      );
    }
  }
  openProductImagesDialog(selectedIndex: number): void {
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.dialog.open(ProductImagesDialogComponent, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: {
          images: this.product.images,
          index: selectedIndex
        },
      });
    } else {
      console.error('No images available for this product.');
    }
  }

  getBrandName(): void {
    if (this.product) {
      this.productService.getBrandIdByProductId(this.product.id).subscribe(
        brandId => {
          if (brandId) {
            this.brandService.getBrandNameById(brandId).subscribe(
              brandName => {
                this.brandName = brandName;
              },
              error => {
                console.error('Error fetching brand name:', error);
              }
            );
          }
        },
        error => {
          console.error('Error fetching brand ID:', error);
        }
      );
    }
  }

  fetchProductImages(): void {
    if (this.product) {
      this.productImageService.getProductImagesByProductId(this.product.id).subscribe(
        images => {
          if (images) {
            this.product!.images = images.map(image => `${environment.imageUrl}/${image.imagePath}`);
          } else {
            this.product!.images = [];
          }
        },
        error => {
          console.error('Error fetching product images:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  sendWhatsAppMessage(product: Product): void {
    const message = `Hello, I am interested in buying the product: ${product.name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}
