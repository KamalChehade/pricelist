// brand-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandSelectionService {
  private selectedBrandIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1); // Default brand ID
  selectedBrandId$: Observable<number> = this.selectedBrandIdSubject.asObservable();

  constructor() {}

  setSelectedBrandId(brandId: number): void {
    this.selectedBrandIdSubject.next(brandId);
  }
}
