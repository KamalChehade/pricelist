import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  @ViewChild('thumbnailImage') fileInput!: ElementRef; // ViewChild for the file input field
  newProduct: Product = {
    id:0,
    name: '',
    description: '',
    price: 0,
    dealerPrice : 0 ,
    categoryId: 0,
    subcategoryId: undefined
  };
  selectedFile: File | undefined;
  showAlert = false;
  @Output() productAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number, subcategoryId: number },
    private productService: ProductService,
    private dialogRef: MatDialogRef<AddProductDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('Received categoryId:', this.data.categoryId);
    console.log('Received SubcategoryId:', this.data.subcategoryId);

  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.description || !this.newProduct.price || !this.newProduct.dealerPrice) {
      // Handle case where required fields are missing
      return;
    }

    // Assign the received categoryId to the newProduct
    this.newProduct.categoryId = this.data.categoryId;

    // Assign the subcategoryId if defined, otherwise let it be undefined
    if (this.data.subcategoryId !== undefined) {
      this.newProduct.subcategoryId = this.data.subcategoryId;
    }

    // Proceed with adding the product
    this.productService.createProduct(this.newProduct).subscribe((response: any) => {
      // After successfully adding the product, obtain the generated product ID
      const productId = response.id;

      // Check if a file is selected before uploading
      if (this.selectedFile instanceof File) {
        // Upload the product image using the dynamically constructed URL with the product ID
        this.productService.uploadProductImage(productId, this.selectedFile).subscribe((uploadResponse: any) => {
          // Handle upload response if needed
          this.newProduct.thumbnailImage = response.thumbnailImage;
          this.productAdded.emit(true); // Emit event after product addition
          this.resetForm();
        }, uploadError => {
          console.error('Error uploading product image:', uploadError);
          // Handle upload error or display error message
        });
      } else {
        // No file selected, proceed without uploading image
        this.productAdded.emit(true); // Emit event after product addition
        this.resetForm();
      }
    }, error => {
      console.error('Error adding product:', error);
      // Handle error or display error message
    });
  }



  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      dealerPrice: 0,
      categoryId: 0,
      subcategoryId: undefined,
      thumbnailImage: '' // Reset thumbnailImage to empty string
    };
    this.showAlert = true;
    this.dialogRef.close();
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
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: '500px',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter description...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    // Other configuration options as needed
  };
  handleEnterKey(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default form submission behavior
      this.addProduct(); // Call updateProduct method when Enter key is pressed
    }
  }


}



export function maxPriceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const price = control.value;
    if (price === null || price === undefined) {
      return null; // Return null if the control value is null or undefined
    }
    if (price < 0) {
      return { 'negativePrice': { value: price } }; // Return error if price is negative
    }
    return null; // Return null if no errors
  };
}
