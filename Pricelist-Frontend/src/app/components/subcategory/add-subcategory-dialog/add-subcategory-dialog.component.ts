import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from '../../../services/subcategory.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-subcategory-dialog',
  templateUrl: './add-subcategory-dialog.component.html',
  styleUrls: ['./add-subcategory-dialog.component.scss']
})
export class AddSubcategoryDialogComponent implements OnInit {
  newSubcategory: { name: string } = { name: '' };
  @ViewChild('newSubcategoryForm') newSubcategoryForm!: NgForm; // ViewChild for the form
  isSubmitting = false; // Flag to track form submission

  constructor(
    public dialogRef: MatDialogRef<AddSubcategoryDialogComponent>,
    private subcategoryService: SubcategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.newSubcategoryForm.valid && !this.isSubmitting) { // Check form validity and if already submitting
      this.isSubmitting = true; // Set flag to true to prevent multiple submissions
      this.subcategoryService.addSubcategory(this.newSubcategory.name, this.data.category_id).subscribe(
        response => {
          console.log('Subcategory added successfully:', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error adding subcategory:', error);
          this.isSubmitting = false; // Reset flag on error
        }
      );
    } else {
      // Handle form validation errors if needed
    }
  }
}
