import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoryService } from '../../../services/subcategory.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditSubcategoryDialogComponent } from '../edit-subcategory-dialog/edit-subcategory-dialog.component';
import { DialogComponent } from '../../../containers/dialog/dialog.component';
import { AddSubcategoryDialogComponent } from '../add-subcategory-dialog/add-subcategory-dialog.component';
import { faTrash, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { ProductListComponent } from '../../products/product-list/product-list.component';
import { Subcategory } from '../../../models/subcategory';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss']
})
export class SubcategoryListComponent implements OnInit {
  categoryId: number | null = null;
  subcategoryId: number | null = null;
  subcategories: Subcategory[] = [];
  faTrash = faTrash;
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;
  filteredSubcategories: any[] = [];
  _filterText: string = '';

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filterSubcategoryByName(value);
  }

  constructor(
    public dialogRef: MatDialogRef<SubcategoryListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number; subcategoryId: number },
    private route: ActivatedRoute,
    private router: Router,
    private subcategoryService: SubcategoryService,
    public dialog: MatDialog
  ) {
    this.categoryId = data.categoryId;
  }

  ngOnInit(): void {
    if (this.categoryId !== null) {
      this.loadSubcategories(this.categoryId);
    } else {
      console.error('Category ID is null. Unable to load subcategories.');
    }
  }

  loadSubcategories(categoryId: number): void {
    this.subcategoryService.getSubcategoriesByCategory(categoryId).subscribe(subcategories => {
      this.subcategories = subcategories;
      this.filteredSubcategories = subcategories;
    });
  }

  viewProducts(subcategoryId: number): void {
    const dialogRef = this.dialog.open(ProductListComponent, {
      width: '1000px',
      data: { categoryId: this.categoryId, subcategoryId: subcategoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close event if needed
    });
  }

  openEditDialog(subcategory: Subcategory): void {
    const dialogRef = this.dialog.open(EditSubcategoryDialogComponent, {
      width: '400px',
      data: { id: subcategory.id }
    });

    dialogRef.componentInstance.subcategoryUpdated.subscribe(() => {
      this.loadSubcategories(this.categoryId!);
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closed event if needed
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSubcategoryDialogComponent, {
      width: '400px',
      data: { category_id: this.categoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New subcategory added:', result);
        this.loadSubcategories(this.categoryId!);
      }
    });
  }

  deleteSubcategory(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Subcategory',
        message: 'Are you sure you want to delete this subcategory?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.subcategoryService.deleteSubcategory(id).subscribe(() => {
          this.subcategories = this.subcategories.filter(subcategory => subcategory.id !== id);
          this.loadSubcategories(this.categoryId!);
        });
      }
    });
  }

  filterSubcategoryByName(filterTerm: string): void {
    if (this.subcategories.length === 0 || filterTerm === '') {
      this.filteredSubcategories = [...this.subcategories];
    } else {
      this.filteredSubcategories = this.subcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
