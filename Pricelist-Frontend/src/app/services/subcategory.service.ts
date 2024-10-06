// subcategory.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = `${environment.apiUrl}/subcategories`; // Update the URL with apiUrl from environment

  constructor(private http: HttpClient) { }

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.baseUrl);
  }

  getSubcategory(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.baseUrl}/${id}`);
  }

  addSubcategory(name: string, categoryId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { name, categoryId });
  }

  updateSubcategory(subcategory: Subcategory): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${subcategory.id}`, subcategory);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getSubcategoriesByCategory(categoryId: number): Observable<Subcategory[]> {
    const url = `${this.baseUrl}/byCategory/${categoryId}`;
    return this.http.get<Subcategory[]>(url);
  }

  getSubcategoryById(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.baseUrl}/${id}`);
  }
  getSubcategoryNameById(id: number): Observable<string> {
    const url = `${this.baseUrl}/${id}/name`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
}
