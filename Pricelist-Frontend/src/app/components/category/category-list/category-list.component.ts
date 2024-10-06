import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { faTrash, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../containers/dialog/dialog.component';
import { EditCategoryDialogComponent } from '../edit-category/edit-category-dialog.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrandService } from '../../../services/brand-service.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router from '@angular/router'
import { SubcategoryListComponent } from '../../subcategory/subcategory-list/subcategory-list.component';
import { ProductListComponent } from '../../products/product-list/product-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
  category: Category[] = [];
  filteredCategories: Category[] = [];
  faTrash = faTrash;
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();
  brandId: number = 0; // Initialize to a default value

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router // Inject Router here
  ) {}

  ngOnInit() {
      console.log("category list is being called ");
    this.route.params.subscribe(params => {
      this.brandId = params['brandId'];
      // Call a function to load categories by brand ID
      this.loadCategories(this.brandId);
    });
    // Subscribe to search subject
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => this.searchCategories());
  }

  loadCategories(brandId: number) {
    this.categoryService.getCategoriesByBrandId(brandId).subscribe((response) => {
      this.category = response;
      this.filteredCategories = response; // Initialize filtered categories with categories by brand ID

    });
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: { id: category.id }
    });

    dialogRef.componentInstance.updateSuccess.subscribe((success: boolean) => {
      if (success) {
        // Get the brandId from the route parameters
        const brandId = this.route.snapshot.params['brandId'];
        // Call loadCategories with brandId
        this.loadCategories(brandId);
      }
    });
  }

openAddDialog() {
  const dialogRef = this.dialog.open(AddCategoryComponent, {
    width: '400px',
    data: { brandId: this.route.snapshot.params['brandId'] } // Pass the brand ID to the AddCategoryComponent
  });

  dialogRef.componentInstance.categoryAdded.subscribe((success: boolean) => {
    if (success) {
      const brandId = this.route.snapshot.params['brandId'];
      this.loadCategories(brandId);
    }
  });
}



deleteCategory(id: number) {
  // Retrieve the category object by id
  const categoryToDelete = this.category.find(c => c.id === id);

  // Ensure the category object exists before proceeding
  if (categoryToDelete) {
    // Construct the delete message dynamically based on the presence of subcategories and products
    let deleteMessage = `Are you sure you want to delete "${categoryToDelete.name}"? It may contain subcategories or products. This action can't be undone.`;


    // Open the dialog with the dynamically generated title and message
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: `Delete ${categoryToDelete.name}`,
        message: deleteMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Delete the category
        this.categoryService.deleteCategory(id).subscribe(() => {
          // Filter out the deleted category from both arrays
          this.category = this.category.filter(c => c.id !== id);
          this.filteredCategories = this.filteredCategories.filter(c => c.id !== id);
        });
      }
    });
  }
}


  searchCategories(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCategories = this.category; // Reset to show all categories if search term is empty
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredCategories = this.category.filter(c =>
        c.name.toLowerCase().includes(searchTermLower)
      );
    }
  }

  onSearchInput(): void {
    this.searchTerm = this.searchTerm.trim();
    console.log('Search term:', this.searchTerm);
    this.searchSubject.next(this.searchTerm);
  }


  openSubcategoryDialog(categoryId: number): void {
    const dialogRef = this.dialog.open(SubcategoryListComponent, {
      width: '1000px',
       data: { categoryId: categoryId } // Pass categoryId to SubcategoryListComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close event if needed
    });
  }
  openProductListDialog(categoryId: number): void {
    const dialogRef = this.dialog.open(ProductListComponent, {
      width: '1500px',
      data: { categoryId: categoryId } // Pass categoryId to ProductListComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close event if needed
    });
  }


}
