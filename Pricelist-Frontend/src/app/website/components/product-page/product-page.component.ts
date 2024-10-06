import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ProductImageService } from '../../../services/product-image.service';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisementImageDialogComponent } from './advertisement-image-dialog/advertisement-image-dialog.component';
import { DealerLoginService } from '../../services/dealer-login.service';
import { faAngleDoubleLeft, faArrowCircleLeft, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { cibWhatsapp } from '@coreui/icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environment/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BrandService } from '../../../services/brand-service.service';
import { ProductDescriptionDialogComponent } from './product-description-dialog/product-description-dialog.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsToShow: Product[] = [];
  selectedProduct: Product | null = null;
  isDealerLoggedIn: boolean = false;
  faArrowCircleLeft = faArrowCircleLeft;
  faInfoCircle = faInfoCircle;
  faWhatsapp = cibWhatsapp;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faLink = faLink;
  images: string[] = [];
  query: string = '';
  categoryTitle: string = '';
  subcategoryTitle: string = '';
  brandName: string = '';
  private routeSub!: Subscription;
  isLoadingProducts: boolean = false;
  pageSize: number = 5; // Default items per page
  pageIndex: number = 0; // Current page index
  totalRecords: number = 0;
  pageSizes: number[] = [5, 10, 20, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dealerLoginService: DealerLoginService,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private breadcrumbService: BreadcrumbService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.loadProducts();
    });

    this.dealerLoginService.isDealerLoggedIn$.subscribe(status => {
      this.isDealerLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadProducts(): void {
    this.isLoadingProducts = true;

    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      const brandId = params['brand'];

      if (query) {
        this.productService.searchProducts(query).subscribe(
          products => {
            this.products = products;
            this.query = query;
            this.fetchProductImages();
            this.calculateDiscountPercentage();
            this.updateProductsToShow();
            this.isLoadingProducts = false;
          },
          error => {
            console.error('Error loading products:', error);
            this.isLoadingProducts = false;
          }
        );
      } else {
        this.route.params.subscribe(params => {
          const categoryId = params['categoryId'];
          const subcategoryId = params['subcategoryId'];
          const productId = params['id'];

          let serviceMethod;

          if (subcategoryId) {
            serviceMethod = this.productService.getProductsBySubcategoryId(subcategoryId);

            this.subcategoryService.getSubcategoryById(subcategoryId).subscribe(subcategory => {
              this.categoryService.getCategoryById(categoryId).subscribe(category => {
                this.brandService.getBrandNameById(category.brandId).subscribe(brandName => {
                  this.brandName = brandName;
                  this.breadcrumbService.setBreadcrumb(
                    { label: this.brandName, url: `/?brand=${category.brandId}` },
                    { label: category.name, url: `/subcategory/${categoryId}` },
                    { label: subcategory.name, url: `/product/${subcategoryId}/${categoryId}` }
                  );
                  this.categoryTitle = category.name;
                  this.subcategoryTitle = subcategory.name;
                });
              });
            });
          } else if (categoryId) {
            serviceMethod = this.productService.getProductsByCategoryId(categoryId);

            this.categoryService.getCategoryById(categoryId).subscribe(category => {
              this.brandService.getBrandNameById(category.brandId).subscribe(brandName => {
                this.brandName = brandName;
                this.breadcrumbService.setBreadcrumb(
                  { label: this.brandName, url: `/?brand=${category.brandId}` },
                  { label: category.name, url: `/product/${categoryId}` }
                );
                this.categoryTitle = category.name;
              });
            });
          } else if (productId) {
            serviceMethod = this.productService.getProductById(productId).pipe(map(product => [product]));
          }

          if (serviceMethod) {
            serviceMethod.subscribe(
              products => {
                this.products = products;
                this.fetchProductImages();
                this.calculateDiscountPercentage();
                this.updateProductsToShow();
                this.isLoadingProducts = false;
              },
              error => {
                console.error('Error loading products:', error);
                this.isLoadingProducts = false;
              }
            );
          } else {
            console.error('Neither categoryId, subcategoryId, nor productId provided.');
            this.isLoadingProducts = false;
          }
        });
      }
    });
  }

  fetchProductImages(): void {
    const observables = this.products.map(product =>
      this.productImageService.getProductImagesByProductId(product.id).pipe(
        map(images => {
          if (images) {
            return images.map(image => `${environment.imageUrl}/${image.imagePath}`);
          } else {
            return [];
          }
        })
      )
    );

    forkJoin(observables).subscribe(
      results => {
        results.forEach((images, index) => {
          if (images) {
            this.products[index].images = images;
          } else {
            this.products[index].images = [];
          }
        });
      },
      error => {
        console.error('Error fetching product images:', error);
      }
    );
  }

  calculateDiscountPercentage(): void {
    this.products.forEach(product => {
      if (product.onDiscount && product.discountPrice !== undefined) {
        const discountPercentage = ((product.price - product.discountPrice) / product.price) * 100;
        product.discountPercentage = Math.ceil(discountPercentage);
      }
    });
  }

  filterProducts(filterType: string): void {
    switch (filterType) {
      case 'AZ':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ZA':
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Ascending':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'Descending':
        this.products.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    this.updateProductsToShow();
  }

  updateProductsToShow(): void {
    const visibleProducts = this.products.filter(product => product.status);
    this.totalRecords = visibleProducts.length;

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

    this.productsToShow = visibleProducts.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  onPageChanged(event: PageEvent): void {
    this.updateProductsToShow();
  }

  openAdvertisementDialog(product: Product): void {
    const dialogRef = this.dialog.open(AdvertisementImageDialogComponent, {
      width: '80%',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProduct = result;
      }
    });
  }

  copyProductLink(productId: number, productName: string): void {
    const productLink = `${window.location.origin}/product/${productId}`;
    const productMessage = `Check out this product: ${productName} ${productLink}`;

    const textArea = document.createElement('textarea');
    textArea.value = productMessage;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this._snackBar.open('Product link copied to clipboard!', 'Close', {
      duration: 3000
    });
  }

  applyFilter(filterType: string): void {
    this.filterProducts(filterType);
  }

  openQuickView(event: MouseEvent, productId: number): void {
    event.stopPropagation(); // Prevent routing

    this.dialog.open(ProductDescriptionDialogComponent, {
      width: '100vw', // Full viewport width
      maxWidth: '1200px', // Maximum width of the dialog
      height: 'auto', // Height adjusts based on content
      maxHeight: '90vh', // Maximum height of the dialog (90% of the viewport height)
      data: { productId: productId },
      panelClass: 'product-description-dialog' // Optional: Apply custom styling
    });
  }



  sendWhatsAppMessage(event: MouseEvent, product: Product): void {
    event.stopPropagation(); // Prevent routing
    const message = `Hello, I am interested in buying the product: ${product.name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
  goToProductDescription(productId: number): void {
    this.router.navigate(['/product-description', productId]);

  }

}
