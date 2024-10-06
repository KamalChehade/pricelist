import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDialogComponent } from './dealer-dialog.component';

describe('DealerDialogComponent', () => {
  let component: DealerDialogComponent;
  let fixture: ComponentFixture<DealerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
