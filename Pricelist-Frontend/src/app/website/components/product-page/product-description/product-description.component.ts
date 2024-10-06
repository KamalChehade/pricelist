import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component';
import { ProductImageService } from '../../../../services/product-image.service';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper';
import { DealerLoginService } from '../../../services/dealer-login.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BrandService } from '../../../../services/brand-service.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit, AfterViewInit {
  @Input() productId: number = 0;
  product: Product | undefined;
  isDealerLoggedIn: boolean = false;
  categoryName$: Observable<string> | undefined;
  brandName$: Observable<string> | undefined;
  faArrowCircleLeft = faArrowCircleLeft;
  categoryName: string | undefined;
  brandName: string | undefined;
  youtubeEmbedUrl: SafeResourceUrl | undefined;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private dealerLoginService: DealerLoginService,
    public sanitizer: DomSanitizer,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    const id = this.productId || this.route.snapshot.params['id'];

    this.productService.getProductById(id).subscribe(
      product => {
        console.log('Fetched product:', product);
        this.product = product;
        if (this.product.promos) {
          console.log('Promos:', this.product.promos);
        } else {
          console.log('No promos in the fetched product data.');
        }
        this.fetchProductImages();
        this.getProductCategory();
        this.getBrandName();
        this.loadProductPromos();
        this.setYoutubeEmbedUrl(); // Call this function to set the embed URL
      },
      error => {
        if (error.status === 404) {
          this.product = undefined;
        } else {
          console.error('Error fetching product:', error);
        }
      }
    );

    this.dealerLoginService.isDealerLoggedIn$.subscribe(status => {
      this.isDealerLoggedIn = status;
    });
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
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

  getBrandName(): void {
    if (this.product && this.product.id) {
      this.productService.getBrandIdByProductId(this.product.id).subscribe(
        brandId => {
          if (brandId) {
            this.brandName$ = this.brandService.getBrandNameById(brandId);
            this.brandName$.subscribe(
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

  loadProductPromos(): void {
    if (this.product && this.product.id) {
      this.productService.getProductPromos(this.product.id).pipe(
        switchMap(promos => {
          const promoObservables = promos.map(promo => {
            if (promo.giftProductId) {
              return this.productService.getProductById(promo.giftProductId).pipe(
                map(giftProduct => {
                  promo.giftProductName = giftProduct.name;
                  return promo;
                }),
                catchError(error => {
                  console.error(`Error loading product ${promo.giftProductId}:`, error);
                  return of(promo);
                })
              );
            } else {
              return of(promo);
            }
          });

          return forkJoin(promoObservables).pipe(
            map(updatedPromos => {
              this.product!.promos = updatedPromos;
              return updatedPromos;
            })
          );
        })
      ).subscribe(
        updatedPromos => {
          console.log('Product promos updated:', this.product!.promos);
        },
        error => {
          console.error('Error loading product promos:', error);
        }
      );
    }
  }

  setYoutubeEmbedUrl(): void {
    if (this.product && this.product.youtubeLink) {
      const videoId = this.extractVideoId(this.product.youtubeLink);
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        this.youtubeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
  }

  extractVideoId(url: string): string | null {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  goBack(): void {
    window.history.back();
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

  initializeSwiper(): void {
    const swiper = new Swiper('.mySwiper', {
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

  sendWhatsAppMessage(product: Product): void {
    const message = `Hello, I am interested in buying the product: ${product.name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}
