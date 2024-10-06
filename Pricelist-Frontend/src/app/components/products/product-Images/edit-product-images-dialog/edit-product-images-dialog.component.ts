import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductImageService } from '../../../../services/product-image.service';
import { ProductImage } from '../../../../models/product-image';

@Component({
  selector: 'app-edit-product-images-dialog',
  templateUrl: './edit-product-images-dialog.component.html',
  styleUrls: ['./edit-product-images-dialog.component.scss']
})
export class EditProductImagesDialogComponent implements OnInit {
  image!: ProductImage;
  imageId: number;
  selectedFiles: File[] = []; // Array to store selected files

  constructor(
    public dialogRef: MatDialogRef<EditProductImagesDialogComponent>,
    private productImageService: ProductImageService,
    @Inject(MAT_DIALOG_DATA) public data: { imageId: number }
  ) {
    this.imageId = this.data.imageId;
  }

  ngOnInit(): void {
    this.getProductImage();
  }

  getProductImage(): void {
    this.productImageService.getProductImageById(this.imageId)
      .subscribe(image => {
        this.image = image;
      });
  }
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files; // Store selected files
  }
  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    this.selectedFiles = event.dataTransfer.files; // Store dropped files
  }

  onUpdate(): void {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', this.selectedFiles[0]); // Assuming only one file is selected
  
      // Upload the new image file first
      this.productImageService.uploadProductImages(this.image.productId, [this.selectedFiles[0]])
        .subscribe(response => {
          // Handle successful file upload
          console.log('File uploaded successfully:', response);
  
          // Update the image data with the new image path
          this.image.imagePath =  response.uploadedImages[0]; // Assuming response contains uploadedImages array
  
          // Update the image data in the database
          this.productImageService.updateProductImage(this.imageId, this.image)
            .subscribe(updatedImage => {
              // Handle success
              console.log('Product image updated successfully:', updatedImage);
              // Optionally, you can close the dialog here
              this.dialogRef.close('confirm');
            }, error => {
              // Handle error updating image data
              console.error('Error updating product image:', error);
            });
        }, error => {
          // Handle error uploading file
          console.error('Error uploading file:', error);
        });
    } else {
      // If no file is selected, simply update the image data without uploading a new file
      // Add the prefix to the existing image path
      this.image.imagePath =  this.image.imagePath;
  
      this.productImageService.updateProductImage(this.image.id, this.image)
        .subscribe(updatedImage => {
          // Handle success
          console.log('Product image updated successfully:', updatedImage);
          // Optionally, you can close the dialog here
          this.dialogRef.close('confirm');
        }, error => {
          // Handle error updating image data
          console.error('Error updating product image:', error);
        });
    }
  }
  
  
  
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
