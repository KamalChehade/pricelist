import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/brands`; // Base URL for brands

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getBrandById(id: number): Observable<Brand> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Brand>(url);
  }

  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  getBrandNameById(brandId: number): Observable<string> {
    const url = `${this.apiUrl}/${brandId}/name`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

  updateBrand(id: number, brand: Brand): Observable<Brand> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Brand>(url, brand);
  }

  deleteBrand(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  uploadBrandImage(id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const uploadUrl = `${this.apiUrl}/${id}/uploadImage`;
    return this.http.post<any>(uploadUrl, formData);
  }

  // New method to get brands by category ID
  getBrandsByCategoryId(categoryId: number): Observable<Brand[]> {
    const url = `${this.apiUrl}/category/${categoryId}`;
    return this.http.get<Brand[]>(url);
  }
}
