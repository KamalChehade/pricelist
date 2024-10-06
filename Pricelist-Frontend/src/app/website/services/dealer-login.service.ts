// dealer-login.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerLoginService {
  private isDealerLoggedInSubject = new BehaviorSubject<boolean>(false);
  isDealerLoggedIn$ = this.isDealerLoggedInSubject.asObservable();

  constructor() { }

  setDealerLoggedIn(status: boolean): void {
    this.isDealerLoggedInSubject.next(status);
  }

  getDealerLoggedIn(): boolean {
    return this.isDealerLoggedInSubject.value;
  }
  
}
