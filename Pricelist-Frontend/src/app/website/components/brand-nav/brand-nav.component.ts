import { AfterViewInit, Component, ElementRef, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand-service.service';
import { BrandSelectionService } from '../../services/brand-selection-service.service';
import Swiper from 'swiper';
import { Brand } from '../../../models/brand';
import { Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-nav',
  templateUrl: './brand-nav.component.html',
  styleUrls: ['./brand-nav.component.scss']
})
export class BrandNavComponent implements AfterViewInit, OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Output() brandSelected: EventEmitter<number> = new EventEmitter<number>();
  selectedBrandId: number | null = null;
  selectedColor: string | null = null;
  swiper: Swiper | undefined;
  brands: Brand[] = [];

  constructor(
    private router: Router,
    private brandService: BrandService,
    private brandSelectionService: BrandSelectionService,
  ) {
    Swiper.use([Navigation, Pagination]);
  }

  ngAfterViewInit(): void {
    this.loadBrands();
  }

  ngOnInit(): void {
    // Subscribe to brand selection changes from HomePageComponent
    this.brandSelectionService.selectedBrandId$.subscribe(brandId => {
      this.selectedBrandId = brandId;
      this.selectedColor = '#31b1d8';  // Fixed color
    });

    this.selectedBrandId = 1; // Set default selected brand ID to 1
    this.selectedColor = '#31b1d8'; // Fixed color for the default selected brand
    this.brandSelected.emit(this.selectedBrandId);
    this.brandSelectionService.setSelectedBrandId(this.selectedBrandId);
  }

  onBrandClick(brandId: number): void {
    this.selectedBrandId = this.selectedBrandId === brandId ? null : brandId;
    const emittedId: number = this.selectedBrandId ?? 1; // Use a default value if selectedBrandId is null
    this.selectedColor = this.selectedBrandId ? '#31b1d8' : null;  // Fixed color or null
    this.brandSelected.emit(emittedId);
    this.brandSelectionService.setSelectedBrandId(emittedId);
    this.router.navigate([''], { queryParams: { brand: emittedId } }); // Update 'brand' with your actual query parameter name
  }

  private loadBrands(): void {
    this.brandService.getAllBrands().subscribe(
      brands => {
        this.brands = brands.map(brand => ({
          ...brand,
          brandImage: `${environment.imageUrl}${brand.brandImage}`,
        }));
        setTimeout(() => {
          this.initializeSwiper();
        }, 0);  // Ensures Swiper initialization after DOM updates
      },
      error => {
        console.error('Error loading brands:', error);
      }
    );
  }

  private initializeSwiper(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      loop: false,
      slidesPerGroup: 3, // Ensure slides are grouped correctly
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 5, // Adjusted to show 5 slides per view
          slidesPerGroup: 5, // Ensure slides are grouped correctly
        },
        950: {
          slidesPerView: 7,
        },
        1200: {
          slidesPerView: 7,
        },
        1500: {
          slidesPerView: 7,
        }
      },
    });
  }

}
