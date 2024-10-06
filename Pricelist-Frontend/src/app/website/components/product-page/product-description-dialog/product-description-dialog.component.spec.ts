import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionDialogComponent } from './product-description-dialog.component';

describe('ProductDescriptionDialogComponent', () => {
  let component: ProductDescriptionDialogComponent;
  let fixture: ComponentFixture<ProductDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDescriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
