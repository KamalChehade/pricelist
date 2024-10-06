import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductImageService } from '../../../../services/product-image.service';
import { DialogComponent } from '../../../../containers/dialog/dialog.component';
import { faTrash, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { AddProductImagesDialogComponent } from '../add-product-images-dialog/add-product-images-dialog.component';
import { EditProductImagesDialogComponent } from '../edit-product-images-dialog/edit-product-images-dialog.component';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-product-image-gallery-dialog',
  templateUrl: './product-image-gallery-dialog.component.html',
  styleUrls: ['./product-image-gallery-dialog.component.scss']
})
export class ProductImageGalleryDialogComponent implements OnInit {
  images: any[] = []; // Initialize images array with an empty array
  faTrash = faTrash;
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;
  productId: number; // Define productId property

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    public dialogRef: MatDialogRef<ProductImageGalleryDialogComponent>,
    public dialog: MatDialog,
    private productImageService: ProductImageService
  ) {
    this.productId = this.data.productId; // Assign productId from the data passed to the component
  }

  ngOnInit(): void {
    this.loadProductImages();
  }

  loadProductImages(): void {
    if (this.productId) {
      this.productImageService.getProductImagesByProductId(this.productId)
        .subscribe(images => {
          if (images) {
            // Clear the images array before updating it with new images
            this.images = images.map(image => {
              // Add the prefix to each image URL
              return {
                ...image,
                imagePath: `${environment.imageUrl}/${image.imagePath}`
              };
            });
          } else {
            this.images = []; // Initialize as empty array if no images are returned
          }
        }, error => {
          console.error('Error loading product images:', error);
          this.images = []; // Handle error by resetting images array
        });
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductImagesDialogComponent, {
      width: '500px',
      data: { productId: this.productId } // Pass the product ID from the component property
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Reload product images only if a new image was successfully added
        this.loadProductImages();
      }
    });
  }

  openEditDialog(imageId: number): void {
    const dialogRef = this.dialog.open(EditProductImagesDialogComponent, {
      width: '400px',
      data: { imageId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the dialog closes
      if (result === 'confirm') {
        // Reload product images if necessary
        this.loadProductImages();
      }
    });
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Product Image',
        message: 'Are you sure you want to delete this product image?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Call the deleteProductImage method from the product image service
        this.productImageService.deleteProductImage(id).subscribe(() => {
          // Remove the deleted product image from the images array
          this.images = this.images.filter(image => image.id !== id);
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
