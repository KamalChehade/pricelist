import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductImagesDialogComponent } from './edit-product-images-dialog.component';

describe('EditProductImagesDialogComponent', () => {
  let component: EditProductImagesDialogComponent;
  let fixture: ComponentFixture<EditProductImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductImagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
