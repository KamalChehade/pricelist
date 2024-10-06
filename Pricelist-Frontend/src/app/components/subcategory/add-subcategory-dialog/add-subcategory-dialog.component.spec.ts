import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcategoryDialogComponent } from './add-subcategory-dialog.component';

describe('AddSubcategoryDialogComponent', () => {
  let component: AddSubcategoryDialogComponent;
  let fixture: ComponentFixture<AddSubcategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubcategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubcategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
