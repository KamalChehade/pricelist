import { TestBed } from '@angular/core/testing';

import { DealerLoginService } from './dealer-login.service';

describe('DealerLoginService', () => {
  let service: DealerLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
