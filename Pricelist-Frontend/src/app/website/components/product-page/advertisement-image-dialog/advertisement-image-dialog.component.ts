import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/product';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-advertisement-image-dialog',
  templateUrl: './advertisement-image-dialog.component.html',
  styleUrls: ['./advertisement-image-dialog.component.scss']
})
export class AdvertisementImageDialogComponent implements OnInit {
  product: Product; // Change to single Product object instead of array

  constructor(
    private dialogRef: MatDialogRef<AdvertisementImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { product: Product } // Pass product data
  ) {
    this.product = this.data.product; // Assign product data
  }

  ngOnInit(): void {
    console.log("Product:", this.product);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getThumbnailImageUrl(): string {
    // Construct and return the URL for the thumbnail image
    return `${environment.imageUrl}${this.product.thumbnailImage}`;
  }
}
