import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductImagesDialogComponent } from './add-product-images-dialog.component';

describe('AddProductImagesDialogComponent', () => {
  let component: AddProductImagesDialogComponent;
  let fixture: ComponentFixture<AddProductImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductImagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
