import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { CategoryService } from '../../../services/category.service';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BrandService } from '../../../services/brand-service.service';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss']
})
export class SubcategoryPageComponent implements OnInit {
  subcategories: Subcategory[] = [];
  categoryId: number = 0;
  subcategoryId: number = 0;
  categoryTitle: string = '';
  brandName: string = '';
  faAngleDoubleLeft = faAngleDoubleLeft;
  isLoadingSubcategories: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
      this.subcategoryId = Number(params.get('subcategoryId') || 0);
      this.loadCategoryTitle(this.categoryId);
      this.loadSubcategories(this.categoryId);
    });
  }

  loadCategoryTitle(categoryId: number): void {
    this.categoryService.getCategory(categoryId).subscribe(category => {
      this.categoryTitle = category.name; // Set the category title

      // Fetch the brand name for the category
      this.brandService.getBrandNameById(category.brandId).subscribe(brandName => {
        this.brandName = brandName; // Set the brand name

        // Update breadcrumb with correct labels and URLs
        this.breadcrumbService.setBreadcrumb(
          { label: this.brandName, url: '/' }, // Adjust URL to brand home
          { label: this.categoryTitle, url: `/category/${categoryId}` }
        );
      });
    });
  }


  loadSubcategories(categoryId: number): void {
    this.isLoadingSubcategories = true;
    this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe(
      subcategories => {
        this.subcategories = subcategories;
        this.isLoadingSubcategories = false;
      },
      error => {
        console.error('Error loading subcategories:', error);
        this.isLoadingSubcategories = false;
      }
    );
  }

  navigateToProducts(categoryId: number, subcategoryId?: number): void {
    if (subcategoryId !== undefined) {
      this.router.navigate(['/product', categoryId, subcategoryId]);
    } else {
      this.router.navigate(['/product', categoryId]);
    }
  }

  goBack(): void {
    window.history.back();
  }
}
