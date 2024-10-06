import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand-service.service';
import { BrandSelectionService } from '../services/brand-selection-service.service';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss']
})
export class WebsiteLayoutComponent implements OnInit {
  categories: Category[] = [];
  selectedBrandId: number = 1;
  selectedBrandName: string = 'Synology';
  loading: boolean = false;
  initialLoadCompleted: boolean = false; // New flag for initial load
  showLoadingForRoot: boolean = false;

  private minSpinnerDisplayTime = 500; // 0.5 seconds for testing
  private spinnerTimeout: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private brandSelectionService: BrandSelectionService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const queryParams = this.activatedRoute.snapshot.queryParams;
        this.showLoadingForRoot = event.url === '/' && !!queryParams['brand'];
        console.log('showLoadingForRoot:', this.showLoadingForRoot);
        if (this.showLoadingForRoot) {
          this.showSpinner();
        }
      }
    });
  }




  loadCategories(brandId: number): void {
    if (!this.initialLoadCompleted && this.showLoadingForRoot) {
      this.showSpinner();
    }
    this.categoryService.getCategoriesByBrandId(brandId).subscribe(response => {
      this.categories = response;
      this.hideSpinner();
      this.initialLoadCompleted = true; // Set initial load completed flag
    }, error => {
      console.error('Error loading categories:', error);
      this.hideSpinner();
    });
  }

  getBrandName(brandId: number): void {
    if (!this.initialLoadCompleted && this.showLoadingForRoot) {
      this.showSpinner();
    }
    this.brandService.getBrandNameById(brandId).subscribe(
      brandName => {
        this.selectedBrandName = brandName;
        this.hideSpinner();
      },
      error => {
        console.error('Error fetching brand name:', error);
        this.hideSpinner();
      }
    );
  }

  handleBrandSelection(brandId: number): void {
    this.selectedBrandId = brandId;
    this.loadCategories(brandId);
    this.getBrandName(brandId);
  }
  private showSpinner(): void {
    clearTimeout(this.spinnerTimeout);
    this.loading = true;
    console.log('Spinner shown');
  }

  private hideSpinner(): void {
    clearTimeout(this.spinnerTimeout);
    this.spinnerTimeout = setTimeout(() => {
      this.loading = false;
      console.log('Spinner hidden');
    }, this.minSpinnerDisplayTime);
  }


}
