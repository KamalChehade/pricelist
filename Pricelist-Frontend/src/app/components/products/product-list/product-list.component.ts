import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { faPencil, faBullhorn, faSquarePlus, faTrash, faImage } from '@fortawesome/free-solid-svg-icons';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { DialogComponent } from '../../../containers/dialog/dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductImageGalleryDialogComponent } from '../product-Images/product-image-gallery-dialog/product-image-gallery-dialog.component';
import { environment } from '../../../../environment/environment';
import { PromoDialogComponent } from '../promo-dialog/promo-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categoryId: number;
  subcategoryId: number | null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  images: any[] = []; // Define the images property to hold product images
  faTrash = faTrash;
  faPencil = faPencil;
  faImage = faImage;
  faBullhorn = faBullhorn;
  faSquarePlus = faSquarePlus;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  // Properties for swap functionality
  product1Id!: number;
  product2Id!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { categoryId: number; subcategoryId: number },
    private productService: ProductService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductListComponent>,
    private sanitizer: DomSanitizer
  ) {
    this.categoryId = this.data.categoryId;
    this.subcategoryId = this.data.subcategoryId !== undefined ? this.data.subcategoryId : null;
  }

  ngOnInit(): void {
    if (this.subcategoryId !== null) {
      this.loadProductsBySubcategory();
    } else {
      this.loadProductsByCategory();
    }
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => this.searchProducts());
  }

  loadProductsByCategory(): void {
    this.productService.getProductsByCategoryId(this.categoryId).subscribe((products) => {
      this.products = products.map((product) => ({
        ...product,
        thumbnailImage: `${environment.imageUrl}${product.thumbnailImage}`
      }));
      this.filteredProducts = this.products;
    });
  }

  loadProductsBySubcategory(): void {
    if (this.subcategoryId !== null) {
      this.productService.getProductsBySubcategoryId(this.subcategoryId).subscribe((products) => {
        this.products = products.map((product) => ({
          ...product,
          thumbnailImage: `${environment.imageUrl}${product.thumbnailImage}`
        }));
        this.filteredProducts = this.products;
      });
    } else {
      console.error('Subcategory ID is null. Unable to load products.');
    }
  }

  openAddDialog(): void {
    if (this.categoryId) {
      const dialogRef = this.dialog.open(AddProductDialogComponent, {
        width: '500px',
        data: { categoryId: this.categoryId, subcategoryId: this.subcategoryId }
      });

      dialogRef.componentInstance.productAdded.subscribe((success: boolean) => {
        if (success) {
          if (this.subcategoryId !== null) {
            this.loadProductsBySubcategory();
          } else {
            this.loadProductsByCategory();
          }
        }
      });
    }
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: { id: product.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.subcategoryId !== null) {
          this.loadProductsBySubcategory();
        } else {
          this.loadProductsByCategory();
        }
      }
    });
  }

  openImageGallery(productId: number): void {
    const dialogRef = this.dialog.open(ProductImageGalleryDialogComponent, {
      width: '70%',
      data: { productId: productId }
    });
  }

  openPromoDialog(productId: number, productName: string): void {
    const dialogRef = this.dialog.open(PromoDialogComponent, {
      width: '800px',
      data: {
        productId: productId,
        categoryId: this.categoryId,
        subcategoryId: this.subcategoryId,
        productName: productName  // Include productName here
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close actions if needed
      console.log('The promo dialog was closed');
      if (result) {
        console.log('Result from promo dialog:', result);
        // You can handle the result here if the dialog returns data
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter((product) => product.id !== id);
          this.filteredProducts = this.filteredProducts.filter((product) => product.id !== id);
        });
      }
    });
  }

  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toString().toLowerCase().includes(searchTermLower) ||
          (product.id && product.id.toString().toLowerCase().includes(searchTermLower)) ||
          (product.price && product.price.toString().toLowerCase().includes(searchTermLower))
      );
    }
  }

  onSearchInput(): void {
    this.searchTerm = this.searchTerm.trim();
    this.searchSubject.next(this.searchTerm);
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeVideoId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  private extractYouTubeVideoId(url: string): string {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    return match ? match[1] : '';
  }

  updateIsNew(product: Product, event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const checkbox = event.target;
      const isChecked = checkbox.checked;

      this.productService.updateProductIsNew(product.id, isChecked).subscribe(
        () => {
          product.isNew = isChecked;
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  updateOnDiscount(product: Product, event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const checkbox = event.target;
      const isOnDiscount = checkbox.checked;

      if (product.onDiscount !== undefined) {
        this.productService.updateProductOnDiscount(product.id, isOnDiscount).subscribe(
          () => {
            product.onDiscount = isOnDiscount;
          },
          (error) => {
            console.error('Error updating onDiscount:', error);
          }
        );
      }
    }
  }

  updateMoq(product: Product, event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const checkbox = event.target;
      const hasMoq = checkbox.checked;

      if (product.moq !== undefined) {
        this.productService.updateProductMoq(product.id, hasMoq).subscribe(
          () => {
            product.moq = hasMoq;
          },
          (error) => {
            console.error('Error updating moq:', error);
          }
        );
      }
    }
  }

  toggleStatus(product: Product): void {
    product.status = !product.status;
    this.productService.updateProductStatus(product.id, product.status).subscribe(() => {
      console.log(`Product status updated to: ${product.status}`);
    });
  }

  swapProducts(): void {
    const index1 = this.filteredProducts.findIndex((p) => p.id === this.product1Id);
    const index2 = this.filteredProducts.findIndex((p) => p.id === this.product2Id);

    if (index1 !== -1 && index2 !== -1) {
      const temp = this.filteredProducts[index1];
      this.filteredProducts[index1] = this.filteredProducts[index2];
      this.filteredProducts[index2] = temp;
    }
  }
}
