import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageGalleryDialogComponent } from './product-image-gallery-dialog.component';

describe('ProductImageGalleryDialogComponent', () => {
  let component: ProductImageGalleryDialogComponent;
  let fixture: ComponentFixture<ProductImageGalleryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductImageGalleryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductImageGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
