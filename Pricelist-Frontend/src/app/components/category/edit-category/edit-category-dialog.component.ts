import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {
  category: Category = new Category();
   updateSuccess: EventEmitter<boolean> = new EventEmitter<boolean>(); // Event emitter for update success

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.data.id;
    this.categoryService.getCategory(id).subscribe((response: any) => {
      this.category = response;
    });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category).subscribe(() => {
      this.updateSuccess.emit(true);
       this.dialogRef.close();

    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
