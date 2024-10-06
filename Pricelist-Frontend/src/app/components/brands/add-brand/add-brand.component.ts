import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  newBrand: Brand = { id: 0, name: '', brandImage: '' };
  selectedFile: File | undefined;
  showAlert = false;
  @Output() brandAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private brandService: BrandService,
    private dialogRef: MatDialogRef<AddBrandComponent>
  ) {}

  ngOnInit(): void {}

  addBrand() {
    if (!this.newBrand.name || !this.selectedFile) {
      // Handle case where name or file is missing
      return;
    }

    // Proceed with adding the brand
    this.brandService.createBrand(this.newBrand).subscribe((response: any) => {
      // After successfully adding the brand, obtain the generated brand ID
      const brandId = response.id;

      // Check if a file is selected before uploading
      if (this.selectedFile instanceof File) {
        // Upload the brand image using the dynamically constructed URL with the brand ID
        this.brandService.uploadBrandImage(brandId, this.selectedFile).subscribe((uploadResponse: any) => {
          // Handle upload response if needed

          // Construct the brand image URL with the prefix from environment
          const brandImageUrl = `${environment.imageUrl}/uploads/brandImages/${uploadResponse.filename}`;

          // Set the brandImage property with the prefixed URL
          this.newBrand.brandImage = brandImageUrl;
          console.log("BRAND IMAGE NAME ==>", brandImageUrl);

          this.newBrand = { id: 0, name: '', brandImage: '' };
          this.showAlert = true;
          this.brandAdded.emit(true);
          this.dialogRef.close();
        }, uploadError => {
          console.error('Error uploading brand image:', uploadError);
          // Handle upload error or display error message
        });
      } else {
        console.error('No file selected for upload');
        // Handle case where no file is selected
      }
    }, error => {
      console.error('Error adding brand:', error);
      // Handle error or display error message
    });
  }

  closeAlert() {
    this.showAlert = false;
  }

  cancel() {
    this.dialogRef.close();
  }

  handleFileInput(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
