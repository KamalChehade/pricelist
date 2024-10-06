import { TestBed } from '@angular/core/testing';

import { BrandSelectionServiceService } from '../components/brand-selection-service.service';

describe('BrandSelectionServiceService', () => {
  let service: BrandSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
