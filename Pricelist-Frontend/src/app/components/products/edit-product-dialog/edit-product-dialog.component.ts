import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
  product!: Product;
  editForm!: FormGroup;
  selectedFile: File | undefined;
  @Output() updateSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.max(1000000)]],
      dealerPrice: [0, Validators.required],
      youtubeLink: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)?|youtu\.be\/)?([a-zA-Z0-9_-]{11})(\S*)?$/)]],
      onDiscount: [false],
      discountPrice: [0],
      moq: [false],
      moqQuantity: [0],
      moqPrice: [0],
      showAdvertisementButton: [false]
    });

    this.loadProductData();
  }

  loadProductData() {
    const id = this.data.id;
    this.productService.getProductById(id).subscribe((response: Product) => {
      this.product = response;
      this.editForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        dealerPrice: this.product.dealerPrice,
        youtubeLink: this.product.youtubeLink || '',
        onDiscount: this.product.onDiscount || false,
        discountPrice: this.product.discountPrice || 0,
        moq: this.product.moq || false,
        moqQuantity: this.product.moqQuantity || 0,
        moqPrice: this.product.moqPrice || 0,
        showAdvertisementButton: this.product.showAdvertisementButton || false
      });
      this.toggleMoq();
      this.toggleDiscount();
      this.toggleshowAdvertisementButton();
    });
  }

  clearYoutubeLink() {
    this.editForm.get('youtubeLink')?.setValue('');
  }

  toggleDiscount() {
    const onDiscountControl = this.editForm.get('onDiscount');
    if (onDiscountControl) {
      const isChecked = onDiscountControl.value;
      if (isChecked) {
        this.editForm.get('discountPrice')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('discountPrice')?.clearValidators();
      }
      this.editForm.get('discountPrice')?.updateValueAndValidity();
    }
  }

  toggleMoq() {
    const moqControl = this.editForm.get('moq');
    if (moqControl) {
      const isChecked = moqControl.value;
      if (isChecked) {
        this.editForm.get('moqQuantity')?.setValidators([Validators.required]);
        this.editForm.get('moqPrice')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('moqQuantity')?.clearValidators();
        this.editForm.get('moqPrice')?.clearValidators();
      }
      this.editForm.get('moqQuantity')?.updateValueAndValidity();
      this.editForm.get('moqPrice')?.updateValueAndValidity();
    }
  }

  toggleshowAdvertisementButton() {
    const showAdvertisementButtonControl = this.editForm.get('showAdvertisementButton');
    if (showAdvertisementButtonControl) {
      const isChecked = showAdvertisementButtonControl.value;
      if (isChecked) {
        this.editForm.get('thumbnailImage')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('thumbnailImage')?.clearValidators();
        this.editForm.get('thumbnailImage')?.setValue(null);
      }
      this.editForm.get('thumbnailImage')?.updateValueAndValidity();
    }
  }

  updateProduct() {
    if (this.editForm.invalid) {
      return;
    }

    const { name, description, price, dealerPrice, youtubeLink, onDiscount, discountPrice, moq, moqQuantity, moqPrice, showAdvertisementButton } = this.editForm.value;

    this.product.name = name;
    this.product.description = description;
    this.product.price = price;
    this.product.dealerPrice = dealerPrice;
    this.product.youtubeLink = youtubeLink || null;  // Clear the YouTube link if empty
    this.product.onDiscount = onDiscount;
    this.product.discountPrice = onDiscount ? discountPrice : null;
    this.product.moq = moq;
    this.product.moqQuantity = moq ? moqQuantity : null;
    this.product.moqPrice = moq ? moqPrice : null;
    this.product.showAdvertisementButton = showAdvertisementButton;

    const updateRequests: Observable<any>[] = [
      this.productService.updateProduct(this.product.id, this.product),
      this.productService.updateProductIsAdvertised(this.product.id, showAdvertisementButton),
      this.productService.updateYoutubeLink(this.product.id, youtubeLink || null)  // Pass null if the link is empty
    ];

    forkJoin(updateRequests).subscribe(() => {
      if (showAdvertisementButton && this.selectedFile) {
        this.productService.uploadProductImage(this.product.id, this.selectedFile).subscribe(() => {
          this.updateSuccess.emit(true);
          this.dialogRef.close(true);
        }, uploadError => {
          console.error('Error uploading product image', uploadError);
        });
      } else {
        this.updateSuccess.emit(true);
        this.dialogRef.close(true);
      }
    }, error => {
      console.error('Error updating product:', error);
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' }
    ],
  };
}
