import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromoDialogComponent } from './edit-promo-dialog.component';

describe('EditPromoDialogComponent', () => {
  let component: EditPromoDialogComponent;
  let fixture: ComponentFixture<EditPromoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPromoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPromoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
