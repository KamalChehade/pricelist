import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand-service.service';
import { BrandSelectionService } from '../../services/brand-selection-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoryService } from '../../../services/subcategory.service';
import { Subcategory } from '../../../models/subcategory';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  categories: Category[] = [];
  selectedBrandId: number | null = null;
  selectedBrandName: string = 'Synology';
  isLoadingCategories: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private brandSelectionService: BrandSelectionService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.brandSelectionService.selectedBrandId$.subscribe(brandId => {
      this.handleBrandSelection(brandId);
    });

    this.route.params.subscribe(params => {
      const categoryId = +params['categoryId'];
      const subcategoryId = +params['subcategoryId'];

      if (categoryId && subcategoryId) {
        this.categoryService.getCategory(categoryId).subscribe(category => {
          this.handleBrandSelection(category.brandId);
        });
      } else if (categoryId) {
        this.categoryService.getCategory(categoryId).subscribe(category => {
          this.handleBrandSelection(category.brandId);
       });
      }
    });

    this.loadCategories(this.selectedBrandId ?? 1);
  }

  loadCategories(brandId: number): void {
    this.isLoadingCategories = true;
    this.categoryService.getCategoriesByBrandId(brandId).subscribe((response) => {
      this.categories = response;
      this.isLoadingCategories = false;

      if (this.categories.length === 1) {
        const categoryId = this.categories[0].id;
        this.navigateToProductPage(categoryId);
      }
    });
  }

  getBrandName(brandId: number): void {
    this.brandService.getBrandNameById(brandId).subscribe(
      brandName => {
        this.selectedBrandName = brandName;
        this.breadcrumbService.setBreadcrumb(brandName);
      },
      error => {
        console.error('Error fetching brand name:', error);
      }
    );
  }

  handleBrandSelection(brandId: number): void {
    this.selectedBrandId = brandId;
    this.loadCategories(brandId);
    this.getBrandName(brandId);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { brand: brandId },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  navigateToProductPage(categoryId: number): void {
    this.router.navigate(['/product', categoryId], { relativeTo: this.route });
  }

  navigateToSubcategory(categoryId: number, subcategoryId?: number): void {
    if (subcategoryId !== undefined && subcategoryId !== null) {
      this.router.navigate(['/product', categoryId, subcategoryId], { relativeTo: this.route });
    } else {
      this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe(subcategories => {
        if (subcategories.length === 0) {
          this.router.navigate(['/product', categoryId], { relativeTo: this.route });
        } else {
          this.router.navigate(['/subcategory', categoryId], { relativeTo: this.route });
        }
      });
    }
  }

}
