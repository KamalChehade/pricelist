import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { AdvertisementImageDialogComponent } from '../advertisement-image-dialog/advertisement-image-dialog.component';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component';
import { ProductImageService } from '../../../../services/product-image.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environment/environment';
import { faArrowCircleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper';
import { DealerLoginService } from '../../../services/dealer-login.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent implements OnInit, AfterViewInit {
  @Input() productId: number = 0; // Input property to receive the product ID
  product: Product | undefined;
  isDealerLoggedIn: boolean = false;
  faInfoCircle = faInfoCircle;
  faArrowCircleLeft = faArrowCircleLeft;
  swiper: Swiper | undefined;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private dealerLoginService: DealerLoginService,
  ) { }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    // Retrieve the product ID either from input or route parameters
    const id = this.productId || this.route.snapshot.params['id'];
    // Fetch product data using the product ID
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        // Fetch product images
        this.fetchProductImages();
      },
      error => {
        if (error.status === 404) {
          this.product = undefined; // Set product to undefined to trigger "No product found" message
        } else {
          console.error('Error fetching product:', error);
        }
      }
    );
    // Subscribe to dealer login status
    this.dealerLoginService.isDealerLoggedIn$.subscribe(status => {
      this.isDealerLoggedIn = status;
    });
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  initializeSwiper(): void {
    this.swiper = new Swiper('.mySwiper', {
      // Swiper configuration options
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
    });
  }

  fetchProductImages(): void {
    if (this.product) {
      this.productImageService.getProductImagesByProductId(this.product.id).pipe(
        map(images => {
          if (images) {
            return images.map(image => `${environment.imageUrl}/${image.imagePath}`);
          } else {
            return []; // Return an empty array if images is null
          }
        })
      ).subscribe(
        // Handle result
        images => {
          if (this.product) {
            this.product.images = images; // Assign the fetched images to product.images
            // Update Swiper slides after fetching images
            if (this.swiper) {
              this.swiper.update(); // Update Swiper slides
            }
          }
        },
        // Handle error
        error => {
          console.error('Error fetching product images:', error);
        }
      );
    }
  }

  openAdvertisementDialog(): void {
    if (this.product) {
      this.dialog.open(AdvertisementImageDialogComponent, {
        width: '80%',
        data: { thumbnailImage: this.product.thumbnailImage, product: this.product }
      });
    }
  }

  openProductImagesDialog(): void {
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.dialog.open(ProductImagesDialogComponent, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { images: this.product.images },
      });
    } else {
      console.error('No images available for this product.');
    }
  }
}
