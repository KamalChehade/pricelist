import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementImageDialogComponent } from './advertisement-image-dialog.component';

describe('AdvertisementImageDialogComponent', () => {
  let component: AdvertisementImageDialogComponent;
  let fixture: ComponentFixture<AdvertisementImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisementImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
