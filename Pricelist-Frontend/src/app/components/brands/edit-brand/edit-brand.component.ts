import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand-service.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  brand: Brand = new Brand();
  selectedFile: File | undefined; // Add a property for the selected file

  @Output() updateSuccess: EventEmitter<boolean> = new EventEmitter<boolean>(); // Define updateSuccess event

  constructor(
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    const id = this.data.id;
    this.brandService.getBrandById(id).subscribe((response: any) => {
      this.brand = response;
    });
  }

  updateBrand() {
    if (!this.brand.name) {
      // Handle case where name is missing
      return;
    }

    this.brandService.updateBrand(this.brand.id, this.brand).subscribe(() => {
      // After successfully updating the brand name, check if a file is selected for image update
      if (this.selectedFile) {
        // Upload the brand image using the dynamically constructed URL with the brand ID
        this.brandService.uploadBrandImage(this.brand.id, this.selectedFile).subscribe((uploadResponse: any) => {
          // Handle upload response if needed
          this.updateSuccess.emit(true); // Emit update success event
          this.dialogRef.close(true);
        }, uploadError => {
          console.error('Error uploading brand image:', uploadError);
          // Handle upload error or display error message
        });
      } else {
        // If no file is selected, emit update success event and close dialog
        this.updateSuccess.emit(true);
        this.dialogRef.close(true);
      }
    }, error => {
      console.error('Error updating brand:', error);
      // Handle error or display error message
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  handleFileInput(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
