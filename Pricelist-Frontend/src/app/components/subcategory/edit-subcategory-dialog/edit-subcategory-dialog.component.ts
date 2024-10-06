import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from '../../../services/subcategory.service';
import { Subcategory } from '../../../models/subcategory';

@Component({
  selector: 'app-edit-subcategory-dialog',
  templateUrl: './edit-subcategory-dialog.component.html',
  styleUrls: ['./edit-subcategory-dialog.component.scss']
})
export class EditSubcategoryDialogComponent implements OnInit {
  subcategory: Subcategory = new Subcategory();
  @Output() subcategoryUpdated: EventEmitter<void> = new EventEmitter<void>(); // Define an output event

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    const id = this.data.id;
    if (id) {
      this.subcategoryService.getSubcategory(id).subscribe((response: Subcategory) => {
        this.subcategory = response;
      });
    } else {
      console.error('No subcategory ID provided');
    }
  }

  updateSubcategory(): void {
    this.subcategoryService.updateSubcategory(this.subcategory).subscribe(() => {
      this.subcategoryUpdated.emit(); // Emit the event on successful update
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
