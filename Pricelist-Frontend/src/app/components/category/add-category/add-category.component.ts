import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category = new Category();
  showAlert = false;
  brandId!: number; // Declare brandId property

  @Output() categoryAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive dialog data
  ) { }

  ngOnInit(): void {
    // Retrieve brandId from dialog data
    this.brandId = this.data.brandId;
    console.log(this.brandId);
  }

  addCategory() {
    // Assign the brandId to the category object
    this.category.brandId = this.brandId;

    this.categoryService.createCategory(this.category).subscribe(() => {
      this.category = new Category();
      this.showAlert = true;
      this.categoryAdded.emit(true);
      this.dialogRef.close();
    });
  }

  closeAlert() {
    this.showAlert = false;
  }

  cancel() {
    this.dialogRef.close();
  }
}
