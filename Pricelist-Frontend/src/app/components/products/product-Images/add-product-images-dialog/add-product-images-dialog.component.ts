import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductImageService } from '../../../../services/product-image.service';

@Component({
  selector: 'app-add-product-images-dialog',
  templateUrl: './add-product-images-dialog.component.html',
  styleUrls: ['./add-product-images-dialog.component.scss']
})
export class AddProductImagesDialogComponent implements OnInit {
  selectedFiles: File[] = [];
  isUploading: boolean = false; // Add loading state

  constructor(
    public dialogRef: MatDialogRef<AddProductImagesDialogComponent>,
    private productImageService: ProductImageService,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number } // Inject the product ID
  ) { }

  ngOnInit(): void {
    console.log("ProductId is :", this.data.productId);
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = [];
    for (const file of event.target.files) {
      this.selectedFiles.push(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      for (const file of Array.from(files)) {
        this.selectedFiles.push(file);
      }
    }
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0 && !this.isUploading) {
      this.isUploading = true; // Set loading state
      this.productImageService.uploadProductImages(this.data.productId, this.selectedFiles).subscribe(() => {
        this.dialogRef.close('confirm');
        this.isUploading = false; // Reset loading state on success
      }, () => {
        this.isUploading = false; // Reset loading state on error
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
