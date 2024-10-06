// category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl; // Update baseUrl to use apiUrl from environment

  createCategory(category: Category): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categories/${category.id}`, category);
  }

  getCategoryList() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  getCategoriesByBrandId(brandId: number): Observable<Category[]> {
    const url = `${this.baseUrl}/categories/byBrand/${brandId}`;
    return this.http.get<Category[]>(url);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categories/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }
  getCategoryNameById(categoryId: number): Observable<string> {
    const url = `${this.baseUrl}/categories/${categoryId}/name`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
}
