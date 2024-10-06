import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmenDialogComponent } from './salesmen-dialog.component';

describe('SalesmenDialogComponent', () => {
  let component: SalesmenDialogComponent;
  let fixture: ComponentFixture<SalesmenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesmenDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesmenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
